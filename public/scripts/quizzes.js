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
    $quizelements = createQuizElement(quiz);
    $(".quiz-container").append($quizelements);
  }
};

// const getId = (click) => {
//   let extension = click.parent().id
//   if (!extension){
//     getId(extension)
//   }
// }

$(() => {
  $.ajax("/api/quizzes/", { method: "GET" }).then((res) => {
    renderQuizzes(res);
  });
  console.log("here");

  $(document).on("click", '.quiz',  (el) => {
    console.log("click");
    extension = (el.target.closest('.quiz').id)

    let url = "/quizzes/" + extension
    console.log(url)
    window.location.href = window.location.origin + url;
  });

  // console.log(window.location.pathname)
  // $("#user_quizzes").on("click", () => {
  //   console.log(quizzesRendered); //should only fetch private quizzes if owner
  //   if (quizzesRendered === false){
  //     $.ajax("/api/quizzes/?user=" + (window.location.pathname).split("/users/")[1] , { method: "GET" })
  //     .then((res) => renderUserQuizzes(res))
  //   } else if (quizzesRendered === true) {
  //     console.log("hello")
  //     $('#button_fill').empty()
  //     quizzesRendered = false;
  //     $("#user_quizzes").removeClass("btn-primary");
  //     $("#user_quizzes").addClass("btn-outline-primary");
  //   }
  // });
  // $("#my_results").on("click", () => {
  //   console.log("my")
  //   if (resultsRendered === false){
  //     $.ajax("/api/results/?user=" + (window.location.pathname).split("/users/")[1] , { method: "GET" })
  //     .then((res) => renderUserResults(res))
  //   } else if (resultsRendered === true){
  //     console.log("Huh?")
  //     $('#button_fill').empty()
  //     resultsRendered = false;
  //     $("#my_results").removeClass("btn-primary");
  //     $("#my_results").addClass("btn-outline-primary");
  //   }

  // });
});
