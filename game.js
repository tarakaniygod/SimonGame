let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

//CLICK ID + clickAUDIO + ANIMATEPRESS
$(".btn").on("click", function(){
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);   


    function playSound(userChosenColour){
        let clickedSound = new Audio("sounds/"+userChosenColour+".mp3");
        clickedSound.play();
    }
    playSound(userChosenColour);


    function animatePress (userChosenColour){
        $("#" + userChosenColour).addClass("pressed");
        setTimeout(function(){
            $("#" + userChosenColour).removeClass("pressed"); 
        }, 100);

    }
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//START GAME
level = 0;
let start = false;
$(document).keypress(function(){
  
    if(start==false){  
        start=true;  
            nextSequence();
    }
})


//ANSWER

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("YES");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence()}, 1000);
            
        }
        
    }else{
        let gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
};


//RESTART

function startOver(){
level=0;
gamePattern=[];
start=false;
}



function nextSequence () {
   userClickedPattern=[];
   level++;
$("h1").text("Level " + level);
    
    //RANDOM NUMBER
    let randomNumber = Math.floor(Math.random()*4);    
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //START ANIMATION
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    //START AUDIO
    let startSound = new Audio("sounds/"+randomChosenColour+".mp3");
    startSound.play(); 

}

 
