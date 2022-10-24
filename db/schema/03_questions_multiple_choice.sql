DROP TABLE IF EXISTS questions_multiple_choice CASCADE;

CREATE TABLE questions_multiple_choice (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(255) NOT NULL,
  incorrect_answer_one VARCHAR(255) NOT NULL,
  incorrect_answer_two VARCHAR(255) NOT NULL,
  incorrect_answer_three VARCHAR(255) NOT NULL
);



