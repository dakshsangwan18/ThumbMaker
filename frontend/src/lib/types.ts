export type ThumbnailStatus = "pending" | "generating" | "uploaded" | "failed"

export type JobStatus = "pending" | "processing" | "completed" | "failed"

export type StyleName = "bold_dramatic" | "clean_minimal" | "vibrant_energetic"

export type VariantKey = "youtube" | "shorts" | "square"

export interface ThumbnailVariants {
  youtube: string
  shorts: string
  square: string
}

export interface Thumbnail {
  id: string
  style_name: StyleName
  status: ThumbnailStatus
  imagekit_url: string | null
  error_message: string | null
  variants: ThumbnailVariants | null
}

export interface Job {
  id: string
  prompt: string
  num_thumbnails: number
  headshot_url: string
  status: JobStatus
  thumbnails: Thumbnail[]
}

export interface CreateJobResponse {
  job_id: string
}

export interface SSEThumbnailReady {
  thumbnail_id: string
  style_name: StyleName
  imagekit_url: string
  variants: ThumbnailVariants
}

export interface SSEThumbnailFailed {
  thumbnail_id: string
  style_name: StyleName
  error: string | null
}

export interface SSEJobComplete {
  job_id: string
  status: JobStatus
}

export interface SSECallbacks {
  onThumbnailReady: (data: SSEThumbnailReady) => void
  onThumbnailFailed: (data: SSEThumbnailFailed) => void
  onJobComplete: (data: SSEJobComplete) => void
  onError: (event: Event) => void
}

export const STYLE_LABELS: Record<StyleName, string> = {
  bold_dramatic: "Bold Dramatic",
  clean_minimal: "Clean Minimal",
  vibrant_energetic: "Vibrant Energetic",
}

export const STYLE_DESCRIPTIONS: Record<StyleName, string> = {
  bold_dramatic: "High contrast, cinematic lighting, dark moody background",
  clean_minimal: "Bright, white background, modern professional aesthetic",
  vibrant_energetic: "Colorful gradients, dynamic angles, pop-art energy",
}

export const VARIANT_LABELS: Record<VariantKey, string> = {
  youtube: "YouTube",
  shorts: "Shorts",
  square: "Square",
}

export const VARIANT_DIMENSIONS: Record<VariantKey, string> = {
  youtube: "1280 × 720",
  shorts: "1080 × 1920",
  square: "1080 × 1080",
}
