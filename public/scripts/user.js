const escapeFunc = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createQuizElement = function(quizObject) {
  let markup = `
  <article class="quiz">
  <header class="quiz-header">
    <h3>
      ${escapeFunc(quizObject.title)}
    </h3>
  </header>
  <div class="quiz-image"> `
  if (quizObject.imgageURL){
    markup += `<img src= ${quizObject.image_url} />`

  }
  markup += `
  </div>
  <div class="quiz-info">
    <ul>
      <li>Topic:&nbsp;<strong>&nbsp;${quizObject.subject}</strong></li>
      <li><strong>
          ${quizObject.total_questions}&nbsp;
        </strong>&nbsp;questions</li>
      <li>Average Score:&nbsp;${quizObject.avg}</strong>
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
  $("#user_quizzes").addClass("btn-primary");
  $("#user_quizzes").removeClass("btn-outline-primary");
  $("#user_results").removeClass("btn-primary");
  console.log(quizzes)
  for (quiz of quizzes.quizzes){
    $quizelements = createQuizElement(quiz)
    $('#button_fill').append($quizelements);
  }
}


$(() => {
  let quizzesRendered = false
  let resultsRendered = false
  console.log(window.location.pathname)
  $("#user_quizzes").on("click", () => {
    console.log(quizzesRendered); //should only fetch private quizzes if owner
    if (quizzesRendered === false){
      quizzesRendered = true
      $.ajax("/api/quizzes/?user=" + (window.location.pathname).split("/users/")[1] , { method: "GET" })
      .then((res) => renderUserQuizzes(res))
    } else if (quizzesRendered === true) {
      console.log("hello")
      $('#button_fill').empty()
      quizzesRendered = false;
      $("#user_quizzes").removeClass("btn-primary");
      $("#user_quizzes").addClass("btn-outline-primary");
    }
  });
});
