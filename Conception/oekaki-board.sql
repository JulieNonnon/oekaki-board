CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "username" varchar(30) UNIQUE NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" text NOT NULL,
  "created_at" timestamptz NOT NULL
);

CREATE TABLE "drawings" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "title" varchar(100) NOT NULL,
  "description" text,
  "image_url" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL
);

CREATE TABLE "comments" (
  "id" uuid PRIMARY KEY,
  "drawing_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamptz NOT NULL
);

CREATE TABLE "likes" (
  "user_id" uuid NOT NULL,
  "drawing_id" uuid NOT NULL,
  PRIMARY KEY ("user_id", "drawing_id")
);

ALTER TABLE "drawings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "comments" ADD FOREIGN KEY ("drawing_id") REFERENCES "drawings" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "likes" ADD FOREIGN KEY ("drawing_id") REFERENCES "drawings" ("id") DEFERRABLE INITIALLY IMMEDIATE;
