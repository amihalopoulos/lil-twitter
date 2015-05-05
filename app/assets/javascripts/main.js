$(document).ready(function(){
  // load the tweets and display them
  var source = $("#tweets-river-template").html();
  var template = Handlebars.compile(source); // template is a function.
  $.get('/tweets/recent').then(function(response){
      var output = template({header: "Recent Tweets", tweets: response});
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
    $textarea = $('#new-tweet')
    var hashtags = getHashTags($textarea.val())
    // debugger

    $.ajax({
      url: '/tweets',
      type: 'post',
      data: {"tweet[content]": $textarea.val(), "hashtags": hashtags}
    }).done(function(response){
      var source3 = $("#single-tweet-template").html();
      var template3 = Handlebars.compile(source3);
      var output3 = template3(response);
      $('#tweets-container ul').prepend(output3);
      $textarea.val("");
    })
  })

  $('#search-form').on('submit', function(event){
    event.preventDefault();
    $searchbox = $('#search');
    // debugger
    $.ajax({
      url: '/tweets/search/' + $searchbox.val(),
      type: 'get',
      data: {'keyword': $searchbox.val()}
    }).done(function(response){
      var output = template({header: "Tweets Matching #"+$searchbox.val(),tweets: response});
      $('#tweets-container').html(output);
    }).fail(function(){
      $searchbox.css('border', '2px red solid');
    })
  })

  var getHashTags = function(text) {
    var slicedTags = [];
    var hashtags = text.match(/\S*#\S+/gi);
    if (hashtags !== null){
      for (var i=0; i<hashtags.length; i++){
        slicedTags.push(hashtags[i].slice(1))
      }
      return slicedTags
    }
    else {
      return []
    }
  }

});
