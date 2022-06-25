var arrayOfColors = ['red', 'blue', 'green', 'yellow'];
var computerizedSequence = [];
var playerSequence = [];
var started = false;
var level= 0;


//Computerised click
$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


// Clicked Funtionality for the player
$(".btn").click(function (event) {
    var clickEvent = event.target.id;
    playerSequence.push(clickEvent)
    clickedButton(clickEvent);
    playSound(clickEvent);
    checkAnswer(playerSequence.length-1);
})


//Checking both the arrays Computerized & Player moves.
function checkAnswer(currentLevel){
    if(computerizedSequence[currentLevel]===playerSequence[currentLevel]){
        if(computerizedSequence.length===playerSequence.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press any key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        startOver();
    }
}

//Gives Next Sequence to the player if his previous play was right.
function nextSequence(){
    playerSequence = [];
    level++;
    $("#level-title").text("Level "+level);
    var random = Math.floor(Math.random() * 4);
    var randomChosencolor = arrayOfColors[random];
    computerizedSequence.push(randomChosencolor);
    fadeAnimation(randomChosencolor);
    playSound(randomChosencolor);
}

//Toggle functionality to the clicked button by the user
function clickedButton(clicked) {
    $("." + clicked).addClass("pressed");
    setTimeout(function () {
        $("." + clicked).removeClass("pressed");
    }, 50);
}

// Plays the sound of the specific Button which was pressed.
function playSound(sound){
    var audio = new Audio("sounds/" +sound+ ".mp3");
    audio.play();
}

//fade Animation of computerized click
function fadeAnimation(key) {
    $("#" + key).fadeOut(100).fadeIn(100);
}

//Starts the Game all over again.
function startOver(){
    level = 0;
    computerizedSequence = [];
    started= false;
}