currentDisplay = document.querySelector(".next");
lastDisplay = document.querySelector(".last");

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(sign, a, b) {
  if (sign == "+") {
    return add(+a, +b);
  } else if (sign == "-") {
    return subtract(+a, +b);
  } else if (sign == "*") {
    return multiply(+a, +b);
  } else if (sign == "/") {
    return divide(+a, +b);
  }
}

function selectInput(e) {
  if (e.target.tagName !== "BUTTON") return;
  let id = e.target.id;
  let element = e.target;
  if (id == "number") {
    input = element.getAttribute("data-number");
  } else if (id == "operation") {
    input = element.getAttribute("data-operation");
  } else if (id == "setting") {
    input = element.getAttribute("data-setting");
  } else {
    return;
  }
  display(id, input);

  console.log(id);
  console.log(input);
}

let nextOperation = false;

let firstNumbers = [];
let secondNumbers = [];
let lastOperation = "";

let firstNumber = 0;
let secondNumber = 0;

function display(type, value) {
  if (type == "operation") {
    if (nextOperation == true && lastOperation != "") {
      if (secondNumber == 0) {
        alert("Stop dividing by 0!");
        return;
      }
      console.log("THEY MET!");
      result = operate(lastOperation, firstNumber, secondNumber);
      currentDisplay.textContent = result;
      lastDisplay.textContent = `${result} ${value}`;
      firstNumber = result;
      secondNumbers = [];
      secondNumber = result;
      lastOperation = value;
    } else {
      nextOperation = true;
      lastOperation = value;
    }
  } else if (type == "number") {
    if (nextOperation == false) {
      firstNumbers.push(value);
      firstNumber = firstNumbers.join("");
      currentDisplay.textContent = firstNumber;
    } else {
      secondNumbers.push(value);
      secondNumber = secondNumbers.join("");
      currentDisplay.textContent = secondNumber;
      lastDisplay.textContent = `${firstNumber} ${lastOperation}`;
    }
  }
}

document.addEventListener("click", selectInput);
