// const lowercase = (value) => {
function lowercase(value) {
  if (!value) return;
  else if (typeof value === "string") return value.toLowerCase();
  else if (Array.isArray(value)) return value.map((v) => v.toLowerCase());
  // else return value
}

function meow() {
    return 'meow'
}

// str0 > str1 if it comes later in the alphabet
// returns 1 if if str0 < str1; 2 if str0 > str1; 0 if str0 == str1
function compareStr(str0, str1) {
  const strA = str0.toLowerCase();
  const strB = str1.toLowerCase();

  if (strA < strB) return 1;
  if (strA > strB) return -1;
  else return 0;
}

// returns 1 if if num0 > num1; 2 if num0 < num1; 0 if num0 == num1
function compareNum(num0, num1) {
  return num0 - num1;
}

function compareDate(date0, date1) {
  return new Date(date0) - new Date(date1)
}

module.exports = {lowercase, meow, compareNum, compareDate, compareStr}