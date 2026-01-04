/*
  # Create announcements table

  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `message` (text) - Le contenu de l'annonce
      - `is_active` (boolean) - Si l'annonce doit être affichée
      - `order` (integer) - Ordre d'affichage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `announcements` table
    - Add policy for public read access (annonces visibles par tous)
    - Add policy for authenticated admin updates
*/

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  is_active boolean DEFAULT true,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active announcements"
  ON announcements
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage announcements"
  ON announcements
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert some example announcements
INSERT INTO announcements (message, is_active, "order") VALUES
  ('🚀 Nouveau projet en cours de développement', true, 1),
  ('💼 Disponible pour des missions freelance', true, 2),
  ('🔧 Portfolio mis à jour avec de nouvelles features', true, 3)
ON CONFLICT DO NOTHING;