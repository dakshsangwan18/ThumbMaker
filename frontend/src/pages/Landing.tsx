import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Upload, Type, Download } from "lucide-react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { STYLE_LABELS, STYLE_DESCRIPTIONS } from "@/lib/types"
import type { StyleName } from "@/lib/types"

const steps = [
  {
    icon: Upload,
    title: "Upload your headshot",
    body: "A clear photo of the person who'll be the face of the thumbnail. We use it as the visual anchor.",
  },
  {
    icon: Type,
    title: "Describe the thumbnail",
    body: "Write a prompt — the mood, the background, the text, the energy. Be as specific or as loose as you want.",
  },
  {
    icon: Download,
    title: "Download in any ratio",
    body: "Get YouTube landscape, Shorts vertical, and square crops from every generated thumbnail. Ready to publish.",
  },
]

// Sample thumbnail compositions — show-don't-tell. These look like real output.
interface SampleThumb {
  style: StyleName
  title: string
  bg: string
  titleColor: string
  accent: string
}

const samples: SampleThumb[] = [
  {
    style: "bold_dramatic",
    title: "I FAILED 100 TIMES",
    bg: "radial-gradient(120% 100% at 30% 20%, oklch(0.28 0.04 50) 0%, oklch(0.14 0.015 50) 60%, oklch(0.10 0.01 50) 100%)",
    titleColor: "oklch(0.96 0.02 70)",
    accent: "oklch(0.74 0.15 65)",
  },
  {
    style: "clean_minimal",
    title: "FIRST $10K MONTH",
    bg: "linear-gradient(135deg, oklch(0.94 0.02 75) 0%, oklch(0.97 0.015 75) 100%)",
    titleColor: "oklch(0.22 0.02 50)",
    accent: "oklch(0.45 0.10 50)",
  },
  {
    style: "vibrant_energetic",
    title: "VIRAL IN 24H",
    bg: "linear-gradient(135deg, oklch(0.70 0.16 55) 0%, oklch(0.62 0.18 35) 50%, oklch(0.50 0.14 20) 100%)",
    titleColor: "oklch(0.16 0.02 50)",
    accent: "oklch(0.96 0.02 70)",
  },
]

const stylesPreview: { name: StyleName; label: string; description: string; bg: string; textColor: string }[] = [
  {
    name: "bold_dramatic",
    label: STYLE_LABELS.bold_dramatic,
    description: STYLE_DESCRIPTIONS.bold_dramatic,
    bg: "radial-gradient(120% 100% at 30% 20%, oklch(0.28 0.04 50) 0%, oklch(0.14 0.015 50) 70%)",
    textColor: "oklch(0.96 0.02 70)",
  },
  {
    name: "clean_minimal",
    label: STYLE_LABELS.clean_minimal,
    description: STYLE_DESCRIPTIONS.clean_minimal,
    bg: "linear-gradient(135deg, oklch(0.94 0.02 75) 0%, oklch(0.97 0.015 75) 100%)",
    textColor: "oklch(0.22 0.02 50)",
  },
  {
    name: "vibrant_energetic",
    label: STYLE_LABELS.vibrant_energetic,
    description: STYLE_DESCRIPTIONS.vibrant_energetic,
    bg: "linear-gradient(135deg, oklch(0.70 0.16 55) 0%, oklch(0.50 0.14 20) 100%)",
    textColor: "oklch(0.16 0.02 50)",
  },
]

const easeOutQuart = [0.25, 1, 0.5, 1] as const

export default function Landing() {
  return (
    <div className="min-h-svh">
      <Navbar />

      {/* Hero — asymmetric editorial split. Show, don't tell. */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutQuart }}
            className="lg:col-span-5"
          >
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[4.5rem]">
              Thumbnails that{" "}
              <span className="text-primary">stop the scroll</span>.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg text-muted-foreground">
              Upload a headshot, describe the vibe, get publish-ready thumbnails
              in three artistic styles — YouTube, Shorts, and square.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/app">
                  Start creating
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: sample thumbnail composition — the product's output IS the hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOutQuart, delay: 0.1 }}
            className="relative pb-24 lg:col-span-7"
          >
            <div className="relative mx-auto aspect-video max-w-xl lg:ml-auto lg:max-w-none">
              {samples.map((s, i) => {
                const isMain = i === 0
                const positionClass = isMain
                  ? "absolute inset-0 z-20"
                  : i === 1
                    ? "absolute -bottom-16 left-0 z-30 w-[44%] sm:-left-6"
                    : "absolute -bottom-16 right-0 z-30 w-[44%] sm:-right-6"
                const rotate = i === 0 ? 0 : i === 1 ? -4 : 5
                return (
                  <motion.div
                    key={s.style}
                    initial={{ opacity: 0, y: 24, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate }}
                    transition={{
                      duration: 0.7,
                      ease: easeOutQuart,
                      delay: 0.2 + i * 0.12,
                    }}
                    className={`${positionClass} aspect-video overflow-hidden rounded-lg border border-border shadow-2xl`}
                  >
                    <div
                      className="flex h-full w-full flex-col justify-end p-4 sm:p-5"
                      style={{ background: s.bg }}
                    >
                      <span
                        className="mb-1.5 text-[10px] font-semibold tracking-wide uppercase sm:text-[11px]"
                        style={{ color: s.accent }}
                      >
                        {STYLE_LABELS[s.style]}
                      </span>
                      <span
                        className="text-xl font-extrabold leading-[1.05] tracking-tight sm:text-2xl md:text-3xl"
                        style={{ color: s.titleColor }}
                      >
                        {s.title}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works — numbered sequence is earned here */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              From idea to thumbnail in under two minutes.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No design skills required. The AI does the heavy lifting; you do
              the creative direction.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: easeOutQuart, delay: i * 0.08 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-accent-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <step.icon className="size-5 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="text-pretty text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles preview */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Three styles. Pick your energy.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each generation produces up to three distinct visual styles. Take
              the one that fits the video.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stylesPreview.map((style, i) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: easeOutQuart, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden rounded-lg border border-border"
              >
                <div
                  className="flex aspect-video items-center justify-center"
                  style={{ background: style.bg }}
                >
                  <span
                    className="text-base font-semibold tracking-tight"
                    style={{ color: style.textColor }}
                  >
                    {style.label}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <h3 className="font-medium tracking-tight">{style.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {style.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              Your next thumbnail is one prompt away.
            </h2>
            <Button asChild size="lg" className="mt-8 group">
              <Link to="/app">
                Generate thumbnails
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <p className="text-sm text-muted-foreground">Thumbmaker</p>
          <p className="text-sm text-muted-foreground">Built for creators.</p>
        </div>
      </footer>
    </div>
  )
}