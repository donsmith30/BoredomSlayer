const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let compChoice = '';
let userChoice = '';
let round = 0;

let compWinCount = 0;
let compLoseCount = 0;
let userWinCount = 0;
let userLossCount = 0;

let playerWent = false;

function doSomething() {
    alert("hi");
}

function startUp() {
    wireUpButtons();

    console.log('startUp is firing');
}

function wireUpButtons() {
    $('#start_game').on('click', compTurn)
    $('#1').on('click', userTurn)
    $('#2').on('click', userTurn)
    $('#3').on('click', userTurn)
}

function compTurn() {

    round++;
    $('#round_count').text(round);

    let timeLeft = 5.00;
    const timerElem = $('#timer');
    timerElem.text(timeLeft);
    const timerId = setInterval(countdown, 10);

    function countdown() {

        if (timeLeft == (-0.01)) {
            clearInterval(timerId);
            compWinRound();
            // doSomething();
        }
        else if(playerWent === true) {
            clearInterval(timerId);
        }
        else {
            timerElem.text(timeLeft);
            timeLeft = (timeLeft - .01).toFixed(2);
        }
    }

    let randomNum = (Math.floor((Math.random() * 3) + 1)).toString();
    compChoice = randomNum;
    playerWent = false;
}

function userTurn(e) {
    e.preventDefault();
    if(compChoice) {
        userChoice = this.id;
        playerWent = true;
    
        if(userChoice) {
            if((userChoice == 1 && compChoice == 2) || (userChoice == 2 && compChoice == 3) || (userChoice == 3 && compChoice == 1)) {
                compWinRound();
            }
            else if((userChoice == 1 && compChoice == 3) || (userChoice == 2 && compChoice == 1) || (userChoice == 3 && compChoice == 2)) {
                userWinRound();
            }
            else if(userChoice === compChoice) {
                tieRound();
            }
            compChoice = '';
        }
    }
    
}

function nextRound() {
    if((userWinCount < 2) && (compWinCount < 2)) {
        userChoice = '';
        setTimeout(compTurn, 4000);

        let timeLeft = 3;
        const timerElem = $('#round_timer');
        timerElem.text(timeLeft);
        const timerId = setInterval(roundCountdown, 1000);

        function roundCountdown() {

            if (timeLeft === -1) {
                clearInterval(timerId);
            }
            else {
                timerElem.text(timeLeft);
                timeLeft--;
            }
        }
    }
    else {
        round = 0;
        compWinCount = 0;
        compLoseCount = 0;
        userWinCount = 0;
        userLossCount = 0;
    }
}

function compWinRound() {
    compWinCount++;
    userLossCount++;
    $('#computer_wins').text(compWinCount);
    $('#player_losses').text(userLossCount);

    alert('Computer wins round');
    if(compWinCount === 2) {
        alert("You lose");
    }

    nextRound();
}

function userWinRound() {
    userWinCount++;
    compLoseCount++;
    $('#player_wins').text(userWinCount);
    $('#computer_losses').text(compLoseCount);

    alert('Player wins round');
    if(userWinCount === 2) {
        alert("You win");
    }

    nextRound();
}

function tieRound() {
    alert('Tie round');
    nextRound();
}