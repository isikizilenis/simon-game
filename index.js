var clickOrderArray = [];
var levelCounter = 0;
var playerClickIndex = 0;
var listening = false;
var gameStarted = false;
var sounds = {
    green: new Audio("./sounds/green.mp3"),
    red: new Audio("./sounds/red.mp3"),
    yellow: new Audio("./sounds/yellow.mp3"),
    blue: new Audio("./sounds/blue.mp3")
};

// Keyhandler
$("body").keydown(() => {
    if (!gameStarted) {
        startNewRound();
        gameStarted = true;
    }
});

// Clickhandler
$(".btn").click(
    (e) => {
        if(listening){
            var clickedTile = e.target.id;
            playTileClick(clickedTile);
    
            if(clickIsCorrect(clickedTile)){
                playerClickIndex++;
                if(playerClickIndex === clickOrderArray.length){
                    setTimeout(() => {
                        startNewRound();
                    }, 1000);
                }
            }
            else{
                gameOver();
            }
        }
    }
);

// Neues Level nach jedem erfolgreichen Sequenzdurchlauf
function startNewRound() {
    playerClickIndex = 0;
    listening = false;
    levelCounter++;
    $("h1").text("Level "+levelCounter);
    var newRandomTile = choseNewRandomTile();
    playTileClick(newRandomTile);
    putInOrderArray(newRandomTile);
    listening = true;
}

// Wähle zufällige Zahl zwischen 0 und 3 und weise sie einem String passend der Farbe zu
function choseNewRandomTile(){
    var randomNumber = Math.floor(Math.random()*4);
    var output;
    switch(randomNumber){
        case 0:
            output = "green";
            break;
        case 1:
            output = "red";
            break;
        case 2:
            output = "yellow";
            break;
        case 3:
            output = "blue";    
            break;
    }
    return output;
}

// Spiele eine Click Animation ab
function playTileClick(tile){
    var selector = "div#"+tile;
    $(selector).addClass("pressed");
    sounds[tile].play();
    setTimeout(
        () => {
            $(selector).removeClass("pressed");
        }, 300
    )
}

// Pusht zufällige neue Tile in das Array
function putInOrderArray(randomTile){
    clickOrderArray.push(randomTile);
}

// Prüft ob der Click in der Sequenz korrekt war
function clickIsCorrect(clickedTile){
    return (clickedTile === clickOrderArray[playerClickIndex]);
}

// Game Over Handler
function gameOver(){
    $("h1").text("Game Over! Press any key to restart.");
    new Audio("./sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(
        () => {
            $("body").removeClass("game-over");
        }, 350
    )
    levelCounter = 0;
    gameStarted = false;
    listening = false;
    clickOrderArray = [];
}