'use strict';

var elSurvey = document.getElementById('survey');
var elBegin = document.getElementById('begin');
var elResults = document.getElementById('results');
var startingArrayList = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
var surveyItemList = [];
var toBeDisplayed = [];
var clickCount = 0;
var maxClicks = 25;

// Constructor for object
function SurveyItem(name) {
  this.name = name;
  this.filepath = 'img/' + name;
  this.tallyClicked = 0;
  this.tallyDisplayed = 0;
  surveyItemList.push(this);
};
//*********************************
for (var i = 0; i < startingArrayList.length; i++) {
  new SurveyItem(startingArrayList[i]);
}
//*********************************
function displayImageChoices() {
  document.getElementById('image1').src = toBeDisplayed[0].filepath;
  document.getElementById('image2').src = toBeDisplayed[1].filepath;
  document.getElementById('image3').src = toBeDisplayed[2].filepath;
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
elSurvey.addEventListener('click', handleClick);
elBegin.addEventListener('click', handleClickBegin);
elResults.addEventListener('click', handleClickResults);
