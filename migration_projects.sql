-- Add missing columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget_min numeric;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget_max numeric;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS deadline date;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tasks jsonb DEFAULT '[]'::jsonb;
