

$(() => {
  //copy text code
  $('#copy').on('click', () => {
    console.log($('#copytexts').val())
    navigator.clipboard.writeText($('#copytexts').val());
  });

});

