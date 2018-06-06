let clockBtn = document.getElementsByClassName("clock")[0],
    timerBtn = document.getElementsByClassName("timer")[0],
    stopwatchBtn = document.getElementsByClassName("stopwatch")[0],
    menuContent = document.getElementsByClassName("menu-content");
    
    
for (let i = 0; i < menuContent.length; i++) {
        menuContent[i].style.display = "none";
}

function show(pick) {
    for (let i = 0; i < menuContent.length; i++) {
        menuContent[i].style.display = "none";
}
    document.getElementsByClassName(pick)[0].style.display = "block";


    



//    // Show the current tab, and add an "active" class to the link that opened the tab
//    evt.currentTarget.className += " active";
}