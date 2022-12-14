-- Drop and recreate multiple choice questions
DROP TABLE IF EXISTS quiz_results CASCADE;

CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  score SMALLINT NOT NULL,
  max_score SMALLINT NOT NULL
);
