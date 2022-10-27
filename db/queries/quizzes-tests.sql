 SELECT
  (SELECT COUNT(quiz_results.*) as quizzes_taken
  FROM users
  JOIN quiz_results on quiz_results.user_id = users.id
  GROUP BY users.id, quiz_results
  HAVING users.id = 1),

  (SELECT AVG(quiz_results.score/quiz_results.max_score) as quizzes_made
  FROM users
  JOIN quizzes on quizzes.owner_id = users.id
  GROUP BY users.id
  HAVING users.id = 1);
