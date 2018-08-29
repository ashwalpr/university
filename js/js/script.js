/********************************
    update header on scroll
*********************************/
var mainHeader = document.getElementById('mainHeader');

window.addEventListener('scroll', function() {
  console.log('scrolling');
  if(window.scrollY > 100) {
    mainHeader.classList.add('active');
  } else {
    mainHeader.classList.remove('active');
  }
});

/**************************************
                  toggle
**************************************/
document.getElementById('toggleMobileNav').addEventListener('click',function() {
  if(document.getElementById('mainnav').classList.contains('open')){
    document.getElementById('mainnav').classList.remove('open');
  } else {
    document.getElementById('mainnav').classList.add('open');
  }
})




/**********************************
               slider
***********************************/
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');

prevBtn.addEventListener('click', updateSlider);
nextBtn.addEventListener('click', updateSlider);

function updateSlider(event) {
  var id = event.target.id;
  var currentActiveEl = document.querySelector('.active');
  var lastEl = document.querySelector('img:last-child');
  var firstEl = document.querySelector('img:first-child');

  if(id == "next") {
    if(currentActiveEl == lastEl) {
      var nextActiveEl = document.querySelector('img:first-child');
    } else {
      var nextActiveEl = document.querySelector('.active+img');
    }
  } else {
    if(currentActiveEl == firstEl) {
      var nextActiveEl = document.querySelector('img:last-child');
    } else {
      var nextActiveEl = document.querySelector('.active').previousSibling.previousSibling;
    }
  }
  nextActiveEl.classList.add('temp');
  currentActiveEl.classList.remove('active');
  nextActiveEl.classList.add('active');
  nextActiveEl.classList.remove('temp');
}


/********************************
    timer logic
*********************************/
var daysEl = document.getElementById('days');
var hoursEl = document.getElementById('hours');
var minutesEl = document.getElementById('minutes');
var secondsEl = document.getElementById('seconds');

function showDiff() {
  var pastDate = new Date();
  var futureDate = new Date("2018/08/29 14:11:30")

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
