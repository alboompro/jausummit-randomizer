const registrationNumber = []
const firstName = []
const lastName = []

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

        const sliceNames = names.slice(1);
        
        sliceNames.forEach((partcipants, index) => {

          const splitComma = partcipants.split(',')

          registrationNumber.push(splitComma[0])
          firstName.push(splitComma[1])
          lastName.push(splitComma[2])
        });

        if (firstName.length === lastName.length) {
          const fullName = [];
        
          for (let i = 0; i < firstName.length; i++) {
            const trimmedFirstName = firstName[i].trim();
            const trimmedLastName = lastName[i].trim();
            const fullNameStr = `${trimmedFirstName} ${trimmedLastName}`;
            fullName.push(fullNameStr);
          }

          localStorage.setItem('registrationNumber', JSON.stringify(registrationNumber));
          localStorage.setItem('fullNames', JSON.stringify(fullName));
          debugger
          window.location.href = 'index.html';
        } else {
          console.error("Os arrays firstName e lastName não têm o mesmo comprimento.");
        }
      };

      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo CSV.");
    }
  }
});
