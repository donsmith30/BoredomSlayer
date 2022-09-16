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

const mlComponent = {
  template: '<iframe src="./Lights_Game/index.html"></iframe>',
};
const cardsComponent = {
  template: '<iframe src="./Memory_Cards/index.html"></iframe>',
};
const kanyeComponent = {
  template: '<iframe src="./Kanye_Says/index.html"></iframe>',
};
const snakeComponent = {
  template: '<iframe src="./snake/index.html"></iframe>'
}

// Router map for defining components
const routes = [
  {
    path: "/rps",
    component: rpsComponent,
  },
  {
    path: "/memoryLights",
    component: mlComponent,
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
  {
    path: "/memoryCards",
    component: cardsComponent,
  },
  {
    path: "/kanyeSays",
    component: kanyeComponent,
  },
  {
    path: "/snake",
    component: snakeComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({});
app.use(router);
app.mount("#app");
