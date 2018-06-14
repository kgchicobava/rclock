// CLOCK IMPLEMENTATION
let clockBtn = document.getElementsByClassName("clock")[0],
    timerBtn = document.getElementsByClassName("timer")[0],
    stopwatchBtn = document.getElementsByClassName("stopwatch")[0],
    menuContent = document.getElementsByClassName("menu-content"),
    TIME_ZONE_KEY = "AIzaSyBPM8pQfZJtt5kcPzWYly8VsLFAAkwuow4",
    currTime = document.getElementsByClassName("currentTime")[0],
    currDate = document.getElementsByClassName("currentDate")[0],
    days = {
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday",
        "7": "Sunday"
    },
    months = {
        "0": "January",
        "1": "February",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "September",
        "9": "October",
        "10": "November",
        "11": "December"
    }
    
clockBtn.onclick = show('clock-box');

setTimeout(function () {
    let date = new Date();
    if (date.getMinutes() < 10) {currTime.innerHTML = `${date.getHours()}:0${date.getMinutes()}`;}
    else {currTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;}
    currDate.innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}, 100);
setInterval(function () {
    let date = new Date();
    if (date.getMinutes() < 10) {currTime.innerHTML = `${date.getHours()}:0${date.getMinutes()}`;}
    else {currTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;}
    
}, 10000);

for (let i = 0; i < menuContent.length; i++) {
    menuContent[i].style.display = "none";
}

function show(pick) {
    for (let i = 0; i < menuContent.length; i++) {
        menuContent[i].style.display = "none";
    }
    document.getElementsByClassName(pick)[0].style.display = "block";

}

$(document).ready(function () {
    show("clock-box");
    $(".fab").click(function () {
        $(".worldTime").toggleClass("half-w");
        $(".city-search").fadeToggle("slow");
    });
    $(".clock").click(function() {
        $(".menu-content").animateCss("fadeIn");
        $(".clock").addClass("active");
        show('clock-box');
        $(".timer, .stopwatch").removeClass("active");
    });
    $(".timer").click(function() {
        $(".menu-content").animateCss("fadeIn");
        $(".timer").addClass("active");
        show('timer-box');
        $(".clock, .stopwatch").removeClass("active");
    });
    $(".stopwatch").click(function() {
        $(".menu-content").animateCss("fadeIn");
        $(".stopwatch").addClass("active");
        show('stopwatch-box');
        $(".timer, .clock").removeClass("active");
    });

    $.fn.extend({
        animateCss: function(animationName, callback) {
          var animationEnd = (function(el) {
            var animations = {
              animation: 'animationend',
              OAnimation: 'oAnimationEnd',
              MozAnimation: 'mozAnimationEnd',
              WebkitAnimation: 'webkitAnimationEnd',
            };
      
            for (var t in animations) {
              if (el.style[t] !== undefined) {
                return animations[t];
              }
            }
          })(document.createElement('div'));
      
          this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
      
            if (typeof callback === 'function') callback();
          });
      
          return this;
        },
      });


});

let citySearchBar = document.getElementsByClassName("city-search")[0];




// STOPWATCH IMPLEMENTATION
let start_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24">
<path d="M8 5v14l11-7z"/>
<path d="M0 0h24v24H0z" fill="none"/>
</svg>`,
    pause_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>`;
let start = document.querySelector(".start"),
    stop = document.querySelector(".stop"),
    display = document.querySelector(".display"),
    seconds = document.querySelector(".outerdot"),
    lap = document.querySelector(".lap"),
    timerState = "stopped", //Clock is either stopped, paused, or running
    startTime, elapsed, timer;
//timer states

start.addEventListener("click", function () {
    if (timerState == "stopped") {
        startTime = Date.now();
        timer = requestAnimationFrame(updateTime);
        timerState = "running";
        seconds.classList.remove("paused");
        seconds.classList.add("running");
        start.innerHTML = pause_SVG;
    } else if (timerState == "running") {
        cancelAnimationFrame(timer);
        timerState = "paused";
        seconds.classList.add("paused");
        stop.classList.remove("disabled");
        start.innerHTML = start_SVG;
    } else if (timerState == "paused") {
        startTime = Date.now() - elapsed;
        timer = requestAnimationFrame(updateTime);
        timerState = "running";
        seconds.classList.remove("paused");
        seconds.classList.add("running");
        stop.classList.add("disabled");
        start.innerHTML = pause_SVG;
    }
});

let lap_counter = 0;

lap.addEventListener("click", function () {
    if (!this.classList.contains("disabled")) {
        if (document.getElementById("lapID").childElementCount < 7) {
            // childElementCount
            let node = document.createElement("LI");
            let textnode = document.createTextNode(display.innerHTML);
            node.appendChild(textnode);
            document.getElementById("lapID").appendChild(node);
        }
    }
});

stop.addEventListener("click", function () {
    if (display.innerHTML == "00:00:00") {
        document.getElementById("lapID").innerHTML = "";
    }
    if (!this.classList.contains("disabled")) {
        timerState = "stopped";
        seconds.classList.remove("paused", "running");
        this.classList.add("disabled");
        start.innerHTML = start_SVG;
        display.innerHTML = "00:00:00";
        document.getElementById("lapID").innerHTML = "";
    };
});

function updateTime() {

    timer = requestAnimationFrame(updateTime);
    elapsed = new Date(Date.now() - startTime);

    //minutes
    let mins = elapsed.getMinutes();
    //seconds  
    let secs = elapsed.getSeconds();
    // hundredths
    let hund = Math.floor(elapsed.getMilliseconds() / 10);
    //add leading zeros
    if (mins < 10) {
        mins = "0" + mins
    }
    if (secs < 10) {
        secs = "0" + secs
    }
    if (hund < 10) {
        hund = "0" + hund
    }

    //update clock
    display.innerHTML = mins + ":" + secs + ":" + hund;

};

// TIMER IMPLEMENTATION

let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let len = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = len;

function update(value, timePercent) {
    var offset = -len - len * value / (timePercent);
    progressBar.style.strokeDashoffset = offset;
    pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`;
};

//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');

let intervalTimer;
let timeLeft;
let wholeTime = 1 * 60; // manage this to set the whole time 
let isPaused = false;
let isStarted = false;


update(wholeTime, wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds) {
    if ((wholeTime + seconds) > 0) {
        wholeTime += seconds;
        update(wholeTime, wholeTime);
    }
}

for (var i = 0; i < setterBtns.length; i++) {
    setterBtns[i].addEventListener("click", function (event) {
        var param = this.dataset.setter;
        switch (param) {
            case 'minutes-plus':
                changeWholeTime(1 * 60);
                break;
            case 'minutes-minus':
                changeWholeTime(-1 * 60);
                break;
            case 'seconds-plus':
                changeWholeTime(1);
                break;
            case 'seconds-minus':
                changeWholeTime(-1);
                break;
        }
        displayTimeLeft(wholeTime);
    });
}

function timerCountdown(seconds) { //counts time, takes seconds
    let remainTime = Date.now() + (seconds * 1000);
    displayTimeLeft(seconds);

    intervalTimer = setInterval(function () {
        timeLeft = Math.round((remainTime - Date.now()) / 1000);
        if (timeLeft < 0) {
            clearInterval(intervalTimer);
            isStarted = false;
            setterBtns.forEach(function (btn) {
                btn.disabled = false;
                btn.style.opacity = 1;
            });
            displayTimeLeft(wholeTime);
            pauseBtn.classList.remove('pause');
            pauseBtn.classList.add('play');
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function pauseTimer(event) {
    if (isStarted === false) {
        timerCountdown(wholeTime);
        isStarted = true;
        this.classList.remove('play');
        this.classList.add('pause');

        setterBtns.forEach(function (btn) {
            btn.disabled = true;
            btn.style.opacity = 0.5;
        });

    } else if (isPaused) {
        this.classList.remove('play');
        this.classList.add('pause');
        timerCountdown(timeLeft);
        isPaused = isPaused ? false : true
    } else {
        this.classList.remove('pause');
        this.classList.add('play');
        clearInterval(intervalTimer);
        isPaused = isPaused ? false : true;
    }
}

function displayTimeLeft(timeLeft) { //displays time on the input
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.textContent = displayString;
    update(timeLeft, wholeTime);
}

pauseBtn.addEventListener('click', pauseTimer);