'use strict';
var tempPercent;
var elSurvey = document.getElementById('survey');
var elBegin = document.getElementById('begin');
var elResults = document.getElementById('results');
var canvas = document.getElementById('chartArea').getContext('2d');
var canvasPercent = document.getElementById('percentArea').getContext('2d');

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
  this.name = name.slice(0, (name.length - 4));
  this.filepath = 'img/' + name;
  this.tallyClicked = 0;
  this.tallyDisplayed = 0;
  this.percentClicked = 0;
  surveyItemList.push(this);
}
//*********************************
if (!localStorage.busmall){
  for (var i = 0; i < startingArrayList.length; i++) {
    new SurveyItem(startingArrayList[i]);
  }
}else{
  surveyItemList = JSON.parse(localStorage.busmall);
}
//*********************************
//***********Functions*************
function updateButtonStyle() {
  elBegin.style.display = 'none';
  elResults.style.display = 'inline';
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
function displayImageChoices() {
  document.getElementById('image1').src = toBeDisplayed[0].filepath;
  document.getElementById('image2').src = toBeDisplayed[1].filepath;
  document.getElementById('image3').src = toBeDisplayed[2].filepath;
  updateTallyDisplayed();
}
//*********************************
function updateTallyDisplayed() {
  for (var k = 0; k < 3; k++) {
    toBeDisplayed[k].tallyDisplayed += 1;
  }
}
//*********************************
function validClick() {
  if (event.target.id !== 'survey') {
    return true;
  } else return false;
}
//*********************************
function updateTallyClicked(target) {
  if (target === 'image1') {
    toBeDisplayed[0].tallyClicked += 1;
    toBeDisplayed[0].percentClicked = ((toBeDisplayed[0].tallyClicked / toBeDisplayed[0].tallyDisplayed) * 100).toFixed(2);
  }
  if (target === 'image2') {
    toBeDisplayed[1].tallyClicked += 1;
    toBeDisplayed[1].percentClicked = ((toBeDisplayed[1].tallyClicked / toBeDisplayed[1].tallyDisplayed) * 100).toFixed(2);
  }
  if (target === 'image3') {
    toBeDisplayed[2].tallyClicked += 1;
    toBeDisplayed[2].percentClicked = ((toBeDisplayed[2].tallyClicked / toBeDisplayed[2].tallyDisplayed) * 100).toFixed(2);
  }
}
//*********************************
function calcTotalClicks() {
  clickCount += 1;
  if (clickCount === maxClicks) {
    elResults.className = '';
    removeListener();
    addListener();
    clearImagesOnScreen();
    clearDisplayArray();
  }
}
//*********************************
function removeListener() {
  elSurvey.removeEventListener('click', handleClick);
}
//*********************************
function addListener() {
  elResults.addEventListener('click', handleClickResults);
}
//*********************************
function clearImagesOnScreen() {
  document.getElementById('image1').src = 'img/game_over.png';
  document.getElementById('image2').src = 'img/game_over2.jpg';
  document.getElementById('image3').src = 'img/game_over.jpg';
}
//*********************************
function clearDisplayArray() {
  for (var j = 0; j < toBeDisplayed.length; j++) {
    surveyItemList.push(toBeDisplayed[j]);
  }
}
//*********************************
function sortPercent() {

  surveyItemList.sort(function(a, b) {
    var percentA = a.percentClicked;
    var percentB = b.percentClicked;
    if (percentA < percentB)
      return 1;

    if (percentA > percentB)
      return -1;

    return 0;
  });
  for (var i = 0; i < 5; i++) {
    percentTitles[i] = surveyItemList[i].name;
    percents[i] = surveyItemList[i].percentClicked;
  }
}
//*********************************
function sortNames() {
  surveyItemList.sort(function(a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB)
      return -1;

    if (nameA > nameB)
      return 1;

    return 0;
  });
}
//**********Canvas stuff***********
var titles = [];
var votes = [];
var percentTitles = [];
var percents = [];


function drawChart() {
  new Chart(canvas, {
    type: 'bar',
    // type: 'polarArea',
    // type: 'radar',
    data: data,
    options: {
      responsive: false,
      title: {
        display: true,
        text: 'My Chart'
      },
      legend: {
        display: false
      }
    }
  });
}

function drawPercentChart() {
  new Chart(canvasPercent, {
    type: 'bar',
    // type: 'polarArea',
    // type: 'radar',
    data: dataPercent,
    options: {
      responsive: false,
      title: {
        display: true,
        text: 'Top 5 by percentage'
      },
      legend: {
        display: false
      }
    }
  });
}

var dataPercent = {
  labels: percentTitles,
  datasets: [
    {
      data: percents,
      backgroundColor: [
        'rgba(255,0,0,0.4)',
        'rgba(220,20,60,0.4)',
        'rgba(222,184,135,0.4)',
        'rgba(107,142,35,0.4)',
        'rgba(0,0,128,0.4)'
      ],
      borderColor: [
        'rgba(255,0,0,1)',
        'rgba(220,20,60,1)',
        'rgba(222,184,135,1)',
        'rgba(107,142,35,1)',
        'rgba(0,0,128,1)'
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        'purple',
        'purple',
        'purple',
        'purple',
        'purple'
      ]
    }]
};

var data = {
  labels: titles, // titles array we declared earlier
  datasets: [
    {
      data: votes, // votes array we declared earlier
      backgroundColor: [
        'rgba(255,228,196,0.4)',
        'rgba(220,20,60,0.4)',
        'rgba(222,184,135,0.4)',
        'rgba(107,142,35,0.4)',
        'rgba(0,0,128,0.4)',
        'rgba(210,105,30,0.4)',
        'rgba(255,0,0,0.4)',
        'rgba(34,139,34,0.4)',
        'rgba(0,255,127,0.4)',
        'rgba(107,142,35,0.4)',
        'rgba(210,105,30,0.4)',
        'rgba(128,0,0,0.4)',
        'rgba(0,128,128,0.4)',
        'rgba(255,127,80,0.4)',
        'rgba(210,105,30,0.4)',
        'rgba(165,42,42,0.4)',
        'rgba(255,20,147,0.4)',
        'rgba(0,0,139,0.4)',
        'rgba(139,69,19,0.4)',
        'rgba(112,128,144,0.4)'
      ],
      borderColor: [
        'rgba(255,228,196,1)',
        'rgba(220,20,60,1)',
        'rgba(222,184,135,1)',
        'rgba(107,142,35,1)',
        'rgba(0,0,128,1)',
        'rgba(210,105,30,1)',
        'rgba(255,0,0,1)',
        'rgba(34,139,34,1)',
        'rgba(0,255,127,1)',
        'rgba(107,142,35,1)',
        'rgba(210,105,30,1)',
        'rgba(128,0,0,1)',
        'rgba(0,128,128,1)',
        'rgba(255,127,80,1)',
        'rgba(210,105,30,1)',
        'rgba(165,42,42,1)',
        'rgba(255,20,147,1)',
        'rgba(0,0,139,1)',
        'rgba(139,69,19,1)',
        'rgba(112,128,144,1)'
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
      ]
    }]
};
//*********************************

function getChartData() {
  for (var i = 0; i < surveyItemList.length; i++) {
    titles[i] = surveyItemList[i].name;
    votes[i] = surveyItemList[i].tallyClicked;
    percents[i] = surveyItemList[i].percentClicked;
  }
  console.log(titles);
}
//********Event Handlers***********
function handleClickBegin() {
  event.preventDefault();
  updateButtonStyle();
  getRandomImage();
}

function handleClick() {
  if (!validClick(event.target.id)) {
    return alert('Click on an image.');
  }
  updateTallyClicked(event.target.id);
  getRandomImage();
  calcTotalClicks();
  localStorage.setItem('busmall', JSON.stringify(surveyItemList));
}

function handleClickResults() {
  // for (var i = 0; i < surveyItemList.length; i++) {
  // }
  sortNames();
  getChartData();
  drawChart();
  sortPercent();
  drawPercentChart();
}
//********Event Listeners**********
elSurvey.addEventListener('click', handleClick);
elBegin.addEventListener('click', handleClickBegin);
