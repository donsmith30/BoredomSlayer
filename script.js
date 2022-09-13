const flicking = new Flicking("#carousel", {
  //align: "center",
  circular: true,

  renderOnlyVisible: true,
  //panelsPerView: -1,
});

/**
 * Define your components
 */

// Add page content
var rpsComponent = Vue.extend({
  template:
    '<div class="jumbotron">' +
    "<h1>Rock Paper Scissors</h1>" +
    "<p>Welcome to Rock Paper Scissors</p>" +
    "</div>",
});

var tttComponent = Vue.extend({
  template:
    '<div class="jumbotron">' +
    "<h1>Tic Tac Toe</h1>" +
    "<p>Welcome to Tic Tac Toe</p>" +
    "</div>",
});

var msComponent = Vue.extend({
  template:
    '<div class="jumbotron">' +
    "<h1>Mine Sweeper</h1>" +
    "<p>Welcome to Mine Sweeper page</p>" +
    "</div>",
});

var triviaComponent = Vue.extend({
  template:
    '<div class="jumbotron">' +
    "<h1>Trivia</h1>" +
    "<p>Welcome to trivia page</p>" +
    "</div>",
});

// Tell Vue to use view-router
//Vue.use(VueRouter);

// Router options
var router = new VueRouter({
  history: false,
  root: "/",
});

// Router map for defining components
router.map({
  "/rps": {
    component: rpsComponent,
  },
  "/ttt": {
    component: tttComponent,
  },
  "/ms": {
    component: msComponent,
  },
  "/trivia": {
    component: triviaComponent,
  },
});

var App = Vue.extend();

router.start(App, "#app");
