let fieldSetsCount = 1;
let fieldSetElements = [document.querySelector(".fieldsets fieldset")];
let container = document.querySelector(".fieldsets");
let nameIndex = 1;

container.querySelector(".delete-button").addEventListener("click", () => deleteFieldSet(fieldSetElements[0]));
document.querySelector(".add-button").addEventListener("click", () => createFieldSet());
const modal = document.querySelector(".modal-overlay");
const modalContent = modal.querySelector(".modal-content");

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.querySelectorAll('p').forEach(p => p.remove());
});

document.querySelector('.submit-button').addEventListener('click', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    modal.style.display = "block";
    appendToModal("Заказ принят!");
    appendToModal(`Вы заказали ${fieldSetsCount} ${getDeclension(fieldSetsCount)}`);
}

function appendToModal(text) {
    let p = document.createElement("p");
    p.innerText = text;
    modalContent.appendChild(p);
}

function getDeclension(i) {
    let mod = i % 100;
    if (mod % 10 >= 5 || mod % 10 === 0 || [11, 12, 13, 14].includes(mod)) {
        return "напитков";
    }
    else if (mod % 10 > 1 && mod % 10 <= 4) {
        return "напитка";
    }
    return "напиток";
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

