// Selecionando elementos HTML com IDs específicos
const button = document.querySelector("#button"); // Botão
const winner = document.querySelector("#winner"); // Elemento que mostrará o vencedor
const winnerWrapper = document.querySelector("#winnerWrapper"); // Container do vencedor
const allParticipants = document.querySelector("#allParticipants"); // Contador de participantes
const paragraph = document.querySelector("#paragraph"); // Parágrafo
const imgConfetti = document.querySelector("#confetti"); // Imagem de confete

// Arrays para armazenar informações dos participantes
const registrationNumber = []; // Números de registro
const firstName = []; // Primeiros nomes
const lastName = []; // Sobrenomes
const fullName = []; // Nomes completos

let isPlaying = false; // Flag para verificar se o sorteio está em andamento

// Função assíncrona para buscar nomes a partir de uma planilha Google Sheets
const getAllNames = async () => {
  const res = await fetch("", {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv;charset=UTF-8'
    }
  });

  const data = await res.text();

  if (data) {
    // Separando os dados em linhas e armazenando em 'names'
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

    // Removendo o cabeçalho da planilha
    const sliceNames = names.slice(1);

    // Processando os nomes e armazenando em arrays separados
    sliceNames.forEach((participants, index) => {
      const splitComma = participants.split(',')
      registrationNumber.push(splitComma[0])
      firstName.push(splitComma[1])
      lastName.push(splitComma[2])
    });

    // Criando nomes completos a partir de primeiros nomes e sobrenomes
    if (firstName.length === lastName.length) {
      for (let i = 0; i < firstName.length; i++) {
        const trimmedFirstName = firstName[i].trim();
        const trimmedLastName = lastName[i].trim();
        const fullNameStr = `${trimmedFirstName} ${trimmedLastName}`;
        fullName.push(fullNameStr);
      }
    } else {
      // Se o número de primeiros nomes e sobrenomes for diferente, exibe uma mensagem de erro
      winner.textContent = "Nenhum participante cadastrado";
      button.style.display = "none";
      paragraph.style.display = "none";
    }

    // Atualiza o contador de participantes
    allParticipants.textContent = fullName.length;
    allParticipants.style.margin = "0 4px";
  }
}

// Função para escolher um nome aleatório e exibi-lo como vencedor
const randomName = () => {
  const rand = Math.floor(Math.random() * fullName.length);
  const name = fullName[rand];
  
  // Ajustando a aparência do elemento vencedor se o nome for muito longo
  if (name.length > 30) {
    winner.style.display = "flex";
    winner.style.flexDirection = "column";
    winner.style.textAlign = "center";
  }

  winner.style.textTransform = "capitalize"
  winner.textContent = name;
  registration.textContent = registrationNumber[rand];
};

// Função para criar um atraso decrescente nas chamadas de uma função
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

// Função para manipular a exibição de confetes e reiniciar o sorteio após um tempo
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

// Listener para o clique no botão de sorteio
button.addEventListener("click", (e) => {
  if (isPlaying) return; // Impede múltiplos sorteios simultâneos
  isPlaying = true;
  setDeceleratingTimeout(
    function () {
      randomName();
    },
    30
  );
  
  // Inicia a função de timeout para confetes
  setTimeout(timeOutCallBack(), 1570);

  e.preventDefault();
});

// Listener para eventos de
