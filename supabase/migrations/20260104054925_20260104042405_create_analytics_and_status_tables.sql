/*
  # Portfolio Analytics and Status System

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key)
      - `page_path` (text) - Path of the page visited
      - `visitor_id` (text) - Anonymous visitor identifier
      - `user_agent` (text) - Browser user agent
      - `referrer` (text) - Referrer URL
      - `created_at` (timestamptz) - Visit timestamp
    
    - `status`
      - `id` (uuid, primary key)
      - `current_status` (text) - available, busy, away
      - `status_message` (text) - Custom status message
      - `updated_at` (timestamptz) - Last update timestamp
      - `is_active` (boolean) - Whether this is the active status

  2. Security
    - Enable RLS on both tables
    - `page_views`: Public can insert (for tracking), only authenticated can read
    - `status`: Public can read, only authenticated can update

  3. Important Notes
    - Analytics are lightweight and anonymous
    - Status system allows real-time updates
    - All timestamps use UTC
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visitor_id text NOT NULL,
  user_agent text DEFAULT '',
  referrer text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create status table
CREATE TABLE IF NOT EXISTS status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  current_status text NOT NULL DEFAULT 'available',
  status_message text DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT false
);

-- Insert default status
INSERT INTO status (current_status, status_message, is_active)
VALUES ('available', 'Open to opportunities', true)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE status ENABLE ROW LEVEL SECURITY;

-- Policies for page_views
CREATE POLICY "Anyone can insert page views"
  ON page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read page views"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for status
CREATE POLICY "Anyone can read status"
  ON status
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update status"
  ON status
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert status"
  ON status
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_status_is_active ON status(is_active);