const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let timeLeft = 5.00;
const timerElem = document.getElementById('timer');
const timerId = setInterval(countdown, 10);

function countdown() {
    if (timeLeft == (-0.01)) {
        timeLeft = 0.00;
        clearTimeout(timerId);
        doSomething();
    }
    else {
        timerElem.innerText = timeLeft;
        timeLeft = (timeLeft - .01).toFixed(2);
    }
}

function doSomething() {
    alert("hi");
}