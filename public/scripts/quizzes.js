$(() => {
  //copy text code
  console.log("there")
  $('.quiz').on('click', () => {
    let url = "/quizzes/" + event.currentTarget.id
    window.location.href = (window.location.origin + url)
  });
});
