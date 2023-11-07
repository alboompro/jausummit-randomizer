// Cria três arrays vazios para armazenar dados dos participantes
const registrationNumber = [];
const firstName = [];
const lastName = [];

// Função assíncrona para buscar dados de uma planilha Google Sheets
const getAllNames = async () => {
  const res = await fetch("URL_DA_PLANILHA_CSV", {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv;charset=UTF-8'
    }
  });
  return await res.json();
}

// Chama a função para obter o arquivo CSV
const file = getAllNames();

// Verifica se o arquivo CSV foi retornado com sucesso
if (file) {
  // Verifica se o arquivo possui a extensão .csv
  if (file.name.endsWith(".csv")) {
    // Cria um leitor de arquivos
    const reader = new FileReader();

    // Define uma função de retorno de chamada quando o arquivo é lido
    reader.onload = function (e) {
      // Lê o conteúdo do arquivo CSV
      const csvContent = e.target.result;
      // Divide o conteúdo em linhas
      const lines = csvContent.split("\n");
      const names = [];

      // Loop através das linhas e separa os nomes
      for (const line of lines) {
        const parts = line.split(";");
        for (const part of parts) {
          const trimmedPart = part.trim();
          if (trimmedPart !== "") {
            names.push(trimmedPart);
          }
        }
      }

      // Remove o cabeçalho da planilha (a primeira linha)
      const sliceNames = names.slice(1);

      // Loop através dos nomes separados e os armazena nos arrays apropriados
      sliceNames.forEach((participants, index) => {
        const splitComma = participants.split(',');
        registrationNumber.push(splitComma[0])
        firstName.push(splitComma[1])
        lastName.push(splitComma[2])
      });

      // Verifica se os arrays de nome e sobrenome têm o mesmo comprimento
      if (firstName.length === lastName.length) {
        // Cria um array para nomes completos e preenche-o
        const fullName = [];
        for (let i = 0; i < firstName.length; i++) {
          const trimmedFirstName = firstName[i].trim();
          const trimmedLastName = lastName[i].trim();
          const fullNameStr = `${trimmedFirstName} ${trimmedLastName}`;
          fullName.push(fullNameStr);
        }

        // Armazena os dados nos locais de armazenamento local (localStorage) e redireciona para index.html
        localStorage.setItem('registrationNumber', JSON.stringify(registrationNumber));
        localStorage.setItem('fullNames', JSON.stringify(fullName));
        window.location.href = 'index.html';
      } else {
        console.error("Os arrays firstName e lastName não têm o mesmo comprimento.");
      }
    };

    // Lê o arquivo CSV como texto
    reader.readAsText(file);
  } else {
    alert("Por favor, selecione um arquivo CSV.");
  }
}
