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
let stopClicked = false;
let roundTimerDone = false;

function startUp() {
    wireUpButtons();

    console.log('startUp is firing');
}

function wireUpButtons() {
    $('#start_game').on('click', nextRound)
    $('#stop_button').on('click', stop)
    $('#1').on('click', userTurn)
    $('#2').on('click', userTurn)
    $('#3').on('click', userTurn)
}

function stop() {
    if(roundTimerDone === true) {
        compWinCount = 1;
        userLossCount = 1;
        stopClicked = true;
        compWinRound();
    }
}

function compTurn() {

    round++;
    $('#round_count').text(round);

    let timeLeft = 5.00;
    const timerElem = $('#timer');
    timerElem.text(timeLeft);
    const timerId = setInterval(countdown, 10);

    function countdown() {
        if(stopClicked === false) {
            if (timeLeft == (-0.01)) {
                clearInterval(timerId);
                compWinRound();
            }
            else if(playerWent === true) {
                clearInterval(timerId);
            }
            else {
                timerElem.text(timeLeft);
                timeLeft = (timeLeft - .01).toFixed(2);
            }
        }
        else {
            clearInterval(timerId);
        }
    }

    let randomNum = (Math.floor((Math.random() * 3) + 1)).toString();
    compChoice = randomNum;
    playerWent = false;
    
}

function userTurn(e) {
    e.preventDefault();

    if(compChoice && (roundTimerDone == true)) {
        let imageClicked = this;
        imageClicked.style.filter = "brightness(2)";
        setTimeout(function() {imageClicked.style.filter = "brightness(1)"}, 500);

        userChoice = imageClicked.id;
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
    roundTimerDone = false;
}

function nextRound() {
    
    if(round === 0) {
        $('#start_game').prop('disabled', true);
    }

    const timerElem = $('#round_timer');
    if((userWinCount < 2) && (compWinCount < 2)) {
        userChoice = '';
        setTimeout(compTurn, 5000);

        let timeLeft = 4;
        const timerId = setInterval(roundCountdown, 1000);

        function roundCountdown() {
            if(stopClicked === false) {
                if(timeLeft === 0) {
                    clearInterval(timerId);
                    roundTimerDone = true;
                    timerElem.text("SHOOT!");
                }
                else if(timeLeft === 3){
                    timerElem.text("ROCK");
                    timeLeft--;
                }
                else if(timeLeft === 2) {
                    timerElem.text("PAPER");
                    timeLeft--;
                }
                else if(timeLeft === 1) {
                    timerElem.text("SCISSORS");
                    timeLeft--;
                }
                else {
                    timeLeft--;
                }
            }
            else {
                clearInterval(timerId);
            }
        }
    }
    else {
        round = 0;
        compWinCount = 0;
        compLoseCount = 0;
        userWinCount = 0;
        userLossCount = 0;
        stopClicked = false;
        roundTimerDone = false;
        setScore();
        $('#start_game').prop('disabled', false);
        timerElem.text('');
    }
}

const onGetPicSuccess = (response) => {
    const pics = response.data.results;
    const randomNum = Math.floor(Math.random() * pics.length);
    let photo = "";
    for (let i = 0; i < pics.length; i++) {
        const element = pics[randomNum];
        photo = element.urls.thumb;
    }
    return photo;
}

function setScore() {
    $('#computer_wins').text(compWinCount);
    $('#player_losses').text(userLossCount);
    $('#player_wins').text(userWinCount);
    $('#computer_losses').text(compLoseCount);
    $('#round_count').text(round);
}

function compWinRound() {
    compWinCount++;
    userLossCount++;
    setScore();

    let newSearch = '';
    let modalText = '';
    
    if(compChoice == 1) {
        modalText = 'You lost this round against ROCK';
        newSearch = 'crushed';
    }
    else if(compChoice == 2) {
        modalText = 'You lost this round against PAPER';
        newSearch = 'paper overload';
    }
    else if(compChoice == 3) {
        modalText = 'You lost this round against SCISSORS';
        newSearch = 'giant scissors';
    }
    if(stopClicked === false) {
        setRoundModal(newSearch, modalText);
        setTimeout(nextRound, 3500);
    }
    else {
        setTimeout(nextRound, 50);
    }
    
    checkWinner();
}

function userWinRound() {
    userWinCount++;
    compLoseCount++;
    setScore();

    let newSearch = '';
    let modalText = '';

    if(userChoice == 1) {
        modalText = 'You won the round with ROCK';
        newSearch = "giant boulder";
    }
    else if(userChoice == 2) {
        modalText = 'You won the round with PAPER';
        newSearch = 'paper airplane';
    }
    else if(userChoice == 3) {
        modalText = 'You won the round with SCISSORS';
        newSearch = 'scissors cutting paper';
    }
    setRoundModal(newSearch, modalText);
    checkWinner();

    setTimeout(nextRound, 3500);
}

function tieRound() {
    let newSearch = 'tie';
    let modalText = 'This round was a tie';
    setRoundModal(newSearch, modalText);

    setTimeout(nextRound, 3500);
}

function checkWinner() {
    let tenorSearch = '';
    let message = '';

    if(userWinCount === 2) {
        tenorSearch = 'excited';
        message = 'YOU WON!!';
    }
    if(compWinCount === 2) {
        tenorSearch = 'loser';
        message = 'yOu LoST!!'
    }
    setTimeout(setEndgameModal, 3500, tenorSearch, message);
}

async function setRoundModal(query, message) {
    const newPic = await unsplashService.getPic(query).then(onGetPicSuccess).catch(onGetPicFail);
    const modalDiv = $('#template1');

    modalDiv.find('img').attr('src', newPic);
    modalDiv.find('#modalSpan1').text(message);
    modalDiv.modal('show');
    
    setTimeout(function() {modalDiv.modal('hide')}, 3000);
}

function setEndgameModal(query, text) {
    tenorService.grabData(query, text);
}

const onGetPicFail = (err) => {
    console.error(err);
}