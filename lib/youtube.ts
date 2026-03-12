/**
 * Extracts a YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== "string") return null;

  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([^&#?/]+)/,
    /(?:youtu\.be\/)([^&#?/]+)/,
    /(?:youtube\.com\/embed\/)([^&#?/]+)/,
    /(?:youtube\.com\/shorts\/)([^&#?/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Converts a YouTube URL to an embeddable URL with recommended parameters.
 * Returns null if the URL is invalid.
 */
export function toYouTubeEmbedUrl(
  url: string,
  options?: {
    autoplay?: boolean;
    mute?: boolean;
    rel?: boolean;
    modestBranding?: boolean;
  }
): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: options?.rel === false ? "0" : "0",
    modestbranding: "1",
    ...(options?.autoplay && { autoplay: "1" }),
    ...(options?.mute && { mute: "1" }),
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/**
 * Constructs a thumbnail URL for a given YouTube video ID.
 */
export function getYouTubeThumbnail(
  url: string,
  quality: "default" | "hqdefault" | "mqdefault" | "maxresdefault" = "hqdefault"
): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}
