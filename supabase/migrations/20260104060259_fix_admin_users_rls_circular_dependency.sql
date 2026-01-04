/*
  # Fix admin_users RLS circular dependency

  1. Changements
    - Remplacer la policy restrictive qui crée une dépendance circulaire
    - Permettre aux utilisateurs authentifiés de vérifier leur propre statut admin
    - Les utilisateurs peuvent uniquement voir leur propre ligne dans admin_users
  
  2. Sécurité
    - Un utilisateur authentifié peut seulement voir si SON propre user_id existe dans admin_users
    - Impossible de voir les autres admins
    - Toujours protégé contre les accès non autorisés
*/

-- Supprimer l'ancienne policy qui créait le problème circulaire
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;

-- Nouvelle policy : les utilisateurs authentifiés peuvent voir leur propre statut admin
CREATE POLICY "Users can check own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
