var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var gameLevel = 0;
var started = false;

$(document).on("keypress", function () {

  if (!started) {
    $("#level-title").text("Level " + gameLevel);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  // Once nextSequence() is triggered, userClickedPattern is set to an empty array ready for the next level.
  userClickedPattern = [];

  gameLevel++;

  $("#level-title").text("Level " + gameLevel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern.length - 1);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  // line 49's if statement is checking both gamePattern and userClickedPattern at the array index specified at line 43 to make sure they are equal
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();

      }, 1000);
    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  // resetting these values to restart the game

  gameLevel = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

