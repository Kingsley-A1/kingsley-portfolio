-- Add social links column (CockroachDB-compatible: no NOT NULL default backfill)
ALTER TABLE personal_about ADD COLUMN IF NOT EXISTS social_links JSONB NULL;

UPDATE personal_about SET social_links = '{"github":"https://github.com/kingsley-a1","linkedin":"https://linkedin.com/in/kingsley-maduabuchi","twitter":"https://twitter.com/blessedking_","facebook":"","instagram":"","tiktok":""}'::JSONB
WHERE id = 'primary' AND social_links IS NULL;
