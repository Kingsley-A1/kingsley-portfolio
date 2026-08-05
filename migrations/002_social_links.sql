-- Add social links to personal_about
ALTER TABLE personal_about ADD COLUMN IF NOT EXISTS social_links JSONB NOT NULL DEFAULT '{}'::JSONB;

UPDATE personal_about SET social_links = '{"github":"https://github.com/kingsley-a1","linkedin":"https://linkedin.com/in/kingsley-maduabuchi","twitter":"https://twitter.com/blessedking_","facebook":"","instagram":"","tiktok":""}'::JSONB
WHERE id = 'primary' AND social_links = '{}'::JSONB;
