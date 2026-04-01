-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table des utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Table des dessins
CREATE TABLE drawings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  replay_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_drawings_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Table des commentaires
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drawing_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_comments_drawing
    FOREIGN KEY(drawing_id)
    REFERENCES drawings(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_comments_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Table des likes
CREATE TABLE likes (
  user_id UUID NOT NULL,
  drawing_id UUID NOT NULL,

  PRIMARY KEY (user_id, drawing_id),

  CONSTRAINT fk_likes_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_likes_drawing
    FOREIGN KEY(drawing_id)
    REFERENCES drawings(id)
    ON DELETE CASCADE
);

-- Index pour optimiser les recherches
CREATE INDEX idx_drawings_user_id ON drawings(user_id);
CREATE INDEX idx_drawings_created_at ON drawings(created_at DESC);
CREATE INDEX idx_comments_drawing_id ON comments(drawing_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- Pour recherche rapide JSON (si besoin)
CREATE INDEX idx_drawings_replay_data ON drawings USING GIN (replay_data);

-- Trigger updated_at auto
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_drawings_updated_at
BEFORE UPDATE ON drawings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();