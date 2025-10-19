const reset = () => {
  inputField.innerHTML = "0";
};
const isNotNull = (argumnet) => {
  let bufferList = [];
  for (let i = 0; i < argumnet.length; i++)
    if (argumnet[i] != null) {
      bufferList.push(argumnet[i]);
    }
  return bufferList;
};
const handleOperation = (operator, argumnet1, argumnet2) => {
  switch (operator) {
    case "x": {
      return argumnet1 * argumnet2;
    }
    case "/": {
      return argumnet1 / argumnet2;
    }
    case "-": {
      return argumnet1 - argumnet2;
    }
    case "+": {
      return argumnet1 + argumnet2;
    }
  }
};

const calculate = () => {
  let expression = inputField.innerHTML;
  if (operatorsList.includes(expression[expression.length - 1])) return 1;
  let myArgumnets = expression.split(operatorSeparators);
  for (let i = 0; i < myArgumnets.length; i++)
    myArgumnets[i] = Number(myArgumnets[i]);
  if (expression[0] == "-") {
    myArgumnets[1] *= -1;
    myArgumnets.shift();
  }
  expression = expression.substring(1, expression.length - 1);

  let count = 0;
  for (let i = 0; i < expression.length; i++) {
    if ("/x".includes(expression[i])) {
      myArgumnets[count] = handleOperation(
        expression[i],
        myArgumnets[count],
        myArgumnets[count + 1]
      );
      myArgumnets[count + 1] = null;
      myArgumnets = isNotNull(myArgumnets);
    } else if ("+-".includes(expression[i])) count++;
  }

  for (let i = 0; i < expression.length; i++) {
    if ("+-".includes(expression[i])) {
      myArgumnets[0] = handleOperation(
        expression[i],
        myArgumnets[0],
        myArgumnets[1]
      );
      myArgumnets[1] = null;
      myArgumnets = isNotNull(myArgumnets);
    }
  }

  inputField.innerHTML = Math.round(myArgumnets[0] * 100000) / 100000.0;
};

const deleteLastSymbol = () => {
  let expression = inputField.innerHTML;
  if (expression == "Infinity") inputField.innerHTML = "0";
  else if (expression != "0") {
    if (expression.length != 1)
      expression = expression.substring(0, expression.length - 1);
    else expression = 0;
    inputField.innerHTML = expression;
  }
};

const handleOperrator = (operator) => {
  let lastSymbol = inputField.innerHTML.charAt(inputField.innerHTML.length - 1);
  if (!(operatorsList.includes(lastSymbol) || lastSymbol === "."))
    inputField.innerHTML += operator;
};

const handleNumber = (number) => {
  if (inputField.innerHTML == "0") {
    inputField.innerHTML = "";
  }
  inputField.innerHTML += number;
};
const handleDot = () => {
  let input = inputField.innerHTML.split(operatorSeparators);
  let lastWord = input[input.length - 1];

  if (!lastWord.includes(".")) {
    {
      if (lastWord.length == 0) inputField.innerHTML += "0.";
      else inputField.innerHTML += ".";
    }
  }
};
const handleButton = (button) => {
  if (operatorsList.includes(button.innerHTML))
    handleOperrator(button.innerHTML);
  if (numbersList.includes(button.innerHTML)) handleNumber(button.innerHTML);
  if (button.innerHTML == ".") handleDot();
};
const changeTheme = () => {
  body.classList.remove("theme" + theme);
  themeSwitch.classList.remove("theme" + theme);
  theme++;
  theme %= 3;
  body.classList.add("theme" + theme);
  themeSwitch.classList.add("theme" + theme);
};

const body = document.body;
const operatorsList = "x/-+";
const operatorSeparators = /[x+/-]/;
const numberSeparators = /[1234567890.]/;
const numbersList = "1234567890";
let theme = 0;
let themeSwitchField = document.getElementById("themeSwitchField");
let themeSwitch = document.getElementById("themeSwitch");
let delButton = document.getElementById("delButton");
let equalsButton = document.getElementById("equalsButton");
let inputField = document.getElementById("inputField");
let resetButton = document.getElementById("resetButton");
let buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
  if (
    !(
      buttons[i].className == "del-button" ||
      buttons[i].className == "reset-button" ||
      buttons[i].className == "equals-button"
    )
  )
    buttons[i].addEventListener("click", () => handleButton(buttons[i]));
}

resetButton.addEventListener("click", reset);
equalsButton.addEventListener("click", calculate);
delButton.addEventListener("click", deleteLastSymbol);
themeSwitchField.addEventListener("click", changeTheme);
