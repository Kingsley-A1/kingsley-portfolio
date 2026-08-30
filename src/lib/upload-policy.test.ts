import { describe, expect, it } from "vitest";
import { MAX_UPLOAD_BYTES, validateUpload } from "./upload-policy";

describe("admin upload policy", () => {
  it.each([
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
    ["application/pdf", "pdf"],
  ])("accepts %s and derives .%s", (type, extension) => {
    expect(validateUpload({ type, size: 1024 })).toEqual({ ok: true, extension });
  });

  it("rejects unapproved content types", () => {
    expect(validateUpload({ type: "image/svg+xml", size: 1024 })).toEqual({
      ok: false,
      error: "Upload a JPEG, PNG, WebP, or PDF file.",
    });
  });

  it("rejects files larger than 10 MB", () => {
    expect(validateUpload({ type: "image/png", size: MAX_UPLOAD_BYTES + 1 })).toEqual({
      ok: false,
      error: "Files must be 10 MB or smaller.",
    });
  });
});
