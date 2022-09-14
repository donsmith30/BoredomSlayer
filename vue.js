// Define components
const triviaComponent = {
  template: `<iframe src="./Trivia/index.html"></iframe>`,
};

const rpsComponent = {
  template: `<iframe src="./Rock_Paper_Scissors/index.html"></iframe>`,
};

const tttComponent = {
  template: `<iframe src="./Tic_Tac_Toe/index.html"></iframe>`,
};

const msComponent = {
  template: '<iframe src="./Mine%20Sweeper/index.html"></iframe>',
};

document.getElementById("carousel").addEventListener("click", (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.classList.contains("gameSelector")) {
    const gameType = clickedElement.getAttribute("game_type");
    document.getElementById("carousel").classList.toggle("ninja");
  }
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("carousel").classList.toggle("ninja");
});

// Router map for defining components
const routes = [
  {
    path: "/rps",
    component: rpsComponent,
  },
  {
    path: "/ttt",
    component: tttComponent,
  },
  {
    path: "/mineSweep",
    component: msComponent,
  },
  {
    path: "/triviaLoad",
    component: triviaComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({});
app.use(router);
app.mount("#app");
