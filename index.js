let fieldSetsCount = 1;
let fieldSetElements = [document.querySelector(".fieldsets fieldset")];
let container = document.querySelector(".fieldsets");
let nameIndex = 1;

container.querySelector(".delete-button").addEventListener("click", () => deleteFieldSet(fieldSetElements[0]));
document.querySelector(".add-button").addEventListener("click", () => createFieldSet());
const modal = document.querySelector(".modal-overlay");

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
});

document.querySelector('.submit-button').addEventListener('click', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    modal.style.display = "block";
}

function createFieldSet() {
    nameIndex++;
    let fieldSetElement = document.createElement("fieldset");
    fieldSetElement.setAttribute("class", "beverage");
    fieldSetElement.innerHTML = fieldSetElements[0].innerHTML;
    fieldSetElement.querySelector("h4").innerText = `Напиток №${++fieldSetsCount}`;
    fieldSetElement.querySelector(".delete-button").addEventListener("click", () => deleteFieldSet(fieldSetElement));
    fieldSetElement.querySelectorAll("input[type='radio']").forEach(field => {
        field.setAttribute("name", `milk${nameIndex}`);
    });
    fieldSetElements.push(fieldSetElement);
    container.appendChild(fieldSetElement);
}

function deleteFieldSet(element) {
    if (fieldSetsCount === 1) {
        return;
    }
    let index = Number(element.querySelector("h4").innerText.split(' ')[1].slice(1)) - 1;
    container.removeChild(fieldSetElements[index]);
    fieldSetElements[index].remove();
    for (let i = index; i < fieldSetElements.length - 1; i++) {
        fieldSetElements[i] = fieldSetElements[i + 1];
    }
    for (let i = index; i < fieldSetElements.length - 1; i++) {
        fieldSetElements[i].querySelector("h4").innerHTML = `Напиток №${i + 1}`;
    }
    fieldSetElements.pop();
    fieldSetsCount--;
}

