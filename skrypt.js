/*
    wez to napraw, zeby czekalo na koniec tury, bo to niesmieszne jest

*/


let allTiles = [];
let turnIndicator = document.querySelector(".tura");
let turnString = "Turn of player: ";

let isGameOver = 1;
let canMove = 0;
let newGameContainer = document.querySelector(".newGame");
let newGameParent = newGameContainer.parentElement;
let player2Container = document.querySelector("#Player2");
let playerNamesContainer = document.querySelector(".playerNames");
playerNamesContainer.removeChild(player2Container);
newGameContainer.addEventListener("submit", newGame);

let hardAI = false;
let simpleAI = false;

let player1 = new newPlayer("player1", "X");
let player2 = new newPlayer("player2", "O");
let turnOf = player1;

for (let i = 0; i < 9; i++) {
    allTiles.push("");
}

function newGame(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);
    console.table(formProps);

    hardAI = false;
    simpleAI = false;

    allTiles = [];
    for (let i = 0; i < 9; i++) {
        allTiles.push("");
    }
    renderBoard();
    if (formProps["opponentType"] == "simple AI") {
        player1.name = formProps["player1name"];
        player2.name = "simple AI";
        simpleAI = true;
    } else if (formProps["opponentType"] == "hard AI") {
        player1.name = formProps["player1name"];
        player2.name = "hard AI";
        hardAI = true;
    } else if (formProps["opponentType"] == "Player") {
        player1.name = formProps["player1name"];
        player2.name = formProps["player2name"];

    }
    turnOf=player1;
    turnIndicator.textContent = turnString + turnOf.name;
    newGameParent.removeChild(newGameContainer);
    isGameOver = false;
    canMove = true;
}

function displayPlayer2() {
    if (document.querySelector("#selectOpponent").value == "Player") {
        if(document.querySelector("#Player2") == null)
        {
            playerNamesContainer.appendChild(player2Container);
        }
        
    } else {
        if(document.querySelector("#Player2") != null)
        {
            playerNamesContainer.removeChild(player2Container);
        }
        
    }
   // document.querySelector("#Player2") == null
}

function newPlayer(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

function gameOver(results) {
    console.log("Won ", results);
    isGameOver = true;
    turnIndicator.textContent = results + " won";

    newGameParent.appendChild(newGameContainer);

}

function checkForWins() {
    //rows, works
    for (let j = 0; j < 3; j++) {
        let counter1 = 0;
        let counter2 = 0;
        for (let i = 0; i < 3; i++) {
            if (allTiles[i + 3 * j] == player1.symbol) {
                counter1++;
            } else if (allTiles[i + 3 * j] == player2.symbol) {
                counter2++;
            }
        }
        if (counter1 == 3) {
            gameOver(player1.name);
        } else if (counter2 == 3) {
            gameOver(player2.name);
        }
    }
    //columns
    for (let j = 0; j < 3; j++) {
        let counter1 = 0;
        let counter2 = 0;
        for (let i = j; i < 9; i += 3) {
            if (allTiles[i] == player1.symbol) {
                counter1++;
            } else if (allTiles[i] == player2.symbol) {
                counter2++;
            }
        }
        if (counter1 == 3) {
            gameOver(player1.name);
        } else if (counter2 == 3) {
            gameOver(player2.name);
        }
    }
    //ukosy: 0, 4, 8 oraz 2, 4, 6
    let sym = player1.symbol;
    if (allTiles[0] == sym && allTiles[4] == sym && allTiles[8] == sym) {
        gameOver(player1.name);
    }
    if (allTiles[2] == sym && allTiles[4] == sym && allTiles[6] == sym) {
        gameOver(player1.name);
    }
    sym = player2.symbol;
    if (allTiles[0] == sym && allTiles[4] == sym && allTiles[8] == sym) {
        gameOver(player2.name);
    }
    if (allTiles[2] == sym && allTiles[4] == sym && allTiles[6] == sym) {
        gameOver(player2.name);
    }
}

function renderBoard() {

    for (let i = 0; i < 9; i++) {
        let currentTile = document.getElementById(i);
        currentTile.textContent = allTiles[i];
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}
function compare(a, b)
{
    return a>b;
}
function simpleAImove() {
    let unusedTiles = [];
    for (let i = 0; i < allTiles.length; i++) {
        if (allTiles[i] == "") {
            unusedTiles.push(i);
        }
    }
    console.log(unusedTiles);

    let clickID = unusedTiles[randomNumber(unusedTiles.length - 1)];
    console.log(clickID);
    let tileReference = document.getElementById(clickID);
    canMove=true;
    clickTile(tileReference);
    
}

function hardAImove() {
    let tilePoints = [];
    for (let i = 0; i < 9; i++) {
        tilePoints.push(1);
    }
    
    for (let j = 0; j < 3; j++) {
        //sprawdzanie, czy rzad jest pusty lub jego:
        let counter = 0;
        for (let i = 0; i < 3; i++) {
            if (allTiles[i + 3 * j] == ""||allTiles[i + 3 * j] == player2.symbol) {
                counter++;
            }


        }
        if (counter == 3) {
            for (let i = 0; i < 3; i++) {
                tilePoints[i + 3 * j] += 1;
            }
        }
    }
    //columns
    for (let j = 0; j < 3; j++) {

        let counter = 0;

        for (let i = j; i < 9; i += 3) {
            if (allTiles[i] == "" ||allTiles[i] == player2.symbol) {
                counter++;

            }

        }
        if(counter==3)
        {
            for (let i = j; i < 9; i += 3) {
                tilePoints[i]+=1;
    
            }
        }
    }
    //ukosy: 0, 4, 8 oraz 2, 4, 6
    if ((allTiles[0] == "" || allTiles[0] == player2.symbol)&& (allTiles[4] == ""|| allTiles[4] == player2.symbol) && (allTiles[8] == ""|| allTiles[8] == player2.symbol)) {
        tilePoints[0]+=1;
        tilePoints[4]+=1;
        tilePoints[8]+=1;
    }
    if ((allTiles[2] == ""|| allTiles[2] == player2.symbol) && (allTiles[4] == ""|| allTiles[4] == player2.symbol) && (allTiles[6] == ""|| allTiles[6] == player2.symbol)) {
        tilePoints[2]+=1;
        tilePoints[4]+=1;
        tilePoints[6]+=1;
    }
    for(let i=0;i<9;i++)
    {
        if(allTiles[i]!="")
        {
            tilePoints[i]=0;
        }
    }
    let maximum =  Math.max(...tilePoints);
    let tileID = tilePoints.indexOf(maximum);
    console.log("max", maximum);
    console.log(tileID);
    console.log(tilePoints);
    let tileReference = document.getElementById(tileID);
    canMove=true;
    clickTile(tileReference);

}

function clickTile(e) {
    if (!isGameOver&&canMove) {
        if (allTiles[e.id] == "") {
            allTiles[e.id] = turnOf.symbol;
            renderBoard();
            checkForWins();
            if (turnOf == player1) {
                turnOf = player2;

                if (!isGameOver) {
                    canMove=false;
                    if (simpleAI) {
                        simpleAImove();
                    } else if (hardAI) {
                        hardAImove();
                    }
                }

            } else {
                turnOf = player1;

            }
            
            if (!isGameOver) {
                turnIndicator.textContent = turnString + turnOf.name;
            }
            // renderTurnIndicator();

        }
    }

}