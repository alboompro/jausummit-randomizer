const button = document.querySelector("#button");
const winner = document.querySelector("#winner");
const winnerWrapper = document.querySelector("#winnerWrapper");
const allParticipants = document.querySelector("#allParticipants");
const paragraph = document.querySelector("#paragraph");
const imgConfetti = document.querySelector("#confetti");

const registrationNumber = [];
const firstName = []
const lastName = []
const fullName = [];
let file = [];
let callback;

let isPlaying = false;

const getAllNames = async () => {
  const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS6c0coxJlTiD0iSMrFtjdc1AxEOOV8vFbvkjJUn4ao2Ktg4eUxQcGp422pm-tgclp3z837jlOgbL4j/pub?gid=0&single=true&output=csv", {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv;charset=UTF-8'
    }
  });
  const data = await res.text();
  if (data) {
    const lines = data.split("\n");
    const names = [];

    for (const line of lines) {
      const parts = line.split(";");
      for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart !== "") {
          names.push(trimmedPart);
        }
      }
    }

    const sliceNames = names.slice(1);

    sliceNames.forEach((partcipants, index) => {

      const splitComma = partcipants.split(',')

      registrationNumber.push(splitComma[0])
      firstName.push(splitComma[1])
      lastName.push(splitComma[2])
    });

    if (firstName.length === lastName.length) {
      for (let i = 0; i < firstName.length; i++) {
        const trimmedFirstName = firstName[i].trim();
        const trimmedLastName = lastName[i].trim();
        const fullNameStr = `${trimmedFirstName} ${trimmedLastName}`;
        fullName.push(fullNameStr);
      }
    } else {
      winner.textContent = "Nenhum participante cadastrado";
      button.style.display = "none";
      paragraph.style.display = "none";
    }

    allParticipants.textContent = fullName.length;
    allParticipants.style.margin = "0 4px";
  }
}

const randomName = () => {
  const rand = Math.floor(Math.random() * fullName.length);
  const name = fullName[rand];
  if (name.length > 30) {
    winner.style.display = "flex";
    winner.style.flexDirection = "column";
    winner.style.textAlign = "center";
  }

  winner.style.textTransform = "capitalize"
  winner.textContent = name;
  registration.textContent = registrationNumber[rand];
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
    callback = setTimeout(function () {
      isPlaying = false;
      imgConfetti.setAttribute("src", "");
      imgConfetti.style.display = "none";
    }, 5000);
  };
};

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

document.addEventListener("keydown", function (event) {
  if (event.code === "PageDown" || event.code === "PageUp") {
    button.click();
    if (isPlaying === true) {
      isPlaying = false;
      imgConfetti.setAttribute("src", "");
      imgConfetti.style.display = "none";
      window.clearTimeout(callback);
    }
  }
});

getAllNames();
