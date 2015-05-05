$(document).ready(function(){
  // load the tweets and display them
  var source   = $("#tweets-river-template").html();
  var template = Handlebars.compile(source); // template is a function.
  $.get('/tweets/recent').then(function(response){
      var output = template({tweets: response});
      $('#tweets-container').html(output);
  });
});
