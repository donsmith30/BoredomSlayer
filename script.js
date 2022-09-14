const flicking = new Flicking("#carousel", {
  //align: "center",
  circular: true,

  renderOnlyVisible: true,
  //panelsPerView: -1,
});

document.getElementById("carousel").addEventListener("click", (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.classList.contains("gameSelector")) {
    document.getElementById("carousel").classList.toggle("ninja");
  }
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("carousel").classList.toggle("ninja");
});
