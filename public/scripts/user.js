const escapeFunc2 = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createResultElement = function (resultObject) {
  let markup = `
  <article class="result quiz">
  <header class="result-header">
  <h3>
  ${escapeFunc2(resultObject.title)}
  </h3>
  <div class="result-info">
  <ul>
    <li><strong>
        Score: ${resultObject.score} / ${resultObject.max_score}&nbsp;
      </strong>
      </li>
      <li>
      <div> Detailed Results page:
      <a href=${
        "/results/" + resultObject.id
      }><button class="btn btn-primary btn-sm">Go</button></a>
      </div>
      </li>
      <li>
      <div> Retake Quiz:
      <a href=${
        "/quizzes/" + resultObject.quiz_url
      }><button class="btn btn-primary btn-sm">Go</button></a>
      </div>
      </li>
  </ul>
</div>


`;
  return markup;
};

const createQuizElement2 = function (quizObject) {
  let markup = `
  <article class="quiz" id= ${escapeFunc(quizObject.url)}>
  <header class="quiz-header">
    <h3>
      ${escapeFunc(quizObject.title)}
    </h3>
  </header>
  <div class="quiz-image"> `;
  if (quizObject.image_url) {
    markup += `<img src= ${quizObject.image_url} />`;
  }
  markup += `
  </div>
  <div class="quiz-info">
    <ul>
      <li>Topic:&nbsp;<strong>&nbsp;${escapeFunc(
        quizObject.subject
      )}</strong></li>
      <li><strong>
          ${quizObject.total_questions}&nbsp;
        </strong>&nbsp;questions</li>
      <li>Average Score:&nbsp;${quizObject.avg}%</strong>
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

const renderUserQuizzes = (quizzes) => {
  $("#user_quizzes").addClass("btn-primary");
  $("#user_quizzes").removeClass("btn-outline-primary");
  $("#my_results").addClass("btn-outline-primary");
  $("#my_results").removeClass("btn-primary");
  resultsRendered = false;
  quizzesRendered = true;

  $(".quiz-container").empty();
  for (quiz of quizzes.quizzes) {
    $quizelements = createQuizElement2(quiz);
    $(".quiz-container").append($quizelements);
  }
};

const renderUserResults = (results) => {
  $("#my_results").addClass("btn-primary");
  $("#my_results").removeClass("btn-outline-primary");
  $("#user_quizzes").addClass("btn-outline-primary");
  $("#user_quizzes").removeClass("btn-primary");
  resultsRendered = true;
  quizzesRendered = false;
  $(".quiz-container").empty();
  for (result of results.results) {
    $resultelements = createResultElement(result);
    $(".quiz-container").append($resultelements);
  }
};
let quizzesRendered = true;
let resultsRendered = false;

$(() => {
  $.ajax("/api/quizzes/?user=" + window.location.pathname.split("/users/")[1], {
    method: "GET",
  }).then((res) => renderUserQuizzes(res));

  $("#user_quizzes").on("click", () => {
    if (quizzesRendered === false) {
      $.ajax(
        "/api/quizzes/?user=" + window.location.pathname.split("/users/")[1],
        { method: "GET" }
      ).then((res) => renderUserQuizzes(res));
    } else if (quizzesRendered === true) {
      $(".quiz-container").empty();
      quizzesRendered = false;
      $("#user_quizzes").removeClass("btn-primary");
      $("#user_quizzes").addClass("btn-outline-primary");
    }
  });
  $("#my_results").on("click", () => {
    if (resultsRendered === false) {
      $.ajax(
        "/api/results/?user=" + window.location.pathname.split("/users/")[1],
        { method: "GET" }
      ).then((res) => renderUserResults(res));
    } else if (resultsRendered === true) {
      $(".quiz-container").empty();
      resultsRendered = false;
      $("#my_results").removeClass("btn-primary");
      $("#my_results").addClass("btn-outline-primary");
    }
  });
});
