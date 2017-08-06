var timerVar;
var secs = 0;
var activeTimers = []
var active = [];
$(document).ready(function(){

    $(".eyerest > .timer-buttons > .btn-primary").click(function(){
        //startTimer();
        var timerObj = $(this).closest(".eyerest").find(".timer");
        //showTimer($(this).parent(".timer").hide());
        startTimer(timerObj);
    });
})

function format(input){ //Format the input
    if(input.value.length === 1){
        input.value = "0" + input.value;
    }
}

function timer (){ //Timer Function
    secs += 1;
    // In hours:minutes:seconds
//    for(int i = 0; i < activeTimers.length; i++){

//    }
}

function startTimer(timerObj){ //Start the timer, if the timer is not started yet
    if(!timerVar){
        timerVar = setInterval(timer, 1000);
        activeTimers.push(timerVar);
        active.push(timerObj);
    }
}

function stopTimer(){ //Stop the timer
    clearInterval(timerVar);
    timerVar = null;
}

function resetTimer(){ // Set seconds, minutes, hours to 0
    secs = 0;
    showTimer();
}

function showTimer(){ // Show the timer on the interface
    var s, m, h;
    s = Math.floor(secs % 60);
    m = Math.floor((secs / 60) % 60);
    h = Math.floor((secs / 60 / 60) % 60);
    if(s < 10){
        s = "0" + s;
    }

    if(m < 10){
        m = "0" + m;
    }

    if(h < 10){
        h = "0" + h;
    }
    return h + " : " + m + " : " + s;
}
