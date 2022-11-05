import { wordArr } from "./wordsArr.js";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Ran50() {
  var newList = [];
  let count = 0;
  while (count <= 50) {
    newList[count] = wordArr[randomIntFromInterval(0, 1000)];
    count++;
  }
  return newList;
}

function convertHTML(a) {
  let count = 0;
  var code = "";
  while (count <= 50) {
    let num = 0;
    code += '<div class="word">' + "\n";
    while (num < a[count].length) {
      code +=
        '          <span class="letter">' + a[count][num] + "</span>" + "\n";
      num++;
    }
    code += '<div class="space">&ensp;</div>' + "\n";
    count++;
  }
  return code;
}

let el = document.getElementById("text");
el.innerHTML = convertHTML(Ran50());
