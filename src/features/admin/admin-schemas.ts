import { z } from "zod";

const shortText = z.string().trim().min(1).max(200);
const longText = z.string().trim().min(1).max(5_000);
const year = z.string().trim().regex(/^\d{4}$/, "Use a four-digit year");

function isAssetLocation(value: string) {
  if (value.startsWith("/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const requiredAssetLocation = z
  .string()
  .trim()
  .min(1)
  .max(2_048)
  .refine(isAssetLocation, "Use an HTTP(S) URL or a site-relative path");

const optionalAssetLocation = z
  .string()
  .trim()
  .max(2_048)
  .refine((value) => value === "" || isAssetLocation(value), "Use an HTTP(S) URL or a site-relative path")
  .transform((value) => value || null);

const optionalExternalUrl = z
  .string()
  .trim()
  .max(2_048)
  .refine((value) => {
    if (value === "") return true;
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }, "Use a valid HTTPS URL")
  .transform((value) => value || null);

const socialLinksSchema = z
  .object({
    github: optionalExternalUrl.optional(),
    linkedin: optionalExternalUrl.optional(),
    twitter: optionalExternalUrl.optional(),
    facebook: optionalExternalUrl.optional(),
    instagram: optionalExternalUrl.optional(),
    tiktok: optionalExternalUrl.optional(),
  })
  .strict()
  .transform((links) =>
    Object.fromEntries(
      Object.entries(links).filter((entry): entry is [string, string] =>
        typeof entry[1] === "string",
      ),
    ),
  );

export const aboutUpdateSchema = z
  .object({
    headline: z.string().trim().min(1).max(200).optional(),
    bio: z.string().trim().min(1).max(1_000).optional(),
    extendedBio: z.string().trim().min(1).max(5_000).optional(),
    interests: z.array(z.string().trim().min(1).max(60)).max(30).optional(),
    socialLinks: socialLinksSchema.optional(),
    photoUrl: optionalAssetLocation.optional(),
    photoKey: z.string().trim().max(500).nullable().optional(),
    cvUrl: optionalAssetLocation.optional(),
    cvKey: z.string().trim().max(500).nullable().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field");

const graphicsFields = {
  title: shortText,
  category: shortText,
  description: z.string().trim().max(2_000).nullable().optional(),
  imageUrl: requiredAssetLocation,
  imageKey: z.string().trim().max(500).nullable().optional(),
  client: z.string().trim().max(200).nullable().optional(),
  year,
  published: z.boolean().optional(),
  sortOrder: z.number().int().min(-10_000).max(10_000).optional(),
};

export const graphicsCreateSchema = z.object(graphicsFields).strict();
export const graphicsUpdateSchema = z
  .object(graphicsFields)
  .partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field");

const collaborationFields = {
  partnerName: shortText,
  partnerLogoUrl: optionalAssetLocation.optional(),
  partnerLogoKey: z.string().trim().max(500).nullable().optional(),
  projectName: shortText,
  description: longText,
  role: shortText,
  year,
  link: optionalExternalUrl.optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().int().min(-10_000).max(10_000).optional(),
};

export const collaborationCreateSchema = z.object(collaborationFields).strict();
export const collaborationUpdateSchema = z
  .object(collaborationFields)
  .partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field");

const experienceFields = {
  company: shortText,
  role: shortText,
  description: longText,
  startDate: z.string().trim().min(1).max(100),
  endDate: z.string().trim().max(100).nullable().optional(),
  isCurrent: z.boolean().optional(),
  companyLogoUrl: optionalAssetLocation.optional(),
  companyLogoKey: z.string().trim().max(500).nullable().optional(),
  skillsUsed: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().int().min(-10_000).max(10_000).optional(),
};

export const experienceCreateSchema = z
  .object(experienceFields)
  .strict()
  .transform((value) => ({
    ...value,
    endDate: value.isCurrent ? null : value.endDate || null,
  }));

export const experienceUpdateSchema = z
  .object(experienceFields)
  .partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field")
  .transform((value) => ({
    ...value,
    ...(value.isCurrent ? { endDate: null } : {}),
  }));

export type AboutUpdateInput = z.infer<typeof aboutUpdateSchema>;
export type GraphicsCreateInput = z.infer<typeof graphicsCreateSchema>;
export type GraphicsUpdateInput = z.infer<typeof graphicsUpdateSchema>;
export type CollaborationCreateInput = z.infer<typeof collaborationCreateSchema>;
export type CollaborationUpdateInput = z.infer<typeof collaborationUpdateSchema>;
export type ExperienceCreateInput = z.infer<typeof experienceCreateSchema>;
export type ExperienceUpdateInput = z.infer<typeof experienceUpdateSchema>;
