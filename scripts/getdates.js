const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let lastModifiedElement = document.getElementById("lastModified");
let lastModifiedDate = document.lastModified;
lastModifiedElement.textContent = "Last Modified: " + lastModifiedDate;