const DEFAULT_BESPOKE_ORIGIN = "https://www.bespoketech.com.ng";

interface ProjectImageInput {
  id: string;
  imageUrl: string;
  imageKey: string | null;
  baseUrl?: string;
}

function resolveBaseUrl(value: string | undefined): string {
  try {
    const url = new URL(value || DEFAULT_BESPOKE_ORIGIN);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_BESPOKE_ORIGIN;
    }
    return url.origin;
  } catch {
    return DEFAULT_BESPOKE_ORIGIN;
  }
}

export function resolveBespokeProjectImage({
  id,
  imageUrl,
  imageKey,
  baseUrl,
}: ProjectImageInput): string {
  const origin = resolveBaseUrl(baseUrl);
  if (imageKey) {
    return `${origin}/api/portfolio-projects/${encodeURIComponent(id)}/image`;
  }
  if (imageUrl.startsWith("/")) return new URL(imageUrl, origin).toString();
  return imageUrl;
}
