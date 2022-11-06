import { wordArr } from "./wordsArr.js";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Ran50() {
  var newList = [];
  let count = 0;
  while (count <= 50) {
    newList[count] = wordArr[randomIntFromInterval(0, 1900)];
    count++;
  }
  return newList;
}

function convertHTML(a, typeCount, wrongIndex) {
  let count = 0;
  let letterCount = 0;
  var code = "";
  while (count <= 50) {
    let num = 0;
    if (count == 50) {
      code += "<br>";
      code += `<div class="word" >` + "\n";
      code += '<span class="letter" hidden>m</span></div>';
      break;
    }
    code += `<div class="word" >` + "\n";
    while (num < a[count].length) {
      code +=
        `<span class="letter ${
          typeCount >= letterCount ? "letterCorrect" : ""
        } ${wrongIndex.includes(letterCount) ? "letterWrong" : ""}">` +
        a[count][num] +
        "</span>" +
        "\n";
      num++;
      letterCount++;
    }
    code += '</div><div class="space">&ensp;</div>' + "\n";
    letterCount++;
    count++;
    if (count % 9 == 0) {
      code += "<br>";
    }
  }
  return code;
}

function renderWords(html) {
  let el = document.getElementById("text");

  el.innerHTML = html;
}

let wordsList = Ran50();
let wps = 0;
let wordsString = wordsList.join(" ");
let time = 0.5;
let typeCount = 0;
let wrongIndex = [];
let wordCount = 0;
let trueWordCount = 0;
let newWord = true;
let timer;

document.addEventListener("keydown", (e) => {
  if (wordsString[typeCount] == e.key && wordsString[typeCount] == " ") {
    wordCount++;
  }
  if (wordsString[typeCount] == " ") {
    trueWordCount++;
  }

  if (e.key == " ") {
    newWord = true;
  }
  if (newWord == true && e.key != wordsString[typeCount] && wordCount > 0) {
    wordCount--;
    newWord = false;
  }
  if (wordsString[typeCount] != e.key) {
    wrongIndex.push(typeCount);
  }

  renderWords(convertHTML(wordsList, typeCount, wrongIndex));
  typeCount++;
  if (trueWordCount == 50) {
    clearInterval(timer);
    renderWords("");
    time = time / 60;
    wps = wordCount / time;
    wps = parseInt(wps);
    let scoreEl = document.getElementById("scoreNum");
    console.log(scoreEl);
    scoreEl.innerHTML = wps.toString() + " WPM";
    console.log(wps);
    trueWordCount++;
  }
  // console.log(time);
  // console.log(trueWordCount);
  // console.log(wordCount);
  // console.log(typeCount);
  // console.log(wrongIndex);
});

async function init() {
  let startTime = 3;

  let startDiv = document.getElementById("start");
  while (startTime > 0) {
    await new Promise((r) => setTimeout(r, 1000));
    startDiv.innerHTML = startTime;
    startTime--;
  }
  startDiv.innerHTML = "";

  renderWords(convertHTML(wordsList, null, []));
  timer = setInterval(() => {
    time++;
  }, 1000);
}

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);
