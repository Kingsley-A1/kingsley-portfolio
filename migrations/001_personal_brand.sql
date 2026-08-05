-- Kingsley Portfolio — personal brand tables
-- Shares the Bespoke Technologies CockroachDB cluster.
-- Run: node --env-file-if-exists=.env.local scripts/migrate.mjs

-- ── Personal About ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS personal_about (
  id STRING PRIMARY KEY DEFAULT 'primary',
  bio TEXT NOT NULL DEFAULT '',
  headline STRING NOT NULL DEFAULT '',
  extended_bio TEXT NOT NULL DEFAULT '',
  interests JSONB NOT NULL DEFAULT '[]'::JSONB,
  photo_url STRING NULL,
  photo_key STRING NULL,
  cv_url STRING NULL,
  cv_key STRING NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO personal_about (id, bio, headline, extended_bio, interests)
VALUES (
  'primary',
  'Full-stack software engineer passionate about building elegant, high-performance digital experiences.',
  'Engineer focused on value creation and business impact.',
  'I am Kingsley Maduabuchi, socially known as Blessed King. An Engineer, Technician, and Software Developer passionate about technology, professional marketing, public speaking, and making positive contributions toward changing the world.',
  '["Technology","AI","Software Development","Hardware Engineering","Building Startups","French","Creativity","Innovation","Excellence"]'::JSONB
)
ON CONFLICT (id) DO NOTHING;

-- ── Graphics Works ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS graphics_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title STRING NOT NULL,
  category STRING NOT NULL DEFAULT 'Branding',
  description STRING NULL,
  image_url STRING NOT NULL,
  image_key STRING NULL,
  client STRING NULL,
  year STRING NOT NULL,
  published BOOL NOT NULL DEFAULT true,
  sort_order INT4 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS graphics_works_published_idx
  ON graphics_works (published, sort_order, created_at);

-- ── Collaborations ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name STRING NOT NULL,
  partner_logo_url STRING NULL,
  partner_logo_key STRING NULL,
  project_name STRING NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  role STRING NOT NULL,
  year STRING NOT NULL,
  link STRING NULL,
  published BOOL NOT NULL DEFAULT true,
  sort_order INT4 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS collaborations_published_idx
  ON collaborations (published, sort_order, created_at);

-- ── Work Experience ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company STRING NOT NULL,
  role STRING NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  start_date STRING NOT NULL,
  end_date STRING NULL,
  is_current BOOL NOT NULL DEFAULT false,
  company_logo_url STRING NULL,
  company_logo_key STRING NULL,
  skills_used JSONB NOT NULL DEFAULT '[]'::JSONB,
  published BOOL NOT NULL DEFAULT true,
  sort_order INT4 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS work_experience_published_idx
  ON work_experience (published, sort_order, created_at);
