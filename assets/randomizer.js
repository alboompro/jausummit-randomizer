const button = document.querySelector("#button");
const winner = document.querySelector("#winner");
const winnerWrapper = document.querySelector("#winnerWrapper");
const allParticipants = document.querySelector("#allParticipants");
const paragraph = document.querySelector("#paragraph");
const imgConfetti = document.querySelector("#confetti");

const storedNames = JSON.parse(localStorage.getItem("fullNames")) || [];
const storedRegistrationNumber = JSON.parse(localStorage.getItem("registrationNumber")) || [];

if (storedNames.length === 0) {
  winner.textContent = "Nenhum participante cadastrado";
  button.style.display = "none";
  paragraph.style.display = "none";
}

allParticipants.textContent = storedNames.length;
allParticipants.style.margin = "0 4px";

const randomName = () => {
  const rand = Math.floor(Math.random() * storedNames.length);
  const name = storedNames[rand];
  if (name.length > 30) {
    winner.style.display = "flex";
    winner.style.flexDirection = "column";
    winner.style.textAlign = "center";
  }

  winner.style.textTransform = "capitalize"

  winner.textContent = name;
  registration.textContent = storedRegistrationNumber[rand];
};

const setDeceleratingTimeout = (callback, times) => {
  var internalCallback = (function (t) {
    return function () {
      if (--t > 0) {
        window.setTimeout(internalCallback, 60);
        callback();
      }
    };
  })(times, 0);

  window.setTimeout(internalCallback);
};

const timeOutCallBack = () => {
  return function () {
    winner.textContent = winner.innerText;
    imgConfetti.style.display = "block";
    imgConfetti.setAttribute("src", "assets/images/Celebration.gif");
    setTimeout(function () {
      isPlaying = false;
      imgConfetti.setAttribute("src", "");
      imgConfetti.style.display = "none";
    }, 5000);
  };
};

let isPlaying = false;

button.addEventListener("click", (e) => {
  if (isPlaying) return;
  isPlaying = true;
  setDeceleratingTimeout(
    function () {
      randomName();
    },
    30
  );

  setTimeout(timeOutCallBack(), 1570);

  e.preventDefault();
});