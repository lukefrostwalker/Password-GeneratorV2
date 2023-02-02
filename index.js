const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
const numbers = '0123456789'.split('');
const symbols = '!@#$%^&*()_+-=[]{}|;\':"<>,.?/'.split('');
const ambiguous = '{}[]()/\'"`~,;:.<>'.split('');
const similar = 'iI1loO0'.split('');

let characters = [];
let syms = [];
let hasGenerated = false;

let uppercaseBox = document.getElementById('uppercase');
let lowercaseBox = document.getElementById('lowercase');
let numbersBox = document.getElementById('numbers');
let symbolsBox = document.getElementById('symbols');
let avoidBox = document.getElementById('avoid');
let similarBox = document.getElementById('similar');
let passwordLength = document.getElementById('passwordLength');

let passwordOne = document.getElementById('passwordOne');
let passwordTwo = document.getElementById('passwordTwo');
let tooltipOne = document.getElementById('myTooltipOne');
let tooltipTwo = document.getElementById('myTooltipTwo');

function generatePasswords() {
  if (!hasGenerated) {
    if (uppercaseBox.checked) {
      characters.push(...uppercase);
    }
    if (lowercaseBox.checked) {
      characters.push(...lowercase);
    }
    if (numbersBox.checked) {
      characters.push(...numbers);
    }
    if (symbolsBox.checked && avoidBox.checked) {
      syms.push(...symbols);
      filtered = syms.filter((char) => !ambiguous.includes(char));
      syms = [];
      syms.push(...filtered);
      characters.push(...syms);
    } else if (symbolsBox.checked) {
      characters.push(...symbols);
    }
    if (similarBox.checked) {
      filtered = characters.filter((char) => !similar.includes(char));
      characters = [];
      characters.push(...filtered);
      console.log(characters);
    }
    console.log(characters);

    if (characters.length === 0) {
      alert('Please select at least one character set');
      return;
    }

    for (let i = 0; i < passwordLength.value; i++) {
      let randomizer1 = Math.floor(Math.random() * characters.length);
      let randomizer2 = Math.floor(Math.random() * characters.length);
      passwordOne.value += characters[randomizer1];
      passwordTwo.value += characters[randomizer2];
    }
    hasGenerated = true;
  } else {
    syms = [];
    characters = [];
    passwordOne.value = '';
    passwordTwo.value = '';
    hasGenerated = false;
    generatePasswords();
  }
}

function copyOne() {
  passwordOne.select();
  passwordOne.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(passwordOne.value);

  if (!passwordOne.value) {
    tooltipOne.innerHTML = 'Generate first';
  } else {
    tooltipOne.innerHTML = 'Copied';
  }
}

function outFuncOne() {
  tooltipOne.innerHTML = 'Copy to clipboard';
}

function copyTwo() {
  passwordTwo.select();
  passwordTwo.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(passwordTwo.value);

  if (!passwordTwo.value) {
    tooltipTwo.innerHTML = 'Generate first';
  } else {
    tooltipTwo.innerHTML = 'Copied';
  }
}

function outFuncTwo() {
  tooltipTwo.innerHTML = 'Copy to clipboard';
}
