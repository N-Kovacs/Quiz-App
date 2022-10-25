SELECT quizzes.*, ROUND(AVG(quiz_results.score))*10 AS avg,
  COUNT(questions_multiple_choice.*) AS total_questions
  FROM quizzes
  JOIN quiz_results ON quiz_id = quizzes.id
  JOIN questions_multiple_choice ON questions_multiple_choice.quiz_id = quizzes.id
  GROUP BY quizzes.id;


SELECT questions_multiple_choice.*, quizzes.title, quizzes.subject, quizzes.image_url
  FROM questions_multiple_choice
JOIN quizzes ON quizzes.id = quiz_id
WHERE quizzes.id = 1;
