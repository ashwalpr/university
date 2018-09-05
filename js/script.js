/********************************
    update header on scroll
*********************************/
var mainHeader = document.getElementById('mainHeader');
var white = document.getElementById('white');
window.addEventListener('scroll', function() {
  if(window.scrollY > 100) {
    mainHeader.classList.add('active');

  } else {
    mainHeader.classList.remove('active');
  }
});
/*************************************
            Search icon
***************************************/
document.getElementById('searchIcon').onclick = function() {
  document.getElementById('search').classList.add("visible");
  document.getElementById('clear').classList.add("visible");
  document.getElementById('search').focus();
  document.getElementById('searchIcon').classList.add("hide");
}
document.getElementById('clear').onclick = function() {
  document.getElementById('searchIcon').classList.remove("hide");
  document.getElementById('search').classList.remove("visible");
  document.getElementById('clear').classList.remove("visible");
}
/**************************************
                toggle
**************************************/
document.getElementById('toggleMobileNav').addEventListener('click',function() {
  if(document.getElementById('mainnav').classList.contains('open')){
    document.getElementById('mainnav').classList.remove('open');
  } else {
    document.getElementById('mainnav').classList.add('open');
  }
});

/****************************************
                slider div
******************************************/
$('#right-button').click(function(event) {
  event.preventDefault();
  $('#content').animate({
    scrollLeft: "+=293px"
  }, "slow");
});

$('#left-button').click(function(event) {
  event.preventDefault();
  $('#content').animate({
    scrollLeft: "-=293px"
  }, "slow");
});

/***************************************
              Mobile slider
****************************************/



/*************************************
                  numbers
***************************************/
var numberEl = document.getElementsByClassName('statistics')[0];
var numbers = document.getElementsByClassName('number');
var time = 8;
var isNumberUpdated = false;

var incArray = [];
var startArray = [];
var statusArray = [];
var numberArray = [];

for(var i = 0; i < numbers.length; i++) {
  numberArray.push(parseInt(numbers[i].innerHTML));
  numbers[i].innerHTML = 0;
}

for(var i = 0; i < numbers.length; i++) {
  incArray.push(parseInt(Math.ceil(numberArray[i]/250)));
  startArray.push(0);
  statusArray.push(false);
}

function incNumber() {
  var count = 0;
  isNumberUpdated = true;
  var updateNumbers = setInterval(function() {
    for(var i = 0; i < numbers.length; i++) {
      if(statusArray[i] == false) {
        startArray[i] += incArray[i];
      }
      numbers[i].innerHTML = startArray[i]

      if(startArray[i] >= numberArray[i]) {
        statusArray[i] = true;
      }
    }

    for(var i = 0; i < statusArray.length; i++) {
      if(statusArray[i] == true) {
        ++count;
      }
    }

    if(count == 4) {
      clearInterval(updateNumbers)
    } else {
      count = 0;
    }
  }, time);
}

window.addEventListener('scroll', function() {
  var pos = numberEl.getBoundingClientRect().top;
  console.log(pos)
  if(pos < 380 && isNumberUpdated == false) {
    incNumber();
  }
})

/******************************************
              timer logic
*******************************************/
var daysEl = document.getElementById('days');
var hoursEl = document.getElementById('hours');
var minutesEl = document.getElementById('minutes');
var secondsEl = document.getElementById('seconds');

function showDiff() {
  var pastDate = new Date();
  var futureDate = new Date("2018/09/10 10:30:00")

  // diff in seconds
  var diff = Math.floor((futureDate - pastDate) / 1000);

  // calculating days, hours, min, seconds
  var days = Math.floor(diff/(24*60*60));
  var remSec = diff - (days * 24 * 60 * 60);
  var hours = Math.floor(remSec / (60 * 60));
  var remSec = remSec - (hours * 60 * 60);
  var minutes = Math.floor(remSec / 60);
  var seconds = Math.floor(remSec - (minutes * 60));

  if(days < 10) { days = '0' + days }
  if(hours < 10) { hours = '0' + hours }
  if(minutes < 10) { minutes = '0' + minutes }
  if(seconds < 10) { seconds = '0' + seconds }

  // render output only if diff is greater that zero otherwise stop function
  if(diff >= 0) {
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;
  } else {
    clearInterval(timeUpdate);
  }
}
showDiff();

// call function every 1 second
var timeUpdate = setInterval(function () {
  showDiff();
}, 1000)
