let fieldSetsCount = 1;
let fieldSetElements = [document.querySelector(".fieldsets fieldset")];
let container = document.querySelector(".fieldsets");
let nameIndex = 1;

container.querySelector(".delete-button").addEventListener("click", () => deleteFieldSet(fieldSetElements[0]));
document.querySelector(".add-button").addEventListener("click", () => createFieldSet());
const modal = document.querySelector(".modal-overlay");
const modalContent = modal.querySelector(".modal-content");

document.querySelector('.submit-button').addEventListener('click', handleFormSubmit);
fieldSetElements[0].querySelector('textarea[name="other"]').addEventListener('input', function() {
        fieldSetElements[0].querySelector('.other-output').innerHTML = highlightSpecialWords(this.value);
});

function handleFormSubmit(event) {
    event.preventDefault();
    modal.style.display = "block";
    appendCloseButton();
    appendToModal("Заказ принят!");
    appendToModal(`Вы заказали ${fieldSetsCount} ${getDeclension(fieldSetsCount)}`);
    appendTable(modalContent);
}

function highlightSpecialWords(text) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
    const regex = new RegExp(keywords.join('|'), 'gi');
    return text.replace(regex, '<b>$&</b>');
}

function appendCloseButton() {
    let closeButton = document.createElement("span");
    closeButton.classList.add("modal-close");
    closeButton.innerHTML = "&times;";
    modalContent.appendChild(closeButton).addEventListener('click', () => {
        modal.style.display = 'none';
        modalContent.innerHTML = '';
    });
}

function appendToModal(text) {
    let p = document.createElement("p");
    p.innerText = text;
    modalContent.appendChild(p);
}

function appendTable() {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    table.appendChild(headerRow);
    ["Напиток", "Молоко", "Дополнительно", "Пожелания"].forEach(headerName => {
        const headerEl = document.createElement('th');
        headerEl.textContent = headerName;
        headerRow.appendChild(headerEl);
    });

    document.querySelectorAll('.beverage').forEach(fieldset => {
        const row = document.createElement('tr');
        const beverage = document.createElement('td');
        beverage.textContent = fieldset.querySelector('select').selectedOptions[0].value;
        row.appendChild(beverage);

        const milk = document.createElement('td');
        milk.textContent = fieldset.querySelector('input[type="radio"]:checked').value;
        row.appendChild(milk);

        const options = document.createElement('td');
        options.textContent = [...fieldset.querySelectorAll('input[type="checkbox"]:checked')].map(el => el.value).join(', ');
        row.appendChild(options);

        const wishes = document.createElement('td');
        wishes.textContent = fieldset.querySelector('textarea').value;
        row.appendChild(wishes);

        table.appendChild(row);
    });

    modalContent.appendChild(table);
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
    const otherOutput = fieldSetElement.querySelector('.other-output');
    otherOutput.innerHTML = '';
    fieldSetElement.querySelector('textarea[name="other"]').addEventListener('input', function() {
        otherOutput.innerHTML = highlightSpecialWords(this.value);
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

