const escapeFunc = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createResultElement = function(resultObject) {
  let markup = `
  <article class="result">
  <header class="result-header">
  <h3>
  ${escapeFunc(resultObject.title)}
  </h3>
  <div class="result-info">
  <ul>
    <li><strong>
        Score: ${resultObject.score} / ${resultObject.max_score}&nbsp;
      </strong>
      </li>
      <li>
      <div> Detailed Results page:
      <a href=${"/result/" + resultObject.id}><button class="btn btn-primary">Go</button></a>
      </div>
      </li>
      <li>
      <div> Retake Quiz:
      <a href=${"/quizzes/" + resultObject.quiz_url}><button class="btn btn-primary">Go</button></a>
      </div>
      </li>
  </ul>
</div>


`;
  return markup;

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
  if (quizObject.image_url){
    markup += `<img src= ${quizObject.image_url} />`

  }
  markup += `
  </div>
  <div class="quiz-info">
    <ul>
      <li>Topic:&nbsp;<strong>&nbsp;${escapeFunc(quizObject.subject)}</strong></li>
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
  $("#my_results").addClass("btn-outline-primary");
  $("#my_results").removeClass("btn-primary");
  resultsRendered = false
  quizzesRendered = true

  $('#button_fill').empty()
  for (quiz of quizzes.quizzes){
    $quizelements = createQuizElement(quiz)
    $('#button_fill').append($quizelements);
  }
}

const renderUserResults =(results)=>{
  $("#my_results").addClass("btn-primary");
  $("#my_results").removeClass("btn-outline-primary");
  $("#user_quizzes").addClass("btn-outline-primary");
  $("#user_quizzes").removeClass("btn-primary");
  resultsRendered = true
  quizzesRendered = false
  $('#button_fill').empty()
  for (result of results.results){
    $resultelements = createResultElement(result)
    $('#button_fill').append($resultelements);
  }
}
let quizzesRendered = true
let resultsRendered = false

$(() => {

  $.ajax("/api/quizzes/?user=" + (window.location.pathname).split("/users/")[1] , { method: "GET" })
  .then((res) => renderUserQuizzes(res))


  console.log(window.location.pathname)
  $("#user_quizzes").on("click", () => {
    console.log(quizzesRendered); //should only fetch private quizzes if owner
    if (quizzesRendered === false){
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
  $("#my_results").on("click", () => {
    console.log("my")
    if (resultsRendered === false){
      $.ajax("/api/results/?user=" + (window.location.pathname).split("/users/")[1] , { method: "GET" })
      .then((res) => renderUserResults(res))
    } else if (resultsRendered === true){
      console.log("Huh?")
      $('#button_fill').empty()
      resultsRendered = false;
      $("#my_results").removeClass("btn-primary");
      $("#my_results").addClass("btn-outline-primary");
    }

  });
});
