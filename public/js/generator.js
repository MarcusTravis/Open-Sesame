//Array of special characters to be included in password
const characters = [
  "@",
  "%",
  "!",
  "#",
  "$",
  "?",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
//declare generate button to refer back to generate id
const generateBtn = document.querySelector("#generate");

//Starter code
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
  let password = "";
  let passwordLength = 10;
  //Create for loop to get random password from character arrays
  for (i = 0; i < passwordLength; i++) {
    password += getRandomValue(characters);
  }
  return password;
}
//create function to get random value from character array
function getRandomValue(characters) {
  let randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

const copy = () => {
  const copyText = document.querySelector("#password");
  copyText.select();
  document.execCommand("copy");
  alert("Your password has been copied to the clipboard.");
};
