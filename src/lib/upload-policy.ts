export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const EXTENSIONS = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["application/pdf", "pdf"],
]);

interface UploadCandidate {
  type: string;
  size: number;
}

export type UploadValidation =
  | { ok: true; extension: string }
  | { ok: false; error: string };

export function validateUpload(file: UploadCandidate): UploadValidation {
  const extension = EXTENSIONS.get(file.type);
  if (!extension) {
    return { ok: false, error: "Upload a JPEG, PNG, WebP, or PDF file." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Files must be 10 MB or smaller." };
  }
  return { ok: true, extension };
}
