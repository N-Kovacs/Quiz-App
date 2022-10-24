-- your score
SELECT COUNT(question_results.*) as correct_answers
FROM question_results
JOIN quiz_results ON quiz_results.id = quiz_results_id
WHERE correct = TRUE
GROUP BY quiz_results.id
HAVING quiz_results.id = 1;


-- total questions
-- individual questions
-- quiz title, quiz subject
-- global attempts, with average results
