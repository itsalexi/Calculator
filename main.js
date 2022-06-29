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
    return add(a, b);
  } else if (sign == "-") {
    return subtract(a, b);
  } else if (sign == "*") {
    return multiply(a, b);
  } else if (sign == "/") {
    return divide(a, b);
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
  } else {
    return;
  }

  console.log(id);
  console.log(input);
}

document.addEventListener("click", selectInput);
