/*
  # Sécurisation des tables admin

  1. Nouvelles Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_id` (uuid, référence vers auth.users)
      - `created_at` (timestamptz)
  
  2. Sécurité
    - Activer RLS sur toutes les tables
    - page_views: Lecture pour tous, écriture pour tous (analytics publiques)
    - announcements: Lecture pour tous, modification uniquement pour admins
    - admin_users: Accessible uniquement par admins
  
  3. Changements
    - Ajout de policies restrictives sur announcements
    - Création de la table admin_users pour gérer les accès admin
*/

-- Créer la table admin_users
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Activer RLS sur admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur announcements si pas déjà fait
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur page_views si pas déjà fait
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policies pour page_views (analytics publiques)
DROP POLICY IF EXISTS "Anyone can insert page views" ON page_views;
CREATE POLICY "Anyone can insert page views"
  ON page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all page views" ON page_views;
CREATE POLICY "Admins can view all page views"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Policies pour announcements (lecture publique, modification admin uniquement)
DROP POLICY IF EXISTS "Anyone can view active announcements" ON announcements;
CREATE POLICY "Anyone can view active announcements"
  ON announcements
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can insert announcements" ON announcements;
CREATE POLICY "Admins can insert announcements"
  ON announcements
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can update announcements" ON announcements;
CREATE POLICY "Admins can update announcements"
  ON announcements
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can delete announcements" ON announcements;
CREATE POLICY "Admins can delete announcements"
  ON announcements
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Policies pour admin_users (uniquement accessibles par admins)
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
CREATE POLICY "Admins can view admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );