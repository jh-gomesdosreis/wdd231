const openButtons = document.querySelectorAll(".open-button");
const dialogBoxes = document.querySelectorAll(".dialog-box");
const closeButtons = document.querySelectorAll(".close-button");

openButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        dialogBoxes[index].showModal();
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        dialogBoxes[index].close();
    });
});
