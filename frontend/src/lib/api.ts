import type {
  CreateJobResponse,
  Job,
  SSECallbacks,
} from "./types";

const API_BASE = "/api";

export async function uploadHeadshot(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/upload-headshot`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail ?? "Failed to upload headshot");
  }
  return res.json();
}

export async function createJob({
  prompt,
  numThumbnails,
  headshotUrl,
}: {
  prompt: string;
  numThumbnails: number;
  headshotUrl: string;
}): Promise<CreateJobResponse> {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      num_thumbnails: numThumbnails,
      headshot_url: headshotUrl,
    }),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail ?? "Failed to create job");
  }
  return res.json();
}

export async function getJob(jobId: string): Promise<Job> {
  const res = await fetch(`${API_BASE}/jobs/${jobId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }
  return res.json();
}

export async function regenerateThumbnail(
  jobId: string,
  thumbnailId: string
): Promise<{ status: string }> {
  const res = await fetch(
    `${API_BASE}/jobs/${jobId}/thumbnails/${thumbnailId}/regenerate`,
    { method: "POST" }
  );
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail ?? "Failed to regenerate thumbnail");
  }
  return res.json();
}

export function subscribeToJob(jobId: string, callbacks: SSECallbacks): EventSource {
  const es = new EventSource(`${API_BASE}/jobs/${jobId}/stream`);

  es.addEventListener("thumbnail_ready", (event) => {
    callbacks.onThumbnailReady(JSON.parse(event.data));
  });

  es.addEventListener("thumbnail_failed", (event) => {
    callbacks.onThumbnailFailed(JSON.parse(event.data));
  });

  es.addEventListener("job_complete", (event) => {
    callbacks.onJobComplete(JSON.parse(event.data));
    es.close();
  });

  es.addEventListener("error", (event) => {
    callbacks.onError(event);
    es.close();
  });

  return es;
}
