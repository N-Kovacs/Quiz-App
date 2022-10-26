
const createQuizElement = function(quizObject) {
  const markup = `
  <article class="quiz">
  <header class="quiz-header">
    <h3>
      <%= quizzes[q].title %>
    </h3>
  </header>
  <div class="quiz-image">
    <% if (quizzes[q].image_url) { %>
    <img src=<%= quizzes[q].image_url %>/>
    <% } %>
  </div>
  <div class="quiz-info">
    <ul>
      <li>Topic:&nbsp;<strong>&nbsp;<%= quizzes[q].subject %></strong></li>
      <li><strong>
          <%= quizzes[q].total_questions %>&nbsp;
        </strong>&nbsp;questions</li>
      <li>Average Score:&nbsp;<strong>&nbsp;<%= quizzes[q].avg %>%</strong>
      </li>
    </ul>
  </div>

  <footer class="quiz-footer">
    <div class="tweet-icons">
      <i class="fa-solid fa-flag">.</i>
      <i class="fa-solid fa-retweet">.</i>
      <i class="fa-solid fa-heart">.</i>
    </div>
  </footer>

</article>

`;
  return markup;

};

const renderUserQuizzes =(quizzes)=>{
  console.log(quizzes)
  for (quiz of quizzes.quizzes){
    createQuizElement(quiz)
  }
}


$(() => {
  $("#user_quizzes").on("click", () => {
    console.log("click"); //should only fetch private quizzes if owner
    $.ajax("/api/quizzes/?user=1", { method: "GET" })
    .then((res) => renderUserQuizzes(res))
  });
});
