const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let numOfTurns = '';
let compArr = [];
let userArr = [];
let difficulty = '';
let isNum = false;
let isDiff = false;
let userClicked = false;
let count = 0;

function startUp() {
    console.log("startUp is firing");

    wireUpButtons();
}

function wireUpButtons() {
    $('#start').on('click', onStartGame)
    $('#stop').on('click', onStopGame)
    $('.div_color1').on('click', onUserClick)
    $('.btn').on('mouseenter', randColor)
    $('.btn').on('mouseleave', randColor)
    $('section').on('mouseenter', randColor)
    $('section').on('mouseleave', randColor)
}

function onStartGame() {
    selectNumOfTurns();
    while(compArr.length === 0) {
        getRandom();
    }
}

async function selectNumOfTurns() {
    const difficultyArr = ['EASY', 'MEDIUM', 'HARD'];
    while(isNum === false) {
        let value = prompt("Enter the number of rounds you'd like to play");
        
        if(value > 0 && value !== null) {
            numOfTurns = parseInt(value, 10);
            isNum = true;
        }
        else if(count === 0) {
            count++;
            alert("Invalid input. Try again")
        }
        else if(count === 1) {
            count++;
            alert("No seriously, input a valid value");
        }
        else if(count === 2) {
            count++;
            alert("Literally ANY number between 1 and infinity... in number form");
        }
        else {
            alert("We can do this all day")
        }
    }
    while(isDiff === false) {
        let choice = prompt("Choose the difficulty. Pick either 'EASY', 'MEDIUM', or 'HARD'");
        if(choice !== null) {
            difficulty = choice.toUpperCase();
            if(difficultyArr.includes(difficulty)) {
                isDiff = true;
            }
        }
    }
}

function onStopGame() {
    compArr = [];
    userArr = [];
    numOfTurns = '';
    isNum = false;
    isDiff = false;
    userClicked = false;
    alert("GameBoard Reset");
}

function getRandom() {
    let randomDivId = Number(Math.floor(9 * Math.random()) + 1).toString();
    setTimeout(flash, 200, randomDivId);
    compArr.push(randomDivId);
    console.log(compArr);
    if(difficulty === 'EASY') {
        const timerId = setTimeout(compareArrs, 16000);
        if(userClicked === true) {
            clearTimeout(timerId);
        }
    }
    if(difficulty === 'MEDIUM') {
        const timerId = setTimeout(compareArrs, 11000);
        if(userClicked === true) {
            clearTimeout(timerId);
        }
    }
    if(difficulty === 'HARD') {
        const timerId = setTimeout(compareArrs, 6000);
        if(userClicked === true) {
            clearTimeout(timerId);
        }
    }
}

function compTurn() {
    for (let i = 0; i < compArr.length; i++) {
        const sequence = compArr[i];
        setTimeout(flash, i * 600, sequence, i);
    }
    userClicked = false;
}

function onUserClick(e) {
    if(compArr.length >= 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const divClicked = this.id;
        flash(divClicked);
        userArr.push(divClicked);
        console.log(userArr);
        if(userArr.length === compArr.length){
            compareArrs();
        }
        userClicked = true;
    }
}

function compareArrs() {
    let tenorSearch = '';
    let message = '';

    if(compArr.join() === userArr.join()){
        if(userArr.length === numOfTurns) {
            tenorSearch = 'lights';
            message = 'YOU WON!!';
            setEndgameModal(tenorSearch, message);
            
            setTimeout(onStopGame, 2000);
        } 
        else {
            userArr = [];
            setTimeout(compTurn, 2000);
        }
    }
    else {
        tenorSearch = 'lights off';
        message = 'yOU lOsE!';
        setEndgameModal(tenorSearch, message);
        
        setTimeout(onStopGame, 2000);
    }
}

function flash(divId, i) {
    const div = $(`#${divId}`)
    div.removeClass("div_color1");
    div.addClass("div_color2")
    
    setTimeout(returnColor, 500, divId, i);  
}

function returnColor(divId, i) {
    const div = $(`#${divId}`)
    div.removeClass("div_color2");
    div.addClass("div_color1");

    if(i === (compArr.length -1)) {
        getRandom();
    }
}

function setEndgameModal(query, text) {
    tenorService.grabData(query, text);
}

function randColor() {
    let decimals = "0123456789ABCDEF"
    let hash = "#";
    for (let index = 0; index < 6; index++) {
        hash += decimals[Math.floor(Math.random() * decimals.length)];
    }
    $(this).css('background-color', hash);
}