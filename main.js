var streamersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
 var regex = /(&nbsp;|<([^>]+)>)/ig;

$(document).ready(function(){

  GetStreams();

  $(".custom-tab").click(function(){
    $(".custom-tab").removeClass("active-tab");
    $(this).addClass("active-tab");
    var tab = $(this).text();
    switchTabs(tab);
  });

  $(".search-input").keyup(function(){
   var input =  $(".search-input").val();
   console.log("search Text: " + input)
   searchArr(input);
  });

});

function switchTabs(tab){
  console.log(tab);
  switch(tab){
    case "Online":
    $(".fa-check").parents(".user-tab").fadeIn("slow");
    $(".fa-exclamation").parents(".user-tab").fadeOut("fast");
    break;
    case "Offline":
    $(".fa-exclamation").parents(".user-tab").fadeIn("slow");
    $(".fa-check").parents(".user-tab").fadeOut("fast");
    break;
    default:
    $(".fa-exclamation").parents(".user-tab").fadeIn("slow");
    $(".fa-check").parents(".user-tab").fadeIn("slow");
    break;
  }
}

function GetStreams(){
  streamersArr.forEach(function(streamer){
    var link = 'https://www.twitch.tv/'+streamer;
    $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + streamer + "?callback=?",function(json){
      var logo = json['logo'] + "?callback=?";
      console.log(logo);
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+streamer+"?callback=?",function(data){
        var stream = data.stream;
        if(stream != null){
          var status = stream.channel.status;
          var streamID = stream.id;
          link+= '/'+streamID;
          $(".user-container").append("<a href="+link+" class='user-tab' target='_blank'><img class='user-img' src="+logo+"/><div class='user-info'><h5 id='userName'>"+streamer+"</h5><p>"+status+"</p><i class='fa fa-check icon-check'></i></div></a>");
          $(".fa-check").css("color","green");
        }
        else {
          $(".user-container").append("<a href="+link+" class='user-tab' target='_blank'><img class='user-img' src="+logo+" alt='profile_image'/><div class='user-info'><h5 id='userName'>"+streamer+"</h5><p>Offline</p><i class='fa fa-exclamation icon-check'></i></div></a>");
          $(".fa-exclamation").css("color","red");
        }
      });
    });
  });
}

function searchArr(test){
  var arrIndex = [];
    var users = $('.user-info').children('#userName').html(function(index, text){
    text = text.replace(regex,"");
    if(text.match(test) != null && test != ""){
      var nthType = index + 1;
      console.log("text: " + text + " test: " + test + " match: " + text.match(test))
      text =text.replace(test, function(x){ return '<mark>' + x + "</mark>"});
      $('.user-tab:nth-of-type('+ nthType +')').fadeIn();
      console.log(index);
    }
    else{
      arrIndex.push(index + 1);
    }
  return text;
  });
  if(test != ""){
    for(var i = 0; i < arrIndex.length; i++){
      $('.user-tab:nth-of-type('+arrIndex[i]+')').fadeOut();
    }
  }
  else {
    for(var i = 0; i < arrIndex.length; i++){
      $('.user-tab:nth-of-type('+arrIndex[i]+')').fadeIn();
    }
  }

  console.log(users);
}
