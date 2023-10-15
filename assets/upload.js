document.getElementById("fileInput").addEventListener("change", function () {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    if (file.name.endsWith(".csv")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const csvContent = e.target.result;
        const lines = csvContent.split("\n");
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

        console.log("Nomes extraídos do CSV:", names);
      };

      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo CSV.");
    }
  }
});
