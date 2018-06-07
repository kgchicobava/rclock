let clockBtn = document.getElementsByClassName("clock")[0],
timerBtn = document.getElementsByClassName("timer")[0],
stopwatchBtn = document.getElementsByClassName("stopwatch")[0],
menuContent = document.getElementsByClassName("menu-content"),
TIME_ZONE_KEY =  "AIzaSyBPM8pQfZJtt5kcPzWYly8VsLFAAkwuow4",
currTime = document.getElementsByClassName("currentTime")[0],
currDate = document.getElementsByClassName("currentDate")[0];
// Wednesday, Jun 6
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