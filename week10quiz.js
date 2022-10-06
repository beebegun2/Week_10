

function addNewP(){


let pdiv = document.getElementById("p-div");
// console.log(pdiv.outerText);
let newP = pdiv.appendChild(document.createElement("P"));

let inputText = document.getElementById("p-input").value;

newP.innerText = inputText;
}

let pButton = document.getElementById("p-button");
pButton.addEventListener("click", (event) => {
    addNewP();
});









// onClick('new-p', () => {
// 	div.push(new P(pId++, getValue('new-p-name')));
//     drawDOM();
// });
// function onClick(id, action) {
// let element = document.getElementById(id);
// Element.addEventListener('click', action);
// return element;
// }
// function getValue(id) {
// return document.getElementById(id).value;
// }


// function clearElement(element) {
//     while(element.firstChild) {
//         element.removeChild(element.firstChild);