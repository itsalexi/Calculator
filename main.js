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
let calculated = false;

function display(type, value) {
  if (secondNumber == 0 || firstNumber == 0) {
    if (value == "/" && nextOperation == true) {
      alert("Stop dividing by 0!");
      return;
    }
  }

  if (type == "operation") {
    if (nextOperation == true && lastOperation != "") {
      console.log("THEY MET!");
      result = round(operate(lastOperation, firstNumber, secondNumber), 12);
      currentDisplay.textContent = result;
      lastDisplay.textContent = `${result} ${value}`;
      firstNumber = result;
      secondNumbers = [];
      lastOperation = value;
    } else {
      lastOperation = value;
      lastDisplay.textContent = `${firstNumber} ${lastOperation}`;
      nextOperation = true;
    }
  } else if (type == "number") {
    calculated = false;
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
  } else if (type == "setting") {
    if (value == "clear") {
      clear();
      console.log("triggered clear?");
    } else if (value == "back") {
      if (nextOperation == false && calculated != true) {
        back(firstNumbers);
        firstNumber = firstNumbers.join("");
        currentDisplay.textContent = firstNumber;
        console.log("triggered first?");
      } else {
        back(secondNumbers);
        secondNumber = secondNumbers.join("");
        currentDisplay.textContent = secondNumber;
        console.log("triggered second?");
      }
    } else if (value == "=") {
      if (secondNumber == 0 || firstNumber == 0) {
        if (lastOperation == "/" && nextOperation == true) {
          alert("Stop dividing by 0!");
          return;
        }
      }

      result = round(operate(lastOperation, firstNumber, secondNumber), 12);
      currentDisplay.textContent = result;
      lastDisplay.textContent = `${firstNumber} ${lastOperation} ${secondNumber} =`;
      firstNumber = result;
      secondNumber = result;
      secondNumbers = [];
      firstNumbers = Array.from(String(firstNumber));

      calculated = true;
      nextOperation = false;
    } else if (value == ".") {
      if (nextOperation == false && calculated != true) {
        addDot(firstNumbers);
        firstNumber = firstNumbers.join("");
        currentDisplay.textContent = firstNumber;
      } else {
        addDot(secondNumbers);
        secondNumber = secondNumbers.join("");
        currentDisplay.textContent = secondNumber;
      }
    }
  }
}

function clear() {
  firstNumber = 0;
  secondNumber = 0;
  firstNumbers = [];
  secondNumbers = [];
  lastOperation = "";
  result = "";
  nextOperation = false;
  currentDisplay.textContent = "0";
  lastDisplay.textContent = "";
}

function round(num, dec) {
  return Number(Math.round(num + "e" + dec) + "e-" + dec);
}

function addDot(array) {
  if (array.includes(".")) return;
  if (array.includes("0.")) return;

  if (array.length == 0) {
    array.push("0.");
    return;
  }
  array.push(".");
}

function back(array) {
  debug = array.pop();
  console.log(debug);
}

document.addEventListener("click", selectInput);
