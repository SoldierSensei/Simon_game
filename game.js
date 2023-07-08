
var flag =false ;
var level = 0;
var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
$(document).keydown(function(event){
    if(flag===false){
        console.log(event.key);
        $("#level-title").text("Level "+ level);
        nextSequence();
        flag=true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });


  
function nextSequence() {
    userClickedPattern =[];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber1 = Math.random();
    randomNumber1 *= 4;
    randomNumber1 = Math.floor(randomNumber1);
    randomChosenColour = colors[randomNumber1];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play()
   
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function startOver(){
    level=0;
    gamePattern=[];
    flag = false;
}
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("right");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
}

}

