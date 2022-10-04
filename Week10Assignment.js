console.log("inside Week10Assignment.js");
//create a class and constructor for your meals and what your eating
class Meal {
    constructor(name, eating) {
        this.name = name;
        this.eating = eating;
    }
}
//create a class and constructor for the day you are eating and the ability to add and delete the meal
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

//create the function of creating the day of week capability
onClick('new-day', () => {
    days.push(new Day(dayId++, getValue('new-day-name')));
    drawDOM();
});

//create the function of the action once clicked
function onClick(id, action) {
    console.log("inside onClick");
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//create the function of what is being returned
function getValue(id) {
    console.log("inside getValue");
    return document.getElementById(id).value;
}

//create the DOM
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

//create the Meal row and cells for name of meal and what your eating
function createMealRow(day, table, meal) {
    console.log("inside createMealRow");
let row = table.insertRow(2);
row.insertCell(0).innerHTML = meal.name;
row.insertCell(1).innerHTML = meal.eating;
let actions = row.insertCell(2);
actions.appendChild(createDeleteRowButton(day, meal));
}

//create the option to delete the row via a button
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

//create the button to delete the day 
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

//create the button for the new meal
function createNewMealButton(day) {
    console.log("inside createNewMealButton");
    let btn = document.createElement('button');
btn.className = 'btn btn-secondary';
btn.innerHTML = 'Create';
btn.onclick = () => {
    day.meals.push(new Meal(getValue(`name-input-${day.id}`), getValue(`eating-input-${day.id}`)));
    drawDOM();
    };
    return btn;
}

//create the table for the each day created
function createDayTable(day) {
    console.log("inside createDayTable");
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let eatingColumn = document.createElement('th');
    nameColumn.innerHTML = 'Which Meal Time';
    eatingColumn.innerHTML = 'What Your Having';
    row.appendChild(nameColumn);
    row.appendChild(eatingColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let eatingTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${day.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let eatingInput = document.createElement('input');
    eatingInput.setAttribute('id', `eating-input-${day.id}`);
    eatingInput.setAttribute('type', 'text');
    eatingInput.setAttribute('class', 'form-control');
    let newMealButton = createNewMealButton(day);
    nameTh.appendChild(nameInput);
    eatingTh.appendChild(eatingInput);
    createTh.appendChild(newMealButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(eatingTh);
    formRow.appendChild(createTh);
    return table;
}

//clear elements
function clearElement(element) {
    console.log("inside clearElement");
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}