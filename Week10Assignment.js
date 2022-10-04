console.log("inside Week10Assignment.js");

class Meal {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

class Day {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.meals = [];
    }

    addMeal(meal) {
        this.meals.push(meal);
    }

    deleteMeal(meal) {
        let index = this.meals.indexOf(meal);
        this.meals.splice(index, 1);
    }
}

let days = []; 
let dayId = 0;

onClick('new-day', () => {
    days.push(new Day(dayId++, getValue('new-day-name')));
    drawDOM();
});

function onClick(id, action) {
    console.log("inside onClick");
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    console.log("inside getValue");
    return document.getElementById(id).value;
}

function drawDOM() {
    console.log("inside drawDOM");
    let dayDiv = document.getElementById('days');
    clearElement(dayDiv);
    for (day of days) {
        let table = createDayTable(day);
        let title = document.createElement('h2');
        title.innerHTML = day.name;
        title.appendChild(createDeleteDayButton(day));
        dayDiv.appendChild(title);
        dayDiv.appendChild(table);
        for (meal of day.meals) {
            createMealRow(day, table, meal);
        }
    }
}

function createMealRow(day, table, meal) {
    console.log("inside createMealRow");
let row = table.insertRow(2);
row.insertCell(0).innerHTML = meal.name;
row.insertCell(1).innerHTML = meal.position;
let actions = row.insertCell(2);
actions.appendChild(createDeleteRowButton(day, meal));
}

function createDeleteRowButton(day, meal) {
    console.log("inside createDeleteRowButton");
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = day.meals.indexOf(meal);
        day.meals.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteDayButton(day) {
    console.log("inside createDeleteDayButton");
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Delete Day';
    btn.onclick = () => {
        let index = days.indexOf(day);
        days.splice(index, 1);
        drawDOM(); 
    };
    return btn;
}

function createNewMealButton(day) {
    console.log("inside createNewMealButton");
    let btn = document.createElement('button');
btn.className = 'btn btn-secondary';
btn.innerHTML = 'Create';
btn.onclick = () => {
    day.meals.push(new Meal(getValue(`name-input-${day.id}`), getValue(`position-input-${day.id}`)));
    drawDOM();
    };
    return btn;
}

function createDayTable(day) {
    console.log("inside createDayTable");
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th');
    nameColumn.innerHTML = 'Which Meal Time';
    positionColumn.innerHTML = 'What Your Having';
    row.appendChild(nameColumn);
    row.appendChild(positionColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${day.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${day.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let newMealButton = createNewMealButton(day);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMealButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    console.log("inside clearElement");
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}