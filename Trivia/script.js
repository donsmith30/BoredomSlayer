const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const url = `https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=1&region=US&difficulty=easy`;

async function getTrivia() {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

let correctAnswer = "";

document
  .getElementById("newQuestion")
  .addEventListener("click", async (evt) => {
    evt.preventDefault();
    getTrivia().then((data) => {
      buildTrivia(data);
      correctAnswer = data[0].correctAnswer;
    });
  });

//getTrivia().then((data) => `${data[0].question} ${data[0].incorrectAnswers[0]} ${data[0].correctAnswer} ${data[0].incorrectAnswers[1]} ${data[0].incorrectAnswers[2]}`)
function setGameRules() {}

function buildTrivia(data) {
  const game = document.createElement("div");
  document.getElementById("game_container").appendChild(game);

  const triviaQ = document.createElement("p");
  triviaQ.innerText = data[0].question;
  game.appendChild(triviaQ);

  const triviaResponseForm = document.createElement("form");
  game.appendChild(triviaResponseForm);

  const array = [
    data[0].incorrectAnswers[0],
    data[0].incorrectAnswers[1],
    data[0].incorrectAnswers[2],
    data[0].correctAnswer,
  ];
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());

  const triviaResponseSubmit1 = document.createElement("input");
  triviaResponseSubmit1.setAttribute("type", "button");
  triviaResponseSubmit1.classList.add("response");
  triviaResponseSubmit1.setAttribute("value", shuffledArray[0]);
  triviaResponseForm.appendChild(triviaResponseSubmit1);

  const triviaResponseSubmit2 = document.createElement("input");
  triviaResponseSubmit2.setAttribute("type", "button");
  triviaResponseSubmit2.classList.add("response");
  triviaResponseSubmit2.setAttribute("value", shuffledArray[1]);
  triviaResponseForm.appendChild(triviaResponseSubmit2);

  const triviaResponseSubmit3 = document.createElement("input");
  triviaResponseSubmit3.setAttribute("type", "button");
  triviaResponseSubmit3.classList.add("response");
  triviaResponseSubmit3.setAttribute("value", shuffledArray[2]);
  triviaResponseForm.appendChild(triviaResponseSubmit3);

  const triviaResponseSubmit4 = document.createElement("input");
  triviaResponseSubmit4.setAttribute("type", "button");
  triviaResponseSubmit4.classList.add("response");
  triviaResponseSubmit4.setAttribute("value", shuffledArray[3]);
  triviaResponseForm.appendChild(triviaResponseSubmit4);
}

document.getElementById("game_container").addEventListener("click", (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.classList.contains("response")) {
    const userChoice = clickedElement.getAttribute("value");
    if (userChoice === correctAnswer) {
      alert("winner");
      //load up more qs
    } else {
      alert(`you are wrong, it was ${correctAnswer}`);
    }
    window.navigator.vibrate([200, 100, 200]);
    document.getElementById("game_container").firstChild.remove();
  }
});
