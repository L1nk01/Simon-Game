const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = []

var level = 0;
var started = false;

// Detects when any key is pressed in order to start the game
$(document).on("keydown", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

// Detects which button is being pressed and saves it in the pattern array.
$(".btn").on("click", function() {
    let userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);

    playSound(userClickedColor);
    animatePress(userClickedColor);

    checkAnswer(userClickedPattern.length-1);
});

// Creates the next button sequence
function nextSequence() {

    userClickedPattern = [];

    level++
    $("#level-title").text("Level " + level);

    let randomNumber = (Math.floor(Math.random() * 4));
    let randomChosenColor =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Next Level
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
            nextSequence();
        }, 1000);
        }
    } else {
        // Game Over
        let wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Restarts all the variables
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}