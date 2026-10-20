-- Contact consent records (TCPA / CAN-SPAM). Additive only.
ALTER TABLE invitation_requests ADD COLUMN consent_sms INTEGER NOT NULL DEFAULT 0;
ALTER TABLE invitation_requests ADD COLUMN consent_email INTEGER NOT NULL DEFAULT 0;
ALTER TABLE invitation_requests ADD COLUMN consent_version TEXT NOT NULL DEFAULT '';
ALTER TABLE invitation_requests ADD COLUMN consent_at TEXT NOT NULL DEFAULT '';
ALTER TABLE invitation_requests ADD COLUMN consent_ip TEXT NOT NULL DEFAULT '';
ALTER TABLE invitation_requests ADD COLUMN consent_user_agent TEXT NOT NULL DEFAULT '';
ALTER TABLE invitation_requests ADD COLUMN consent_wording TEXT NOT NULL DEFAULT '';
ALTER TABLE chapter_inquiries ADD COLUMN consent_sms INTEGER NOT NULL DEFAULT 0;
ALTER TABLE chapter_inquiries ADD COLUMN consent_email INTEGER NOT NULL DEFAULT 0;
ALTER TABLE chapter_inquiries ADD COLUMN consent_version TEXT NOT NULL DEFAULT '';
ALTER TABLE chapter_inquiries ADD COLUMN consent_at TEXT NOT NULL DEFAULT '';
ALTER TABLE chapter_inquiries ADD COLUMN consent_ip TEXT NOT NULL DEFAULT '';
ALTER TABLE chapter_inquiries ADD COLUMN consent_user_agent TEXT NOT NULL DEFAULT '';
ALTER TABLE chapter_inquiries ADD COLUMN consent_wording TEXT NOT NULL DEFAULT '';
