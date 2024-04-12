let stock = 1;
const winCases = [[1,2,3], [4,5,6], [7,8,9], [1,5,9],[3,5,7], [1,4,7], [2,5,8], [3,6,9]]
let alreadyUsed = []

let meScore = 0;
let otherPlayerScore = 0;

let myScoreText = document.getElementById("score-me");
let otherPlayerScoreText = document.getElementById("score-against");

let me = [];
let meStock = [];
let otherPlayer = [];
let otherPlayerStock = [];

let otherPlayerName = "Friend";

let winMssg = document.querySelector(".winMssg");
let winGameMssg = document.querySelector(".winGameMssg");
let isWin = false;

function putChoice (currentId) {
    const element = document.getElementById(currentId);
    if (otherPlayerName === "Friend") {
        console.log("friend--- name: "+ otherPlayerName);
        switchPlayer()
        stock < 0 ? element.innerText = "X" : element.innerText = "O";
        checkWinnerMe();
        checkWinnerOtherPlayer();
    } else if (otherPlayerName === "AI") {
        console.log("ai--- name: "+ otherPlayerName);
        element.innerText = "X";
        checkWinnerMe()
        if (isWin) {
            isWin = false;
            return;
        }
        let aiId = computerChoice()
        let aiElement = document.getElementById(aiId);
        alreadyUsed.push(aiId)
        setTimeout(()=> {
            aiElement.innerText = "O";
            checkWinnerOtherPlayer()

            console.log(element);
            console.log("=======================");
            console.log(aiElement);
        }, 1000)



        // checkWinner()
        // console.log(stock + "===================");
    }
}

function switchPlayer() {
    stock *= -1
    return stock
}

document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach(function (div){
        div.addEventListener("click", function(){
            let currentId = this.id;
            if (!alreadyUsed.includes(currentId)){
                putChoice(currentId);
                alreadyUsed.push(currentId);
            }
            // checkWinner()
        })
    })
})

const checkWinnerMe = function () {
    me = [];

    const p = document.querySelectorAll("p");
    try {
        p.forEach(function (para) {
            if (para.textContent === "X") {
                console.log("entered foreach");
                me.push(Number(para.id))
                IsMeWin(me);
                if (meScore === 3) {
                    throw new Error('StopIteration');
                }
            }
        })
    } catch (e) {
        if (e.message !== 'StopIteration') throw e;
      }


    console.log(me);
    console.log(otherPlayer);
    // 1 2 3  4 5 6  7 8 9
    // 1 5 9  3 5 7  
    // 1 4 7  2 5 8  3 6 9
}
const checkWinnerOtherPlayer = function () {
    otherPlayer = [];

    const p = document.querySelectorAll("p");
    p.forEach(function (para) {
        if (para.textContent === "O") {
            otherPlayer.push(Number(para.id))
            IsOtherPlayerWin(otherPlayer);
        } 
    })

    console.log(me);
    console.log(otherPlayer);
}
function IsMeWin() {
    let yes = 0;

    for (let j = 0; j < winCases.length; j++){
        yes = 0;
        for (let i = 0; i < me.length; i++) {
            if (winCases[j].includes(me[i])) 
            {
                yes++;
            }
        }
        if (yes === 3) {
            if (checkTie() === -1) break;
            meScore++;

            console.log("me score: "+ meScore);

            console.log("I Won!!!===================================");
            myScoreText.innerText = meScore;
            if (meScore === 3) {
                setTimeout(restartAfterWinGame, 3000);

                winGameMssg.classList.remove("none");
                winGameMssg.textContent = "You Won The Game !!!!!!";

                setTimeout(() => {
                    winGameMssg.classList.add("none");
                }, 3000);
                isWin = true;
            } else {
                winMssg.classList.remove("none");
                winMssg.textContent = `You Won This Round !!`;
                setTimeout(restartAfterWinRound, 1000);
                setTimeout(() => {
                    winMssg.classList.add("none");
                }, 1000);
                isWin = true;
            }
            break;
        }
        // if (yes === 3){
        //     break;
        // }
    }
}

function IsOtherPlayerWin() {
    let yes = 0;

    for (let j = 0; j < winCases.length; j++){
        yes = 0;

        for (let i = 0; i < otherPlayer.length; i++) {
            if (winCases[j].includes(otherPlayer[i])){
                {
                    yes++;
                }
            }
        }

        if (yes === 3) {
            if (checkTie() === -1) break;
            console.log("IsOtherPlayerWin score: "+ otherPlayerScore);
            console.log("the other player Won!!!===========================");
            otherPlayerScore++;
            otherPlayerScoreText.innerText = otherPlayerScore;

            if (otherPlayerScore === 3) {
                
                winGameMssg.classList.remove("none");

                winGameMssg.textContent = `The ${otherPlayerName} player Won The Game !!!!!!`;
                setTimeout(restartAfterWinGame, 3000);
                setTimeout(() => {
                    winGameMssg.classList.add("none");
                }, 3000); 
            } else {
                winMssg.classList.remove("none");

                winMssg.textContent = `The ${otherPlayerName} player Won This Round !!`;
                setTimeout(restartAfterWinRound, 1000);
                setTimeout(() => {
                    winMssg.classList.add("none");
                }, 1000);
            }
            break;
        }
        // } else {
        //     console.log(yes);
        //     // console.log("the other player still didn't Win");
        // }    
    }
}

function restartAfterWinRound () {
    const p = document.querySelectorAll("p");

    p.forEach(function (para) {
        para.innerHTML = ""
    })

    me = [];
    otherPlayer = [];
    alreadyUsed = [];

    winMssg.textContent = "";

}

function restartAfterWinGame () {
    restartAfterWinRound();
    winGameMssg.textContent = ""

    meScore = 0;
    otherPlayerScore = 0;

    myScoreText.textContent = meScore;
    otherPlayerScoreText.textContent = otherPlayerScore;
}

function choseAgaint (choice) {
    otherPlayerName = choice;
    let mssg = document.querySelector(".otherPlayer");
    const scoreDisplay = document.getElementById("against");

    choice = choice === "Friend" ? "Your Friend" : "an AI";
    mssg.textContent = choice + "!";
    restartAfterWinGame();
    setTimeout(() => {
        document.querySelector(".demo").classList.remove("none");
    }, 1000);

    scoreDisplay.textContent = otherPlayerName;
    return otherPlayerName;
}

function computerChoice() {
    let randomBox = 0;
    do {
        if (me.includes(randomBox) || otherPlayer.includes(randomBox) || randomBox === 0)
            {
                randomBox = Math.floor(Math.random() * 9) + 1;
            }
    }while (me.includes(randomBox) || otherPlayer.includes(randomBox))

    console.log(`random box is : ${randomBox}`);
    return randomBox;
}
function checkTie() {
    if (me.length + otherPlayer.length === 9) {
        restartAfterWinRound();
        return -1;
    }
}
