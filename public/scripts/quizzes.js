
const escapeFunc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createQuizElement = function (quizObject) {
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

const renderQuizzes = (quizzes) => {
  $(".quiz-container").empty();
  for (quiz of quizzes.quizzes) {
    if (quiz.public){
      $quizelements = createQuizElement(quiz);
      $(".quiz-container").append($quizelements);
    }
  }
};



$(() => {
  $.ajax("/api/quizzes/", { method: "GET" }).then((res) => {
    renderQuizzes(res);
  });
  console.log("here");

  $(document).on("click", '.quiz',  (el) => {
    console.log("click");
    let extension = (el.target.closest('.quiz').id)
    let url = "/quizzes/" + extension
    console.log(url)
    window.location.href = window.location.origin + url;
  });
  $("#filter").on("click", () => {
    const filter = ($('#topic-filter').val())
    $.ajax("/api/quizzes/?filter=" + filter , { method: "GET" })
    .then((res) => renderQuizzes(res))
  })
  $("#clear-filter").on("click", () => {
    $.ajax("/api/quizzes/" , { method: "GET" })
    .then((res) => renderQuizzes(res))
  })

});
