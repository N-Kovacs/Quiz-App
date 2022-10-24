-- Drop and recreate multiple choice questions
DROP TABLE IF EXISTS question_results CASCADE;

CREATE TABLE question_results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_results_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  questions_multiple_choice_id INTEGER REFERENCES questions_multiple_choice(id) ON DELETE CASCADE,
  correct BOOLEAN NOT NULL
);
