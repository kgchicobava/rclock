// CLOCK IMPLEMENTATION

let clockBtn = document.getElementsByClassName("clock")[0],
timerBtn = document.getElementsByClassName("timer")[0],
stopwatchBtn = document.getElementsByClassName("stopwatch")[0],
menuContent = document.getElementsByClassName("menu-content"),
TIME_ZONE_KEY =  "AIzaSyBPM8pQfZJtt5kcPzWYly8VsLFAAkwuow4",
currTime = document.getElementsByClassName("currentTime")[0],
currDate = document.getElementsByClassName("currentDate")[0];

let days = {
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

setTimeout(function(){
    let date = new Date();
    currTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    currDate.innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}, 100);
setInterval(function(){
    let date = new Date();
    currTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
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

$(document).ready(function(){
    $(".fab").click(function(){
        $(".worldTime").toggleClass("half-w");
        $(".city-search").fadeToggle("slow");
    });
});




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

start.addEventListener("click", function(){
  if(timerState == "stopped"){
  startTime = Date.now();
  timer = requestAnimationFrame(updateTime);
    timerState = "running";
    seconds.classList.remove("paused");
    seconds.classList.add("running");
    start.innerHTML = pause_SVG;
  } else if( timerState == "running" ){
    cancelAnimationFrame( timer );
    timerState = "paused";
    seconds.classList.add("paused");
    stop.classList.remove("disabled");
    start.innerHTML = start_SVG;
  } else if( timerState == "paused" ){
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

lap.addEventListener("click", function() {
    if(!this.classList.contains("disabled")) {
        if(document.getElementById("lapID").childElementCount < 7) {
        // childElementCount
        let node = document.createElement("LI");                
        let textnode = document.createTextNode(display.innerHTML);
        node.appendChild(textnode);
        document.getElementById("lapID").appendChild(node);
    }
}
});

stop.addEventListener("click", function(){
  if(!this.classList.contains("disabled") ){
    timerState = "stopped";
    seconds.classList.remove("paused", "running");
    this.classList.add("disabled");
    start.innerHTML = start_SVG;
    display.innerHTML = "00:00:00";
    document.getElementById("lapID").innerHTML = "";
  };
});



function updateTime(){

  timer = requestAnimationFrame(updateTime);
  elapsed = new Date(Date.now() - startTime);
  
  //minutes
  let mins = elapsed.getMinutes();
  //seconds  
  let secs = elapsed.getSeconds();
  // hundredths
  let hund = Math.floor(elapsed.getMilliseconds()/10);
   //add leading zeros
  if ( mins < 10 ){ mins = "0"+ mins }
  if ( secs < 10 ){ secs = "0"+ secs}
  if ( hund < 10 ){ hund = "0"+ hund }
  
  //update clock
  display.innerHTML = mins + ":"+ secs + ":" + hund;
  
};










