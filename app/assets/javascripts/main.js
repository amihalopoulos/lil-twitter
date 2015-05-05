$(document).ready(function(){
  // load the tweets and display them
  var source = $("#tweets-river-template").html();
  var template = Handlebars.compile(source); // template is a function.
  $.get('/tweets/recent').then(function(response){
      var output = template({tweets: response});
      $('#tweets-container').html(output);
  });

  var source2 = $("#trending-hashtags-template").html();
  var template2 = Handlebars.compile(source2); // template is a function.
  $.get('/hashtags/popular').then(function(response){
      var output2 = template2({hashtags: response});
      $('#trends-container').html(output2);
  });

  $('#tweet-form').on('submit', function(event){
    event.preventDefault();
    $form = $(event.target);

    $.ajax({
      url: '/tweets',
      type: 'post',
      data: $form.serialize()
    }).done(function(response){
      var source3 = $("#single-tweet-template").html();
      var template3 = Handlebars.compile(source3);
      var output3 = template3(response);
      $('#tweets-container ul').prepend(output3);
      $('#new-tweet').val("");
    })
  })
});
