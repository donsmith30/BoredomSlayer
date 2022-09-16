const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

//global vars
let correctAnswer = "";
let limit = 1;
let category = [];
let difficulty = "hard";
let shuffledArray = [];
const triviaArray = [];
let setNum = 0;
triviaQuestions = [];
let playerPoints = 0;

async function getTrivia() {
  let url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=${limit}&region=US&difficulty=${difficulty}`;
  const response = await fetch(url);
  const loadApi = await response.json();
  triviaQuestions = [...loadApi];
}

async function playGame() {
  const result = await getTrivia();
  newRound();
}

document.getElementById("newGame").addEventListener("click", () => {
  ninjaToggle();
});

function newRound() {
  if (setNum < limit) {
    buildResponseArray(setNum);
    buildQuestion(setNum);
    buildTrivia(setNum);
    setNum++;
  } else {
    var winPercent = (playerPoints / limit) * 100;
    if (winPercent >= 70) {
      setEndgameModal("Win", `${winPercent}% right! GOOD GAME!`);
    } else {
      setEndgameModal("Lose", `${winPercent}% right! BAD GAME!`);
    }
    setNum = 0;
    playerPoints = 0;
  }
}

function setEndgameModal(query, text) {
  tenorService.grabData(query, text);
}

async function buildQuestion(setNum) {
  triviaQ = triviaQuestions[setNum].question;
}

async function buildResponseArray(setNum) {
  const array = [
    triviaQuestions[setNum].incorrectAnswers[0],
    triviaQuestions[setNum].incorrectAnswers[1],
    triviaQuestions[setNum].incorrectAnswers[2],
    triviaQuestions[setNum].correctAnswer,
  ];
  shuffledArray = array.sort((a, b) => 0.5 - Math.random());
  correctAnswer = triviaQuestions[setNum].correctAnswer;
}

async function buildTrivia() {
  const game = document.createElement("div");
  document.getElementById("game_container").appendChild(game);

  const question = document.createElement("p");
  question.innerText = triviaQ;
  game.appendChild(question);

  const triviaResponseForm = document.createElement("form");
  game.appendChild(triviaResponseForm);

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
      playerPoints++;
      //load up more qs
    } else {
      alert(`you are wrong, it was ${correctAnswer}`);
    }
    document.getElementById("game_container").firstChild.remove();
    newRound();
  }
});

document
  .getElementById("settings_container")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    ninjaToggle();
    limit = document.getElementById("setLimit").value;
    difficulty = document.getElementById("setDifficulty").value;
    category = [];

    var catLength = document.getElementById("setCategory").options.length;
    for (var i = 0; i < catLength; i++) {
      opt = document.getElementById("setCategory").options[i];
      if (opt.selected) {
        category.push(opt.id);
        //alert(opt.value);
      }
    }

    alert(
      `You picked ${limit} rounds, with a topic of ${category}, and a ${difficulty} dificulty! Let's go!`
    );
    playGame();
  });

function ninjaToggle() {
  document.getElementById("settings_container").classList.toggle("ninja");
}

//getTrivia().then((data) => `${data[0].question} ${data[0].incorrectAnswers[0]} ${data[0].correctAnswer} ${data[0].incorrectAnswers[1]} ${data[0].incorrectAnswers[2]}`)
// function buildGame() {
//   const settings = document.createElement("div");
//   document.getElementById("settings_container").appendChild(settings);

//   const settingsForm = document.createElement("form");
//   settings.appendChild(settingsForm);

//   const setLimitLabel = document.createElement("label");
//   setLimitLabel.setAttribute("for", "setLimit");
//   setLimitLabel.innerText = "How many rounds?";
//   settingsForm.appendChild(setLimitLabel);

//   const setLimit = document.createElement("input");
//   setLimit.setAttribute("type", "text");
//   setLimit.id("setLimit");
//   setLimit.classList.add("form-control");
//   settingsForm.appendChild(setLimit);

//   const setCategory = document.createElement("select");
//   setCategory.setAttribute("multiple", "");
//   setCategory.id("setCategory");
//   setCategory.classList.add("form-control");
//   setCategory.innerHTML = `<option>Film & TV</option>
//   <option>Food & Drink</option>
//   <option>General Knowledge</option>
//   <option>Arts & Literature</option>
//   <option>Geography</option>
//   <option>History</option>
//   <option>Music</option>
//   <option>Science</option>
//   <option>Society & Culture</option>
//   <option>Sport & Leisure</option>`;
//   settingsForm.appendChild(setCategory);

//   const setDifficulty = document.createElement("select");
//   setDifficulty.id("setDifficulty");
//   setDifficulty.classList.add("form-control");
//   setDifficulty.innerHTML = `<option>easy</option>
//   <option>medium</option>
//   <option>hard</option>`;
//   settingsForm.appendChild(setDifficulty);

//   const settingsSubmit = document.createElement("input");
//   settingsSubmit.setAttribute("type", "submit");
//   settingsForm.appendChild(settingsSubmit);
// }

//buildGame (form)
//save game variables from form
//delete form
//hide interface
//play game
//save score
//end game function

// document.getElementById("newQuestion").addEventListener("click", async () => {
//   //getTrivia()
//   const result = await getTrivia();
//   buildResponseArray(setNum);
//   buildQuestion(setNum);
//   buildTrivia(setNum);
// });
