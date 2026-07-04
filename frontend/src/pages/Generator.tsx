import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Loader2,
  Download,
  Copy,
  Check,
  RefreshCw,
  RotateCcw,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  uploadHeadshot,
  createJob,
  subscribeToJob,
  regenerateThumbnail,
  getJob,
} from "@/lib/api"
import {
  STYLE_LABELS,
  STYLE_DESCRIPTIONS,
  VARIANT_LABELS,
  VARIANT_DIMENSIONS,
} from "@/lib/types"
import type {
  Thumbnail,
  StyleName,
  VariantKey,
  SSEThumbnailReady,
  SSEThumbnailFailed,
  SSEJobComplete,
} from "@/lib/types"

type Phase = "configure" | "generating" | "results"

interface ThumbState {
  id: string
  style_name: StyleName
  status: "pending" | "generating" | "uploaded" | "failed"
  imagekit_url: string | null
  variants: Record<VariantKey, string> | null
  error: string | null
}

const easeOutQuart = [0.25, 1, 0.5, 1] as const

export default function Generator() {
  const [phase, setPhase] = useState<Phase>("configure")
  const [headshotUrl, setHeadshotUrl] = useState<string | null>(null)
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [count, setCount] = useState(1)
  const [jobId, setJobId] = useState<string | null>(null)
  const [thumbnails, setThumbnails] = useState<ThumbState[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)
  const uploadedFileRef = useRef<File | null>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }
    uploadedFileRef.current = file
    setHeadshotPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const { url } = await uploadHeadshot(file)
      setHeadshotUrl(url)
    } catch {
      toast.error("Failed to upload headshot. Please try again.")
      setHeadshotPreview(null)
      uploadedFileRef.current = null
    } finally {
      setUploading(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleGenerate = async () => {
    if (!headshotUrl || !prompt.trim()) return
    try {
      const { job_id } = await createJob({
        prompt: prompt.trim(),
        numThumbnails: count,
        headshotUrl,
      })
      setJobId(job_id)

      const job = await getJob(job_id)
      setThumbnails(
        job.thumbnails.map((t: Thumbnail) => ({
          id: t.id,
          style_name: t.style_name,
          status: t.status as ThumbState["status"],
          imagekit_url: t.imagekit_url,
          variants: t.variants as Record<VariantKey, string> | null,
          error: t.error_message,
        }))
      )
      setPhase("generating")

      eventSourceRef.current = subscribeToJob(job_id, {
        onThumbnailReady: (data: SSEThumbnailReady) => {
          setThumbnails((prev) =>
            prev.map((t) =>
              t.id === data.thumbnail_id
                ? {
                    ...t,
                    status: "uploaded",
                    imagekit_url: data.imagekit_url,
                    variants: data.variants,
                  }
                : t
            )
          )
        },
        onThumbnailFailed: (data: SSEThumbnailFailed) => {
          setThumbnails((prev) =>
            prev.map((t) =>
              t.id === data.thumbnail_id
                ? { ...t, status: "failed", error: data.error }
                : t
            )
          )
        },
        onJobComplete: (_data: SSEJobComplete) => {
          setPhase("results")
        },
        onError: () => {
          toast.error("Connection lost. Polling for results...")
          eventSourceRef.current?.close()
          setTimeout(async () => {
            if (!job_id) return
            try {
              const fresh = await getJob(job_id)
              setThumbnails(
                fresh.thumbnails.map((t: Thumbnail) => ({
                  id: t.id,
                  style_name: t.style_name,
                  status: t.status as ThumbState["status"],
                  imagekit_url: t.imagekit_url,
                  variants: t.variants as Record<VariantKey, string> | null,
                  error: t.error_message,
                }))
              )
              if (fresh.status === "completed" || fresh.status === "failed") {
                setPhase("results")
              }
            } catch {
              /* noop */
            }
          }, 2000)
        },
      })
    } catch {
      toast.error("Failed to start generation. Please try again.")
    }
  }

  const handleRegenerate = async (thumbId: string) => {
    if (!jobId) return
    setThumbnails((prev) =>
      prev.map((t) =>
        t.id === thumbId
          ? {
              ...t,
              status: "generating",
              imagekit_url: null,
              variants: null,
              error: null,
            }
          : t
      )
    )
    try {
      await regenerateThumbnail(jobId, thumbId)

      eventSourceRef.current?.close()
      eventSourceRef.current = subscribeToJob(jobId, {
        onThumbnailReady: (data: SSEThumbnailReady) => {
          setThumbnails((prev) =>
            prev.map((t) =>
              t.id === data.thumbnail_id
                ? {
                    ...t,
                    status: "uploaded",
                    imagekit_url: data.imagekit_url,
                    variants: data.variants,
                  }
                : t
            )
          )
        },
        onThumbnailFailed: (data: SSEThumbnailFailed) => {
          setThumbnails((prev) =>
            prev.map((t) =>
              t.id === data.thumbnail_id
                ? { ...t, status: "failed", error: data.error }
                : t
            )
          )
        },
        onJobComplete: () => {},
        onError: () => {
          eventSourceRef.current?.close()
        },
      })
    } catch {
      toast.error("Failed to regenerate. Please try again.")
      setThumbnails((prev) =>
        prev.map((t) =>
          t.id === thumbId ? { ...t, status: "failed" } : t
        )
      )
    }
  }

  const handleNewBatch = () => {
    eventSourceRef.current?.close()
    setPhase("configure")
    setThumbnails([])
    setJobId(null)
    setPrompt("")
    setCount(1)
  }

  const handleDownload = async (thumb: ThumbState, variant: VariantKey) => {
    if (!thumb.variants) return
    const url = thumb.variants[variant]
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = objectUrl
      a.download = `thumbmaker-${thumb.style_name}-${variant}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objectUrl)
    } catch {
      toast.error("Download failed. Try copying the URL instead.")
    }
  }

  const [copyState, setCopyState] = useState<Record<string, boolean>>({})
  const handleCopyUrl = async (thumb: ThumbState, variant: VariantKey) => {
    if (!thumb.variants) return
    const url = thumb.variants[variant]
    const key = `${thumb.id}-${variant}`
    try {
      await navigator.clipboard.writeText(url)
      setCopyState((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch {
      toast.error("Failed to copy URL")
    }
  }

  const handleRemoveHeadshot = () => {
    setHeadshotUrl(null)
    setHeadshotPreview(null)
    uploadedFileRef.current = null
  }

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close()
      if (headshotPreview) URL.revokeObjectURL(headshotPreview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canGenerate = headshotUrl !== null && prompt.trim().length > 0 && !uploading
  const allDone =
    phase === "results" &&
    thumbnails.length > 0 &&
    thumbnails.every((t) => t.status === "uploaded" || t.status === "failed")

  return (
    <div className="min-h-svh">
      <Navbar />

      {/* Configure */}
      <AnimatePresence mode="wait">
        {phase === "configure" && (
          <motion.section
            key="configure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutQuart }}
            className="mx-auto max-w-3xl px-6 py-12 md:py-20"
          >
            <div className="mb-10">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Create your thumbnails
              </h1>
              <p className="mt-2 text-muted-foreground">
                Upload a headshot, describe the thumbnail you want, and pick how
                many variations to generate.
              </p>
            </div>

            {/* Upload */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium">
                Headshot
              </label>
              {!headshotPreview ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-colors ${
                    dragOver
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  {uploading ? (
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  ) : (
                    <Upload className="size-6 text-muted-foreground" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {uploading
                      ? "Uploading..."
                      : "Drop your headshot here, or click to browse"}
                  </p>
                </div>
              ) : (
                <div className="relative inline-block overflow-hidden rounded-lg border border-border">
                  <img
                    src={headshotPreview}
                    alt="Headshot preview"
                    className="h-40 w-auto object-cover"
                  />
                  <button
                    onClick={handleRemoveHeadshot}
                    className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                    aria-label="Remove headshot"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(file)
                }}
              />
            </div>

            {/* Prompt */}
            <div className="mb-8">
              <label
                htmlFor="prompt"
                className="mb-3 block text-sm font-medium"
              >
                Describe your thumbnail
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Cinematic dark background, dramatic lighting, bold text saying 'I FAILED 100 TIMES'..."
                className="min-h-[120px] resize-y"
                maxLength={500}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {prompt.length}/500 characters
              </p>
            </div>

            {/* Count */}
            <div className="mb-10">
              <label className="mb-3 block text-sm font-medium">
                How many variations?
              </label>
              <div className="flex gap-3">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-4 transition-colors ${
                      count === n
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    <span className="text-lg font-semibold tabular-nums">{n}</span>
                    <span className="text-xs text-muted-foreground">
                      {n === 1 ? "thumbnail" : "thumbnails"}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.from({ length: count }, (_, i) => {
                  const styleKey = ["bold_dramatic", "clean_minimal", "vibrant_energetic"][i] as StyleName
                  return (
                    <span
                      key={styleKey}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {STYLE_LABELS[styleKey]}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Generate */}
            <Button
              size="lg"
              className="w-full group"
              disabled={!canGenerate}
              onClick={handleGenerate}
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              Generate thumbnails
            </Button>
          </motion.section>
        )}

        {/* Generating + Results */}
        {(phase === "generating" || phase === "results") && (
          <motion.section
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeOutQuart }}
            className="mx-auto max-w-5xl px-6 py-12 md:py-16"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {phase === "generating" ? "Generating..." : "Your thumbnails"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {phase === "generating"
                    ? "Each thumbnail generates in a different style."
                    : "Download, copy, or regenerate any thumbnail."}
                </p>
              </div>
              {allDone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewBatch}
                  className="shrink-0"
                >
                  <RotateCcw className="size-4" />
                  New batch
                </Button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {thumbnails.map((thumb, i) => (
                <ThumbnailCard
                  key={thumb.id}
                  thumb={thumb}
                  index={i}
                  onDownload={handleDownload}
                  onCopyUrl={handleCopyUrl}
                  onRegenerate={handleRegenerate}
                  copyState={copyState}
                  interactive={phase === "results"}
                />
              ))}
            </div>

            {phase === "generating" && thumbnails.some((t) => t.status === "uploaded" || t.status === "failed") && (
              <div className="mt-8 flex justify-center">
                <Button variant="ghost" size="sm" onClick={handleNewBatch}>
                  Cancel
                </Button>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Thumbnail Card ---------- */

interface ThumbnailCardProps {
  thumb: ThumbState
  index: number
  onDownload: (thumb: ThumbState, variant: VariantKey) => void
  onCopyUrl: (thumb: ThumbState, variant: VariantKey) => void
  onRegenerate: (thumbId: string) => void
  copyState: Record<string, boolean>
  interactive: boolean
}

function ThumbnailCard({
  thumb,
  index,
  onDownload,
  onCopyUrl,
  onRegenerate,
  copyState,
  interactive,
}: ThumbnailCardProps) {
  const [variant, setVariant] = useState<VariantKey>("youtube")
  const aspectClass =
    variant === "youtube"
      ? "aspect-video"
      : variant === "shorts"
        ? "aspect-[9/16]"
        : "aspect-square"

  if (thumb.status === "generating" || thumb.status === "pending") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: easeOutQuart, delay: index * 0.05 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {STYLE_LABELS[thumb.style_name]}
          </span>
          <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
        </div>
        <div
          className={`${aspectClass} w-full overflow-hidden rounded-lg border border-border bg-muted`}
        >
          <div
            className="h-full w-full animate-pulse"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, var(--accent) 40%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.8s linear infinite",
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {STYLE_DESCRIPTIONS[thumb.style_name]}
        </p>
      </motion.div>
    )
  }

  if (thumb.status === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: easeOutQuart, delay: index * 0.05 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {STYLE_LABELS[thumb.style_name]}
          </span>
          <span className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3.5" />
            Failed
          </span>
        </div>
        <div
          className={`${aspectClass} flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-destructive/30 bg-destructive/5`}
        >
          <AlertCircle className="size-8 text-destructive/60" />
          <p className="px-6 text-center text-sm text-muted-foreground">
            Generation failed{thumb.error ? `: ${thumb.error}` : ""}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRegenerate(thumb.id)}
          >
            <RefreshCw className="size-4" />
            Regenerate
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOutQuart, delay: index * 0.08 }}
      className="flex flex-col gap-3"
    >
      {/* Style label */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {STYLE_LABELS[thumb.style_name]}
        </span>
        {interactive && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => onRegenerate(thumb.id)}
                aria-label={`Regenerate ${STYLE_LABELS[thumb.style_name]}`}
              >
                <RefreshCw className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Regenerate this thumbnail</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Image */}
      <div
        className={`${aspectClass} relative w-full overflow-hidden rounded-lg border border-border bg-muted`}
      >
        <img
          src={thumb.variants?.[variant] ?? thumb.imagekit_url ?? ""}
          alt={`${STYLE_LABELS[thumb.style_name]} thumbnail — ${VARIANT_LABELS[variant]}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Variant tabs */}
      {interactive && thumb.variants && (
        <>
          <Tabs
            value={variant}
            onValueChange={(v) => setVariant(v as VariantKey)}
          >
            <TabsList className="w-full">
              {(Object.keys(VARIANT_LABELS) as VariantKey[]).map((key) => (
                <TabsTrigger key={key} value={key} className="flex-1 text-xs">
                  {VARIANT_LABELS[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <p className="text-[11px] text-muted-foreground">
            {VARIANT_DIMENSIONS[variant]} px
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onDownload(thumb, variant)}
            >
              <Download className="size-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onCopyUrl(thumb, variant)}
            >
              {copyState[`${thumb.id}-${variant}`] ? (
                <>
                  <Check className="size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy URL
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </motion.div>
  )
}