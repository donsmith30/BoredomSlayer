const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let numOfTurns = '';

function startUp() {
    console.log("startUp is firing");

    wireUpButtons();
}

function wireUpButtons() {
    $('#start').on('click', onStartGame)
    $('#stop').on('click', onStopGame)
    $('.div_color1').on('click', onUserClick)
}

let compArr = [];
let userArr = [];

function onStartGame() {
    selectNumOfTurns();
    while(compArr.length === 0) {
        getRandom();
    }
}

function selectNumOfTurns() {
    while(!Number.isInteger(numOfTurns)) {
        numOfTurns = parseInt(prompt("Enter the number of rounds you'd like to play"), 10);
        while( numOfTurns <= 0) {
            numOfTurns = parseInt(prompt("Enter the number of rounds you'd like to play"), 10);
        }
    }
}

function onStopGame() {
    compArr = [];
    userArr = [];
    numOfTurns = '';
    alert("GameBoard Reset");
}

function getRandom() {
    let randomDivId = Number(Math.floor(9 * Math.random()) + 1).toString();
    setTimeout(flash, 200, randomDivId);
    compArr.push(randomDivId);
    console.log(compArr);
}

function compTurn() {
    for (let i = 0; i < compArr.length; i++) {
        const sequence = compArr[i];
        setTimeout(flash, i * 600, sequence, i);
    }
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
    }
}

function compareArrs() {
    let tenorSearch = '';
    let message = '';

    if(compArr.join() === userArr.join()){
        if(userArr.length === numOfTurns) {
            tenorSearch = 'winning';
            message = 'YOU WON!!';
            setEndgameModal(tenorSearch, message);
            
            onStopGame();
        } 
        else {
            userArr = [];
            setTimeout(compTurn, 2000);
        }
    }
    else {
        tenorSearch = 'losing';
        message = 'yOU lOsE!';
        setEndgameModal(tenorSearch, message);
        
        onStopGame();
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