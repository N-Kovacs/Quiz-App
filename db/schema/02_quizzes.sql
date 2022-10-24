DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  public BOOLEAN NOT NULL DEFAULT FALSE,
  title VARCHAR(255),
  subject VARCHAR(225),
<<<<<<< HEAD
  image_url VARCHAR(255),
=======
  image_url VARCHAR(225),
>>>>>>> master
  url VARCHAR(225)
);
