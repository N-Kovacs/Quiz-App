-- Drop and recreate multiple choice question

DROP TABLE IF EXISTS questions_multiple_choice CASCADE;
CREATE TABLE questions_multiple_choices (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question VARCHAR(n) NOT NULL,
  correct_answer VARCHAR(n) NOT NULL,
  incorrect_answer_one VARCHAR(n) NOT NULL,
  incorrect_answer_two VARCHAR(n) NOT NULL,
  incorrect_answer_three VARCHAR(n) NOT NULL
);



