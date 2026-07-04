import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Upload, Type, Download, Sparkles } from "lucide-react"
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

const styles: { name: StyleName; label: string; description: string; gradient: string }[] = [
  {
    name: "bold_dramatic",
    label: STYLE_LABELS.bold_dramatic,
    description: STYLE_DESCRIPTIONS.bold_dramatic,
    gradient: "from-violet-900 via-zinc-900 to-black",
  },
  {
    name: "clean_minimal",
    label: STYLE_LABELS.clean_minimal,
    description: STYLE_DESCRIPTIONS.clean_minimal,
    gradient: "from-zinc-100 via-zinc-200 to-zinc-300",
  },
  {
    name: "vibrant_energetic",
    label: STYLE_LABELS.vibrant_energetic,
    description: STYLE_DESCRIPTIONS.vibrant_energetic,
    gradient: "from-fuchsia-500 via-violet-500 to-cyan-400",
  },
]

const easeOutQuart = [0.25, 1, 0.5, 1] as const

export default function Landing() {
  return (
    <div className="min-h-svh">
      <Navbar />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3 text-primary" />
            AI-powered thumbnail generation
          </div>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Thumbnails that{" "}
            <span className="text-primary">stop the scroll</span>.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
            Upload a headshot, describe the vibe, and get publish-ready
            thumbnails in three artistic styles — YouTube, Shorts, and square.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link to="/app">
                Start creating
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              No sign-up needed. Just upload and go.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How it works — numbered sequence is earned here */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              From idea to thumbnail in under two minutes.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No design skills required. The AI does the heavy lifting; you
              do the creative direction.
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
                  <span className="text-sm font-medium text-primary tabular-nums">
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
              Each generation produces up to three distinct visual styles.
              Take the one that fits the video.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {styles.map((style, i) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: easeOutQuart, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden rounded-lg border border-border"
              >
                <div
                  className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${style.gradient}`}
                >
                  <span className="text-sm font-medium text-white/90 mix-blend-difference">
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
          <p className="text-sm text-muted-foreground">
            Built for creators.
          </p>
        </div>
      </footer>
    </div>
  )
}
