'use strict';

var startingArrayList = [
  ['bag', '.jpg'],
  ['banana', '.jpg'],
  ['bathroom', '.jpg'],
  ['boots', '.jpg'],
  ['breakfast', '.jpg'],
  ['bubblegum', '.jpg'],
  ['chair', '.jpg'],
  ['cthulhu', '.jpg'],
  ['dog-duck', '.jpg'],
  ['dragon', '.jpg'],
  ['pen', '.jpg'],
  ['pet-sweep', '.jpg'],
  ['scissors', '.jpg'],
  ['shark', '.jpg'],
  ['sweep', '.png'],
  ['tauntaun', '.jpg'],
  ['unicorn', '.jpg'],
  ['usb', '.gif'],
  ['water-can', '.jpg'],
  ['wine-glass', '.jpg']
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
function displayImageChoices(toBeDisplayed) {
  var tempVar = surveyItemList[0].filepath;
  document.getElementById('image1').src = tempVar;
  tempVar = surveyItemList[1].filepath;
  document.getElementById('image2').src = tempVar;
  tempVar = surveyItemList[2].filepath;
  document.getElementById('image3').src = tempVar;
}

//*********************************
function getRandomImage() {  //Generates random number to select an item from surveyItemList array.
  for (var i = 0; i < 3; i++) {
    var tempRand = Math.floor(Math.random() * surveyItemList.length);
    console.log(tempRand);
  }
}
//*********************************
function moveChoices() {    //Moves currently displayed images from surveyItemList array to toBeDisplayed array.

}
//*********************************
function returnChoices() {  //Returns previous choices back to surveyItemList array.

}
//*********************************
for (var i = 0; i < startingArrayList.length; i++) {
  var temp = new SurveyItem(startingArrayList[i][0],startingArrayList[i][1]);
  // console.log(startingArrayList[i][0],'SurveyItemArr');
  // console.log(temp,'temp');
  surveyItemList.push(temp);
  // console.log(surveyItemList[i],'surveyItemList');
}
//*********************************
function handleClickBegin() {
  displayImageChoices(toBeDisplayed);
  elBegin.display = none;     //This is not working yet. Needs to hide one button and display the other.
  elResults.display = block;
}
//*********************************

// elSurvey.addEventListener('click', handleClick);
elBegin.addEventListener('click', handleClickBegin);
// elResults.addEventListener('click', handleClickResults);
