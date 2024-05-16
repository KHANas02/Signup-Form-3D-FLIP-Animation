console.clear();
const elApp = document.querySelector("#app");
const elSignUpButton = document.querySelector("#signup");
const losFlippers = elApp.querySelectorAll("[data-flip]");

const machine = {
  form: {
    signUp: "home"
  },
  home: {
    signUp: "form"
  }
};

elSignUpButton.addEventListener("click", (e) => {
  e.preventDefault();
  flip(() => {
    const currentState = machine[elApp.dataset.state];
    elApp.dataset.state = currentState.signUp;
  }, losFlippers);
});

setTimeout(() => elSignUpButton.click(), 500);
setTimeout(() => elSignUpButton.click(), 2500);

/* Helpers for FLIP (First Last Invert Play) */

function getRect(el) {
  return el.getBoundingClientRect();
}

function flip(doSomething, firstEls, getLastEls = () => firstEls) {
  const firstElsRects = Array.from(firstEls, (el) => [el, getRect(el)]);

  requestAnimationFrame(() => {
    doSomething();
    const lastElsRects = Array.from(getLastEls(), (el) => [el, getRect(el)]);

    firstElsRects.forEach(([firstEl, firstRect], i) => {
      const [lastEl, lastRect] = lastElsRects[i];
      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;
      lastEl.dataset.flipping = true;
      lastEl.style.setProperty("--dx", dx);
      lastEl.style.setProperty("--dy", dy);
      lastEl.style.setProperty("--dw", dw);
      lastEl.style.setProperty("--dh", dh);
      requestAnimationFrame(() => delete lastEl.dataset.flipping);
    });
  });
}
