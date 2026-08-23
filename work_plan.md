# Portfolio Elevation and Revolution — Work Plan
Inspo: garda.com

**Owner:** Kingsley Maduabuchi
**Scope:** Full identity, design system, copy, and architecture upgrade per agency audit.
**Assets available:** `public/Kingsley Maduabuchi/*.webp` (5 professional portraits — Main, On_Blue_Shirt, On_Dark_Shirt, Thinking, Unaware).

**Locked decisions (do not change):**

- Home hero headline stays **"Engineer. Creator. Problem solver."** — rendered clean, well-stacked (not the current gradient/rainbow treatment).
- Tagline stays **"A blend of technical precision, creative thinking, and a relentless drive to build things that matter."**
- Everything else in the audit proceeds as recommended.
- Agent walkers live **only** on `/businessos`. Zero presence anywhere else in the app.
- Incremental (staggered) reveal-on-scroll applied wherever new sections/lists are introduced or reworked.

---

## Phase 1 — Identity Foundation (Photo, Favicon, OG Image, Hero)

**Objective:** Replace every placeholder-initials touchpoint with the real photograph, and rebuild the hero composition around it.

**Work items:**

1. Select and crop portrait assets for each surface:
   - Favicon / `apple-icon` — square, tight crop (`Main` or `On_Dark_Shirt`).
   - `opengraph-image.tsx` — regenerate the OG template using a real photo (duotone/treated to match the new one-accent palette) instead of the initials badge.
   - Home hero — large-format photo replacing the 96px circle badge (`Main` or `Thinking`, asymmetric composition).
   - About page photo card — full-height photo replacing the initials placeholder (`On_Blue_Shirt` or `Unaware` for variety from the home hero).
2. Convert all `<img>` usages tied to these assets to `next/image` with explicit `sizes`/`priority` where above-the-fold.
3. Rebuild `layout.tsx` `icons` metadata to point at real generated favicon assets (PNG/ICO derived from the photo, not the gradient-K SVG).
4. Rebuild hero section layout in `page.tsx` so the photo is a first-class composition element, not a small card accessory.
5. Keep the locked headline/tagline text but restyle: clean single-weight display font, tight stacked line breaks, no rainbow gradient word.

**Acceptance criteria:**

- [x] `/`, `/about`, favicon tab, and social share previews (OG debugger / metadata inspection) all show the real photograph — no initials badge remains anywhere in the codebase.
- [x] `next/image` used for every above-the-fold and hero-adjacent photo; Lighthouse/DevTools confirms responsive `srcset` output.
- [x] Home hero headline renders exactly "Engineer. Creator. Problem solver." in a clean stacked layout with no color-gradient text treatment.
- [x] Tagline text matches exactly: "A blend of technical precision, creative thinking, and a relentless drive to build things that matter."
- [x] No console warnings from `next/image` (missing `sizes`, unconfigured domains, etc.) — remote patterns already cover cloudinary/S3/R2/simpleicons; local `/photos/*` and `/og-photo.jpg` are same-origin.
- [x] `pnpm build` succeeds with no type errors.

---

## Phase 2 — Design System Consolidation

**Objective:** Graduate the visual language from "casual multi-color template" to bold, restrained, Garda-tier confidence.

**Work items:**

1. Reduce the active brand palette used in gradients/hero chrome to **ink/paper + one signature accent**; retain teal/amber/coral only as secondary/tertiary tags deep in UI (e.g., skill badges), never in hero text or primary CTAs.
2. Remove multi-gradient text utilities (`text-gradient-full`, stacked blob gradients) from primary headlines; replace with weight/scale-driven emphasis.
3. Reduce concurrent ambient motion in the hero (`animate-pulse` blobs ×4 + `bg-animated-gradient` + grid overlay) to a single deliberate motion treatment.
4. Introduce deliberate radius hierarchy — structural elements get sharper corners, interactive surfaces keep generous rounding (replace the near-uniform `0.625rem` everywhere).
5. Differentiate at least one page layout (About or Projects) structurally from the shared `PageHero` recipe so pages don't feel interchangeable.
6. Apply incremental/staggered `Reveal` treatment consistently across reworked sections (hero sub-elements, stat blocks, skill cards) using existing `Reveal` component's `delay` prop pattern.

**Acceptance criteria:**

- [x] No page uses more than one accent hue in primary headline/CTA treatments; secondary hues confined to tags/badges only. (`text-gradient-*` utilities removed from `globals.css`; every headline emphasis is now solid `brand-blue`.)
- [x] Hero has at most one ambient animated background effect at any given time. (Home hero: 4 blobs → 1. Inner-page `bg-animated-gradient` reduced from 5-hue cycle to paper↔blue wash.)
- [x] `--radius-*` tokens are differentiated (not all equal to `0.625rem`) and applied intentionally per component type.
- [x] At least one page (About or Projects) has a visibly distinct structural layout from the Home/Graphics/Works hero pattern. (About now uses a custom editorial split-hero instead of `PageHero`.)
- [x] All new/reworked sections use `Reveal` with staggered `delay` for multi-item lists (grids, stat rows, skill cards) — verified via SSR content check.
- [x] `prefers-reduced-motion` still fully respected (existing CSS block in `globals.css` untouched/still functional).

---

## Phase 3 — Copy & Positioning Overhaul

**Objective:** Make the copy carry conviction — tech advocate, ML-engineer-in-the-making, deep thinker, builder who believes in the achievable-impossible — while preserving the two locked lines.

**Work items:**

1. Extend `PERSONA` in `constants.ts` with fields needed to express the fuller identity (e.g., a focus statement covering ML/AI trajectory and tech advocacy) without disturbing existing consumers.
2. Rewrite `PERSONA.tagline`/`headline` usages elsewhere (footer, metadata descriptions) so the "high-performance digital experiences" line is not repeated verbatim 3+ times — each surface gets distinct, purposeful copy.
3. Add or replace one entry in `CORE_SKILLS` to explicitly cover Machine Learning / Applied AI.
4. Add ML/AI-related entries to `TECH_STACK` (or a new `learning`/`focus` grouping) so the trajectory is visible in the About tech stack section, not hidden.
5. Rewrite the About page narrative paragraphs (currently resume-style opening) to lead with conviction/belief framing — thought-provoking, not motivational-poster generic — while keeping the page's existing headline "Engineer. Creator. Problem solver." styling consistent with Phase 1/2 changes if reused there too.
6. Audit all `SITE_DESCRIPTION`, Twitter/OG metadata strings, and footer blurb for repeated boilerplate; ensure each is distinct and specific.

**Acceptance criteria:**

- [x] Home hero H1 remains exactly "Engineer. Creator. Problem solver." and tagline remains exactly the locked sentence — verified by direct string match in `page.tsx`/`about/page.tsx`.
- [x] No other page/section repeats the phrase "high-performance digital experiences" (or near-duplicate) verbatim more than once site-wide. (Footer blurb rewritten; the phrase now only exists, unrendered, on the unused `PERSONA.tagline` constant.)
- [x] `CORE_SKILLS` includes a Machine Learning / Applied AI entry. (Replaced "Technical Leadership".)
- [x] `TECH_STACK` (or equivalent) surfaces ML/AI tools or focus areas visibly on the About page. (`TECH_STACK.learning` → Machine Learning, PyTorch, Applied AI Systems, Rust — rendered as "Learning: ML & AI".)
- [ ] About page narrative copy reviewed and confirmed by owner as reflecting tech-advocate / deep-thinker / "everything is possible" tone (owner sign-off checkpoint) — **needs Kingsley's review**, copy drafted at `src/app/about/page.tsx`.
- [x] `grep` for the old generic taglines in `constants.ts`, `layout.tsx`, `footer.tsx` returns no leftover duplicates outside the two locked lines.

---

## Phase 4 — Agent Walkers Relocation

**Objective:** Remove the roaming agent mascots from every public-facing page; confine them exclusively to `/businessos`.

**Work items:**

1. Remove `<AgentWalkers />` (and its `Suspense` wrapper) from `public-shell.tsx` entirely.
2. Mount `AgentWalkers` (or an adapted variant) only within the `/businessos` route tree, scoped so it never renders on `/`, `/about`, `/projects`, `/graphics`, `/collaborations`, `/works`, `/docs`, `/contact`, or `/admin/*`.
3. Rewrite `DIALOGUE_POOL` (and `GREETINGS`) in `dialogue.ts` to read as witty-but-competent systems-engineering commentary appropriate to a multi-agent orchestration demo, dropping the self-deprecating "we break prod / we're not paid" gag lines.
4. Confirm the walker component's `requestAnimationFrame` loop and `setInterval` only run while `/businessos` is mounted (cleanup on unmount already exists — verify it actually stops when navigating away).

**Acceptance criteria:**

- [x] Grep for `AgentWalkers` shows zero imports/usages in `public-shell.tsx` or any layout shared by public marketing pages.
- [x] Manually navigating `/`, `/about`, `/projects`, `/graphics`, `/collaborations`, `/works`, `/docs`, `/contact` shows no walker sprites or speech bubbles. (Verified via SSR HTML — walker container absent on all marketing routes.)
- [x] `/businessos` still shows walkers functioning (spawn, walk, bubble, drag, dismiss) as before. (Component unchanged, just remounted; SSR confirms it renders there.)
- [x] Dialogue pool no longer contains the "probation," "we don't get paid," "hardcoded the API key" style self-deprecating lines; replacement lines fit a professional-but-playful systems tone.
- [x] No dangling `rAF`/`setInterval` timers fire when `/businessos` is not the active route — component now only mounts on that route, so React unmount (existing cleanup, untouched) handles this by construction.

---

## Phase 5 — Architecture & Performance Hardening

**Objective:** Close the real engineering gaps identified in the audit so the codebase matches the premium front-end.

**Work items:**

1. Add basic rate limiting / attempt throttling to `/admin/api/login` (e.g., in-memory sliding window keyed by IP, or a small delay + max-attempts lockout).
2. Remove the dead `simpleHash` function from `admin-auth.ts` (or wire it in if a real purpose is intended — default to removal since password comparison doesn't use it).
3. Migrate remaining marketing `<img>` usages (`page.tsx` project/collab images, `graphics-gallery.tsx`, `projects-showcase.tsx`, About photo, footer partner logos) to `next/image` with proper `sizes`.
4. Document (one-line comment) that the inline theme-detection script in `layout.tsx` is intentionally static with no interpolated user input, to guard against future XSS regressions.
5. Reconcile `sitemap.ts` — deliberately include or exclude `/docs` and `/businessos` (currently inconsistent) with a clear rationale comment.

**Acceptance criteria:**

- [x] Repeated failed `/admin/api/login` attempts from the same client are throttled/blocked after a defined threshold — **manually verified**: 5 wrong-password attempts returned 401, 6th+ returned 429 with a `Retry-After` header.
- [x] `simpleHash` no longer exists unused in `admin-auth.ts` (removed).
- [x] `grep -r "<img"` across `src/components/marketing` and `src/app` returns no remaining raw `<img>` tags, except `opengraph-image.tsx` (Satori/`ImageResponse` requires plain `<img>`, incompatible with `next/image` by design).
- [x] `layout.tsx` theme script has a one-line comment noting it must remain free of interpolated values.
- [x] `sitemap.ts` entries match an explicit, documented decision about `/docs` and `/businessos` inclusion (both excluded, with rationale comment — neither is a canonical search-landing page).
- [x] `pnpm build` and `pnpm typecheck` both pass cleanly after all Phase 5 changes.

---

## Delivery sequencing

Phases run in order 1 → 5 since later phases depend on earlier ones (e.g., Phase 2's palette reduction should land before Phase 3 copy is styled; Phase 4's removal is independent and can run in parallel with Phase 2/3 if needed). Each phase ends with a `pnpm build` + `pnpm typecheck` gate before moving to the next.
