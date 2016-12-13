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
  // console.log(toBeDisplayed.length,'toBeDisplayed length before returnChoice');
  returnChoice();
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
function returnChoice() {
  if (toBeDisplayed.length > 3) {
    // console.log('entered returnChoice');
    for (var j = toBeDisplayed.length - 1; j >= 3; j--) {
      // console.log(j,'value of J');
      surveyItemList.push(toBeDisplayed[j]);
      toBeDisplayed.pop();
      // console.log(toBeDisplayed.length,'toBeDisplayed length (after pop)');
    }
  }
  // console.log(toBeDisplayed,'toBeDisplayed outside returnChoice');
}
//*********************************
for (var i = 0; i < startingArrayList.length; i++) {
  var temp = new SurveyItem(startingArrayList[i][0],startingArrayList[i][1]);
  surveyItemList.push(temp);
}
//*********************************
function updateTallyClicked(target) {
  if (target === 'image1') {
    toBeDisplayed[0].tallyClicked += 1;
  }
  if (target === 'image2') {
    toBeDisplayed[1].tallyClicked += 1;
  }
  if (target === 'image3') {
    toBeDisplayed[2].tallyClicked += 1;
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
function handleClick() {
  console.log(event.target.id);
  updateTallyClicked(event.target.id);
  // getRandomImage();
}
//*********************************
function handleClickBegin() {
  event.preventDefault();

  // console.log(surveyItemList.length);
  // console.log(toBeDisplayed.length,'toBeDisplayed length beginning');
  getRandomImage();
  // displayImageChoices(toBeDisplayed);
  elBegin.style.display = 'none';
  elResults.style.display = 'inline';
}
//*********************************

elSurvey.addEventListener('click', handleClick);
elBegin.addEventListener('click', handleClickBegin);
// elResults.addEventListener('click', handleClickResults);
