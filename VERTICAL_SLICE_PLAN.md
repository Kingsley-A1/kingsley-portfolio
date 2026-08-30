# Portfolio Admin, Theme & SEO Vertical Slice Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `executing-plans` and complete one slice at a time. Stop at every verification gate.

**Goal:** Secure the admin, make Bespoke Technologies the sole project authoring system, display its published projects reliably on Kingsley, restore light-default theming, and correct indexability and admin reliability gaps.

**Architecture:** Deliver five independently reviewable vertical slices. Bespoke Technologies owns project create/edit/delete and R2 assets; Kingsley is a read-only consumer with signed cross-app revalidation and a short ISR fallback.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Zod, CockroachDB/PostgreSQL, Vitest.

## Global Constraints

- Light is the default; dark is enabled only by an explicitly saved preference.
- `portfolio_projects` remains Bespoke-owned; Kingsley never creates, edits, deletes, migrates, or changes `created_by`.
- Preserve Bespoke's existing portfolio validation, audit, R2, and hero screenshot contracts.
- Validate every changed write boundary with Zod and explicit column allowlists.
- Never log secrets, passwords, session tokens, raw database URLs, or uploaded file contents.
- No production mutation, deployment, credential rotation, or live claim in this plan.
- One commit per slice per affected repository; do not mix unrelated refactors.

---

## Slice 1 — Secure the Admin Boundary

**Outcome:** Forged cookies are rejected, sessions expire, logout works, and uploads are bounded.

**Files:**

- Create: `src/lib/admin-session.ts`
- Create: `src/lib/admin-session.test.ts`
- Create: `src/app/admin/api/logout/route.ts`
- Modify: `src/lib/admin-auth.ts`
- Modify: `src/app/admin/api/login/route.ts`
- Modify: `src/app/admin/api/upload/route.ts`
- Modify: `src/components/admin/sidebar.tsx`
- Modify: `package.json`
- Create: `vitest.config.mts`

**Interfaces:**

- `createSessionToken(secret, expiresAt): Promise<string>` signs an HMAC-SHA256 token.
- `verifySessionToken(token, secret, now): Promise<boolean>` verifies signature and expiry.
- `getAdminSession()` returns `null` for missing, malformed, forged, expired, or misconfigured sessions.

- [x] Add Vitest and a `pnpm test` script.
- [x] Write failing tests for valid, forged, malformed, expired, and wrong-secret tokens.
- [x] Implement signed 12-hour sessions using `SESSION_SECRET` of at least 32 characters; fail closed when invalid.
- [x] Compare the admin password without timing-dependent string equality.
- [x] Add `POST /admin/api/logout`, clear the cookie, and replace “Back to site” with separate “View site” and “Log out” actions.
- [x] Restrict uploads to JPEG, PNG, WebP, and PDF; enforce a 10 MB limit and derive extensions from validated MIME types.
- [x] Run `pnpm test && pnpm typecheck && pnpm build`.
- [x] Manually prove an arbitrary cookie redirects to `/admin/login`, a valid login works, and logout invalidates access.
- [ ] Commit: `fix(admin): secure sessions and uploads`

**Gate:** Do not add project writes until forged-cookie rejection passes.

---

## Slice 2 — Bespoke-Canonical Project Integration

**Outcome:** Bespoke remains the only project editor; every published Bespoke project appears on Kingsley with working images and timely refresh.

**Files:**

- Create in Kingsley: `src/lib/portfolio-revalidation.ts`
- Create in Kingsley: `src/lib/portfolio-revalidation.test.ts`
- Create in Kingsley: `src/app/api/revalidate/portfolio/route.ts`
- Modify in Kingsley: `src/features/admin/projects-repository.ts`
- Modify in Kingsley: `src/app/admin/(protected)/projects/page.tsx`
- Modify in Kingsley: `src/components/admin/projects-list.tsx`
- Modify in Kingsley: `src/app/page.tsx`, `src/app/projects/page.tsx`, `next.config.ts`, `.env.example`
- Create in Bespoke: `src/features/admin/portfolio/kingsley-sync.ts`
- Create in Bespoke: `src/features/admin/portfolio/kingsley-sync.test.ts`
- Modify in Bespoke: portfolio project POST and `[id]` PUT/DELETE routes, `.env.example`

**Contract:** Bespoke sends `{ event, projectId, occurredAt }` with timestamped HMAC-SHA256 headers. Kingsley accepts only valid signatures within five minutes, then revalidates `/` and `/projects`; repeated valid requests are harmless.

- [ ] Write failing Kingsley tests for valid, forged, stale, malformed, and wrong-secret signatures.
- [ ] Implement the signed Kingsley revalidation endpoint; fail closed when the secret is missing or invalid.
- [ ] Resolve Bespoke R2-backed images through Bespoke's public image endpoint and resolve relative legacy image paths against the Bespoke origin.
- [ ] Make Kingsley home/projects use a 60-second revalidation fallback.
- [ ] Keep Kingsley Projects admin read-only and link explicitly to Bespoke `/admin/portfolio` for create/edit/delete.
- [ ] Make project filters expose `aria-pressed`; keep the live-project link visible and keyboard/touch reachable.
- [ ] Write failing Bespoke tests for request signing and disabled/misconfigured notification behavior.
- [ ] Notify Kingsley after successful Bespoke project create/update/delete without rolling back the authoritative Bespoke mutation if the secondary refresh fails.
- [ ] Document variable names/placeholders only in both `.env.example` files; do not configure live secrets.
- [ ] Run tests, lint, typecheck, and build in both repositories.
- [ ] Verify locally with synthetic signed requests only; do not mutate a configured database.
- [ ] Commit Kingsley: `feat(portfolio): sync Bespoke-owned projects`
- [ ] Commit Bespoke: `feat(portfolio): notify Kingsley project refresh`

**Gate:** Kingsley contains no project mutation endpoint or destructive control. Live cross-app delivery remains unverified until both deployments receive matching secrets and URLs.

---

## Slice 3 — Reliable Light-Default Theme

**Outcome:** First visits are light regardless of OS preference; an explicit dark choice works and persists without flash.

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/theme-provider.tsx`
- Modify: `src/components/layout/theme-toggle.tsx`
- Modify: public page/components containing `dark:` utilities as revealed by route review

- [ ] Add `@custom-variant dark (&:where(.dark, .dark *));` immediately after the Tailwind import.
- [ ] Make the pre-hydration script apply `.dark` only when `localStorage.theme === "dark"`; absence or invalid values stay light.
- [ ] Make `ThemeProvider` validate stored values and remove OS-preference fallback.
- [ ] Add `color-scheme: light` and `html.dark { color-scheme: dark; }`; set matching light/dark theme colours in metadata.
- [ ] Keep `/businessos` intentionally dark and keep admin light-only in this slice.
- [ ] Review `/`, `/about`, `/projects`, `/graphics`, `/collaborations`, `/works`, `/docs`, and `/contact` for readable backgrounds, text, borders, focus states, and native controls in both modes.
- [ ] Run `pnpm lint && pnpm typecheck && pnpm build`.
- [ ] Browser proof: cleared storage + dark OS gives light; toggle gives dark; reload preserves dark; toggling back persists light.
- [ ] Commit: `fix(theme): restore explicit light and dark modes`

---

## Slice 4 — Correct SEO & Index Control

**Outcome:** Search-worthy pages have accurate canonicals/social metadata; private or internal surfaces are explicitly excluded.

**Files:**

- Modify: `src/app/admin/layout.tsx`
- Create: `src/app/businessos/layout.tsx`
- Modify: `src/app/docs/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: metadata in `about`, `projects`, `graphics`, `collaborations`, `works`, and `contact` pages
- Create: `scripts/verify-seo.mjs`
- Modify: `package.json`

- [ ] Add `noindex, nofollow, noarchive` metadata and no inherited homepage canonical to `/admin/*`.
- [ ] Add explicit `noindex, nofollow` metadata to `/businessos` and `/docs`, matching their sitemap exclusion.
- [ ] Remove synthetic `new Date()` sitemap timestamps; omit `lastModified` until a truthful source exists.
- [ ] Add page-specific Twitter titles/descriptions/images wherever page-specific Open Graph metadata already exists.
- [ ] Add `pnpm seo:check` to build and assert robots/canonicals for home, projects, admin login, docs, and businessOS generated HTML.
- [ ] Run `pnpm seo:check && pnpm lint && pnpm typecheck`.
- [ ] Inspect generated `robots.txt`, `sitemap.xml`, canonical tags, robots tags, and social tags locally.
- [ ] Commit: `fix(seo): align metadata and indexability`

**Not proved here:** Search Console ownership, deployed metadata, crawling, and live indexing.

---

## Slice 5 — Honest Admin Persistence & Tooling

**Outcome:** Existing editors validate input, report failures, invalidate public caches, and pass the repository quality gates.

**Files:**

- Create: `src/features/admin/admin-schemas.ts`
- Create: `src/features/admin/admin-schemas.test.ts`
- Modify: protected about/graphics/collaborations/experience API routes
- Modify: corresponding repositories and admin forms/lists
- Modify: `src/app/admin/(protected)/page.tsx`
- Modify: `eslint.config.mjs`

- [ ] Add Zod schemas for about, graphics, collaboration, and experience create/update payloads.
- [ ] Replace request-key-derived SQL columns with per-repository allowlists.
- [ ] Return truthful `400`, `404`, and `500` responses without secret-bearing errors.
- [ ] Show inline save/delete failures; redirect or refresh only after `res.ok`.
- [ ] Revalidate affected public routes after successful mutations: `/` plus `/about`, `/graphics`, `/collaborations`, or `/works` as applicable.
- [ ] Replace the false “auto-save/immediate” dashboard copy with accurate save-and-publish behaviour.
- [ ] Replace `FlatCompat` with the native Next.js flat ESLint exports so lint starts without undeclared packages.
- [ ] Run `pnpm test && pnpm lint && pnpm typecheck && pnpm build`.
- [ ] Exercise one successful and one rejected mutation for every editor against a non-production database; restore changed values.
- [ ] Commit: `fix(admin): validate writes and surface persistence state`

---

## Final Acceptance

- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm seo:check` all pass from a clean checkout.
- [ ] Worktree diff contains only approved scope; no environment or secret files are included.
- [ ] Security, project editing, theme persistence, metadata, and existing editor flows have recorded local evidence.
- [ ] Deployment and live-provider verification remain separate, explicitly authorized work.
