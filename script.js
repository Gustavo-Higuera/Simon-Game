var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var gameLevel = 0;

$(document).on("keypress", nextSequence);

function nextSequence() {

  $("#level-title").text("Level " + gameLevel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

$(".btn").on("click", function (e) {
  var userChosenColour = e.target.id;
  var userChosenColourBtn = e.target;

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColourBtn);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");

  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[currentLevel]);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("correct");

  } else {
    console.log("Incorrect");
  }
}
