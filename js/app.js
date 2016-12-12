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
var surveyItemList = [];


// Constructor for object
function SurveyItem(itemName, itemExt) {
  this.name = itemName;
  this.extension = itemExt;
  this.filepath = 'img/' + itemName + itemExt;
  this.tallyClicked = 0;
  this.tallyDisplayed = 0;
};
//*********************************
function displayImageChoices(toBeDisplayed) {
  var tempVar = surveyItemList[0].filepath;
  // console.log(tempVar);
  var firstImage = document.getElementById('image1').src = tempVar;
  var secondImage = document.getElementById('image2');
  var thirdImage = document.getElementById('image3');
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

// survey.addEventListener('click', handleClick);
