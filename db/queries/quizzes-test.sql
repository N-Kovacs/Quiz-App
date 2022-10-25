-- your score
SELECT COUNT(question_results.*) as correct_answers
FROM question_results
JOIN quiz_results ON quiz_results.id = quiz_results_id
WHERE correct = TRUE
GROUP BY quiz_results.id
HAVING quiz_results.id = 1;


-- total questions done

-- individual questions
SELECT id, correct
FROM question_results
WHERE quiz_results_id = 1;


-- quiz title, quiz subject
SELECT title, subject
FROM quizzes
JOIN quiz_results ON quiz_results.quiz_id = quizzes.id
WHERE quiz_results.id = $1;

-- global attempts, with average results
