$(document).ready(function(){
  // load the tweets and display them
  var source   = $("#tweets-river-template").html();
  var template = Handlebars.compile(source); // template is a function.
  $.get('/tweets/recent').then(function(response){
      var output = template({tweets: response});
      $('#tweets-container').html(output);
  });

  var source2   = $("#trending-hashtags-template").html();
  var template2 = Handlebars.compile(source2); // template is a function.
  $.get('/hashtags/popular').then(function(response){
      var output = template2({hashtags: response});
      $('#trends-container').html(output);
  });

});
