'use strict';

var startingArrayList = [
  ['bag', '.jpg'],        // 0
  ['banana', '.jpg'],     // 1
  ['bathroom', '.jpg'],   // 2
  ['boots', '.jpg'],      // 3
  ['breakfast', '.jpg'],  // 4
  ['bubblegum', '.jpg'],  // 5
  ['chair', '.jpg'],      // 6
  ['cthulhu', '.jpg'],    // 7
  ['dog-duck', '.jpg'],   // 8
  ['dragon', '.jpg'],     // 9
  ['pen', '.jpg'],        // 10
  ['pet-sweep', '.jpg'],  // 11
  ['scissors', '.jpg'],   // 12
  ['shark', '.jpg'],      // 13
  ['sweep', '.png'],      // 14
  ['tauntaun', '.jpg'],   // 15
  ['unicorn', '.jpg'],    // 16
  ['usb', '.gif'],        // 17
  ['water-can', '.jpg'],  // 18
  ['wine-glass', '.jpg']  // 19
];
var elSurvey = document.getElementById('survey');
var elBegin = document.getElementById('begin');
var elResults = document.getElementById('results');
var surveyItemList = [];
var toBeDisplayed = [];
var clickCount = 0;
var maxClicks = 25;
// Constructor for object
function SurveyItem(name, ext) {
  this.name = name;
  this.extension = ext;
  this.filepath = 'img/' + name + ext;
  this.tallyClicked = 0;
  this.tallyDisplayed = 0;
};
//*********************************
function displayImageChoices() {
  var tempVar = toBeDisplayed[0].filepath;
  document.getElementById('image1').src = tempVar;
  tempVar = toBeDisplayed[1].filepath;
  document.getElementById('image2').src = tempVar;
  tempVar = toBeDisplayed[2].filepath;
  document.getElementById('image3').src = tempVar;
  updateTallyDisplayed();
}

//*********************************
function getRandomImage() {  //Generates random number to select an item from surveyItemList array.
  for (var i = 0; i < 3; i++) {
    var tempRand = Math.floor(Math.random() * surveyItemList.length);
    moveChoice(tempRand);
  }
  replaceChoice();
  displayImageChoices();
}
//*********************************
//Use the unShift() array method to place the new item at the beginning of the toBeDisplayed array.
//Moves currently displayed images from surveyItemList array to toBeDisplayed array.
function moveChoice(position) {
  toBeDisplayed.unshift(surveyItemList[position]);
  surveyItemList.splice(position, 1);
}
//*********************************
//Returns previous choices back to surveyItemList array.
//Use the pop() method to remove the last item from toBeDisplayed. Use push() to add it back to surveyItemList.
function replaceChoice() {
  if (toBeDisplayed.length > 3) {
    for (var j = toBeDisplayed.length - 1; j >= 3; j--) {
      surveyItemList.push(toBeDisplayed[j]);
      toBeDisplayed.pop();
    }
  }
}
//*********************************
function updateTallyClicked(target) {
  if (target === 'image1') {
    toBeDisplayed[0].tallyClicked += 1;
    console.log(toBeDisplayed[0].name + ' has been clicked.');
  }
  if (target === 'image2') {
    toBeDisplayed[1].tallyClicked += 1;
    console.log(toBeDisplayed[1].name + ' has been clicked.');
  }
  if (target === 'image3') {
    toBeDisplayed[2].tallyClicked += 1;
    console.log(toBeDisplayed[2].name + ' has been clicked.');
  }
}
//*********************************
function updateTallyDisplayed() {
  for (var k = 0; k < 3; k++) {
    toBeDisplayed[k].tallyDisplayed += 1;
    console.log(toBeDisplayed[k].tallyDisplayed);
  }
}
//*********************************
function calcTotalClicks() {
  clickCount += 1;
  if (clickCount === maxClicks) {
    elResults.className = '';
    removeListener();
    clearDisplayArray();
    // move the rest of toBeDisplayed back into surveyItemList.
  }
}
//*********************************
function clearDisplayArray() {
  for (var j = 0; j < toBeDisplayed.length; j++) {
    surveyItemList.push(toBeDisplayed[j]);
  }
}
//*********************************
function removeListener() {
  elSurvey.removeEventListener('click', handleClick);
}
//*********************************
function handleClickBegin() {
  event.preventDefault();
  getRandomImage();
  updateButtonStyle();
}
//*********************************
function handleClick() {
  updateTallyClicked(event.target.id);
  getRandomImage();
  calcTotalClicks();
}
//*********************************
function handleClickResults() {
  for (var i = 0; i < surveyItemList.length; i++) {
    document.write(surveyItemList[i].name + ' was clicked ' + surveyItemList[i].tallyClicked + ' times.');
  }
}
//*********************************
function updateButtonStyle() {
  elBegin.style.display = 'none';
  elResults.style.display = 'inline';
}
//*********************************
for (var i = 0; i < startingArrayList.length; i++) {
  var temp = new SurveyItem(startingArrayList[i][0],startingArrayList[i][1]);
  surveyItemList.push(temp);
}
//*********************************
elSurvey.addEventListener('click', handleClick);
elBegin.addEventListener('click', handleClickBegin);
elResults.addEventListener('click', handleClickResults);
