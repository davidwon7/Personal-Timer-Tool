var continuousTimer;

var timerObj;
var timerObjArray = [];
var numberOfTimers;
var customTimers = 0;
var currentSelectedForEdit;

/* Notes
Timer Obj - has the following variables:
* Name = the name to be shown next to the timer
* isDisabled = whether the timer is disabled
* refName = reference to the description
* ref = reference to the actual timer
* secs = current seconds left on timer
* totalSecs = maximum seconds of the timer
* alert = message to display when timer runs out
* isStopped = whether the timer is stpped/paused or not

All timer objects are stored in timerObjArray
By default, there are 3 timers

*/
/*
document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
  });
*/
$(document).ready(function(){

    webstorage();
    initializeDefaultTimers();
    loadFromStorage();
    initializeButtons();
    //localStorage.clear();
    //localStorage.customTimers = 0;
    //console.log("custom timers: " + localStorage.customTimers);
    //console.log("number of timers: " + localStorage.numberOfTimers);

    // request permission on page load - for notifications


    /* Add a new custom timer
    $(".btn-add").click(function(){
        var addh, addm, adds, addname;
        addh = $("#hour");
        addm = $("#min");
        adds = $("#sec");
        addname = $("#name");
        if(addname.val() === ""){
            addname.val("Custom Timer");
        }
        var tempTotal = (addh.val() * 60 * 60) + (addm.val() * 60) + (adds.val() * 1);
        console.log("Hour" + addh.val() + ": Minute " + addm.val() + ": Seconds" + adds.val());
        console.log("TempTotal: " + tempTotal);
        //Add the new timer to the html using jQuery
        $(".timer-table").append(
            "<tr id='eyerest" + numberOfTimers + "'> \
                \
                \
                <td class='timer-description'>" + addname.val() + "</td>\
                <td class='timer-custom'>\
                    <span class='glyphicon glyphicon-star' aria-hidden='true'></span>\
                </td>\
                <td class='timer text'>" + showTimer(tempTotal) + "</td> \
                \
                <td class='timer-buttons'> \
                    <div class='btn btn-primary btn-start btn-act'>  \
                        Start \
                    </div> \
                    <div class='btn btn-success btn-reset btn-act'> \
                        Reset \
                    </div> \
                    <div class='btn btn-danger btn-pause btn-act'> \
                        Pause \
                    </div> \
                    <button type='button' class='btn btn-warning btn-disable btn-act'> \
                        <span class='glyphicon glyphicon-ban-circle' aria-hidden='false'></span> \
                    </button> \
                    <button type='button' class='btn btn-danger btn-remove btn-act'> \
                        <span class='glyphicon glyphicon-remove' aria-hidden='false'></span> \
                    </button> \
                    <button type='button' class='btn btn-primary btn-edit-alert btn-act' data-toggle='modal' data-target='#editModal'>\
                        <span class='glyphicon glyphicon-edit' aria-hidden='false'></span>\
                    </button>\
                </td> \
            </tr>"
        );

        //Add a new timer object
        timerObj = new Object();
        timerObj.name = addname.val();
        timerObj.id = customTimers;
        timerObj.isDisabled = false;
        timerObj.isStopped = true;
        timerObj.isRemoved = false;
        timerObj.alert = "";
        timerObj.secs = tempTotal;
        timerObj.totalSecs = tempTotal;
        timerObj.ref = "#eyerest" + numberOfTimers + " > .timer";
        timerObj.refName = "#eyerest" + numberOfTimers + " > .timer-description";
        $(timerObj.ref).text(showTimer(timerObj.totalSecs));
        $(timerObj.refName).text(timerObj.name);
        timerObjArray.push(timerObj);
        //console.log("Name: " + addname.val() + " Secs: " + timerObj.secs);
        initializeButtons();
        numberOfTimers = Number(numberOfTimers);
        customTimers = Number(customTimers);
        storeTimerLocal(timerObj);
        customTimers += 1;
        numberOfTimers += 1;
        localStorage.customTimers = customTimers;
        localStorage.numberOfTimers = numberOfTimers;
    });

    */

    /* Add a new timer by clicking on the button below the timers */
    $('#add-timer').click(function(){
        var mainModal = $(this).parent().parent();
        var newH = mainModal.find('input[id="add-hour"]').val();
        var newM = mainModal.find('input[id="add-min"]').val();
        var newS = mainModal.find('input[id="add-sec"]').val();
        var newName = mainModal.find('input[id="add-timer-name"]').val();
        var newAlert = mainModal.find('textarea[id="add-timer-text"]').val();
        var totalSecs = Number(newH) * 60 * 60 + Number(newM) * 60 + Number(newS);

        /* Append a new timer to the table */
        $(".timer-table").append(
            "<tr id='eyerest" + numberOfTimers + "'> \
                \
                \
                <td class='timer-description'>" + newName + "</td>\
                <td class='timer-custom'>\
                    <span class='glyphicon glyphicon-star' aria-hidden='true'></span>\
                </td>\
                <td class='timer text'>" + showTimer(totalSecs) + "</td> \
                \
                <td class='timer-buttons'> \
                <div class='btn btn-primary btn-start btn-act'>\
                    <span class='glyphicon glyphicon-play' aria-hidden='false'></span>\
                </div>\
                <div class='btn btn-danger btn-pause btn-act'>\
                    <span class='glyphicon glyphicon-stop' aria-hidden='false'></span>\
                </div>\
                <div class='btn btn-success btn-reset btn-act'>\
                    <span class='glyphicon glyphicon-repeat' aria-hidden='false'></span>\
                </div>\
                    <button type='button' class='btn btn-warning btn-disable btn-act'> \
                        <span class='glyphicon glyphicon-ban-circle' aria-hidden='false'></span> \
                    </button> \
                </td> \
                <td class='timer-buttons-2'>\
                    <button type='button' class='btn btn-danger btn-remove btn-act'>\
                        <span class='glyphicon glyphicon-remove' aria-hidden='false'></span>\
                    </button>\
                    <button type='button' class='btn btn-primary btn-edit-alert btn-act' data-toggle='modal' data-target='#editModal'>\
                        <span class='glyphicon glyphicon-edit' aria-hidden='false'></span>\
                    </button>\
                </td>\
            </tr>"
        );

        //Add a new timer object
        timerObj = new Object();
        timerObj.name = newName;
        timerObj.id = customTimers;
        timerObj.isDisabled = false;
        timerObj.isStopped = true;
        timerObj.isRemoved = false;
        timerObj.alert = newAlert;
        timerObj.secs = totalSecs;
        timerObj.totalSecs = totalSecs;
        timerObj.ref = "#eyerest" + numberOfTimers + " > .timer";
        timerObj.refName = "#eyerest" + numberOfTimers + " > .timer-description";
        $(timerObj.ref).text(showTimer(timerObj.totalSecs));
        $(timerObj.refName).text(timerObj.name);
        timerObjArray.push(timerObj);
        initializeButtons();
        numberOfTimers = Number(numberOfTimers);
        customTimers = Number(customTimers);
        storeTimerLocal(timerObj);
        customTimers += 1;
        numberOfTimers += 1;
        localStorage.customTimers = customTimers;
        localStorage.numberOfTimers = numberOfTimers;
        swal("Successfully Added!", "", "success");
    });

    // Initialize a global timer - always runs on document load
    continuousTimer = setInterval(timerFunction, 1000);

    // Timer function - includes alert, and decreases the timer if the timer is not stopped
    function timerFunction(){
        for(var i = 0; i < timerObjArray.length; i++){
            if(!timerObjArray[i].isStopped){
                timerObjArray[i].secs -= 1;
                //console.log($(timerObjArray[i].ref).text());
                $(timerObjArray[i].ref).text(showTimer(timerObjArray[i].secs));
                if(timerObjArray[i].secs <= 0){
                    timerObjArray[i].isStopped=true;
                    displayAlert(timerObjArray[i]);
                }
                console.log(timerObjArray[i].isStopped);
            }
        }
    }

    /* Displays an alert to the user, and also a notification*/
    function displayAlert(alertTimer){
        var msg = alertTimer.alert;
        var name = alertTimer.name;
        notifyMe(name, msg);
        swal({
          title: "TIMER IS UP: " + name,
          text: "Alert: " + msg,
          type: "warning",
          confirmButtonClass: "btn-success",
          confirmButtonText: "Stop and Reset!",
          closeOnConfirm: false
        },
        function(){
          triggerTimers($(alertTimer.ref), "reset");
          triggerTimers($(alertTimer.ref), "pause");
          swal("Successfully Reset!", "Hope you had a good break!", "success")

        });
    }

    //Specifically for Browser Notifications
    function notifyMe(name, msg) {
          if (Notification.permission !== "granted")
           Notification.requestPermission();
          else {
            var notification = new Notification(name + "!", {
              icon: '/Sand-Timer.png',
              body: msg,
            });

            notification.onclick = function () {
             // window.open("http://stackoverflow.com/a/13328397/1269037");
             window.focus();
            };
        }
    }

    // Initialize all the timers first (for testing purposes for now) - 3 timers default
    function initializeDefaultTimers(){
        for(var i = 0; i < 3; i++){
            timerObj = new Object();
            timerObj.isDisabled = false;
            timerObj.refName = "#eyerest" + i + " > .timer-description";
            timerObj.ref = "#eyerest" + i + " > .timer";
            switch(i){
                case 0: //20 minute timer - short eye break
                    timerObj.name = "Eye Break";
                    timerObj.secs = 1200;
                    timerObj.totalSecs = 1200;
                    timerObj.alert = "EYE BREAK! Look at an object 20 feet away from you for 20 seconds!"
                    break;
                case 1: // 60 minute timer - stretch break
                    timerObj.name = "Stretch Break";
                    timerObj.secs = 3600;
                    timerObj.totalSecs = 3600;
                    timerObj.alert = "STRETCH BREAK! Get up, stretch your arms, back, wrists, and head. Adjust your posture!"
                    break;
                case 2: // 90 minute timer - walk break
                    timerObj.name = "Walk Break";
                    timerObj.secs = 5400;
                    timerObj.totalSecs = 5400;
                    timerObj.alert = "WALK BREAK! Walk around, get some drinks, and take a 10 minute break!"
                    break;
            }
            //timerObj.secs = 120;
            //timerObj.totalSecs = 120;
            timerObj.isStopped = true;
            $(timerObj.ref).text(showTimer(timerObj.totalSecs));
            $(timerObj.refName).text(timerObj.name);
            console.log(timerObj.ref);
            timerObjArray.push(timerObj);
        }
    }

    // Initialize all the buttons (for testing purposes for now)
    function initializeButtons(){
        $(".btn-act").unbind("click");
        $(".btn-disable").click(function(){
             var findtimer = $(this).parent().siblings(".timer");
             triggerTimers(findtimer, "disable");
        });

        //Deletes all user-created custom timers
        $(".delete-all").click(function(){
            swal({
              title: "Are you sure?",
              text: "Your custom timers will be deleted permanently",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
            },
            function(){
              swal({
                  title: "Deleted!",
                  text: "All your timers have been deleted successfully",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "Okay!"
                  },
                  function(){
                      localStorage.clear();
                      location.reload();
                  }
              );
            });
        });
            //When the Edit Timer Modal is opened, insert data relating to the timer to edit
        $('#editModal').on('show.bs.modal', function(e){ //Where e = event
            var findtimer = $(e.relatedTarget).parent().siblings(".timer"); //Find the timer itself
            currentSelectedForEdit = findtimer;
            var alert = getTimerObjectItem(findtimer, "alert"); //Get the alert of the timer
            var name = getTimerObjectItem(findtimer, "name"); //Get the name of the timer
            var totalSecs = getTimerObjectItem(findtimer, "totalSecs"); //Get the totalSecs of the timer

            //Compute the hour, min, sec of the totalSecs
            var s = Math.floor(totalSecs % 60);
            var m = Math.floor((totalSecs / 60) % 60);
            var h = Math.floor((totalSecs / 60 / 60));
            if(s < 10) s = "0" + s;
            if(m < 10) m = "0" + m;
            if(h < 10) h = "0" + h;

            //Insert the data from the timerObj into the relative input boxes
            $(e.currentTarget).find('input[id="timer-name"]').val(name);
            $(e.currentTarget).find('textarea[id="timer-text"]').val(alert);
            $(e.currentTarget).find('input[id="hour"]').val(h);
            $(e.currentTarget).find('input[id="min"]').val(m);
            $(e.currentTarget).find('input[id="sec"]').val(s);
        });

        $('#save-changes').click(function(){
            var mainModal = $(this).parent().parent();
            var newH = mainModal.find('input[id="hour"]').val();
            var newM = mainModal.find('input[id="min"]').val();
            var newS = mainModal.find('input[id="sec"]').val();
            var newName = mainModal.find('input[id="timer-name"]').val();
            var newAlert = mainModal.find('textarea[id="timer-text"]').val();
            var timerInt = -1;

            var totalSecs = Number(newH) * 60 * 60 + Number(newM) * 60 + Number(newS);

            for(var i = 0; i < numberOfTimers; i++){
                //Find the same reference
                //console.log(timerObjArray[i].ref);
                if(currentSelectedForEdit.is($(timerObjArray[i].ref))){
                    //console.log("Correct!");
                    timerInt = i;
                    break;
                }
            }

            if(timerInt != -1){
                timerObjArray[timerInt].name = newName;
                timerObjArray[timerInt].alert = newAlert;
                timerObjArray[timerInt].totalSecs = totalSecs;
                timerObjArray[timerInt].secs = totalSecs;
                timerObjArray[timerInt].isStopped = true;
            }

            swal({
                title: "Success!",
                text: "Your changes have been saved!",
                type: "success"
            },
                function(){
                    location.reload();
                }
            )


            console.log("Wow clickde");
            console.log(mainModal.find('input[id="sec"]'));
        });

        $(".btn-remove").click(function(){
            var findtimer = $(this).parent().parent();
            var timerAttr = findtimer.attr("id").substr(7); // Gets the id of this particular eyerest
            console.log(timerAttr);
            timerObjArray[Number(timerAttr)].isRemoved = true;
            console.log(findtimer);
            findtimer.remove();
        });

        $(".btn-start").click(function(){
            var findtimer = $(this).parent().siblings(".timer");
            triggerTimers(findtimer, "start");
        });

        $(".btn-reset").click(function(){
            var findtimer = $(this).parent().siblings(".timer");
            triggerTimers(findtimer, "reset");
        });

        $(".btn-pause").click(function(){
            var findtimer = $(this).parent().siblings(".timer");
            triggerTimers(findtimer, "pause");
        });

        $(".start-all").click(function(){
            $(".btn-start").click();
        });

        $(".reset-all").click(function(){
            $(".btn-reset").click();
        });

        $(".pause-all").click(function(){
            $(".btn-pause").click();
        });
    }

    function getTimerObjectItem(findtimer, toGet){
        var timerInt = -1;
        for(var i = 0; i < numberOfTimers; i++){
            //Find the same reference
            //console.log(timerObjArray[i].ref);
            if(findtimer.is($(timerObjArray[i].ref))){
                //console.log("Correct!");
                timerInt = i;
                break;
            }
        }
        if(timerInt != -1){
            if(toGet === "alert"){
                return timerObjArray[timerInt].alert;
            }
            if(toGet === "name"){
                return timerObjArray[timerInt].name;
            }
            if(toGet === "totalSecs"){
                return timerObjArray[timerInt].totalSecs;
            }
        }
    }

    // Trigger Timer Function - for start, reset, pause, disable, edit
    function triggerTimers(findtimer, trigger, msg = ""){
        var timerInt = -1;
        for(var i = 0; i < numberOfTimers; i++){
            //Find the same reference
            //console.log(timerObjArray[i].ref);
            if(findtimer.is($(timerObjArray[i].ref))){
                //console.log("Correct!");
                timerInt = i;
                break;
            }
        }

        // If the timer is not correct
        if(timerInt == -1){
            console.log("Incorrect button press!");
        }
        else{
            console.log("Picked timer: " + timerInt + " and trigger is: " + trigger + " and message is: " + msg);
            //Start the timer if is was stopped/not started yet
            if(!(trigger === "disable" || trigger === "edit") && !timerObjArray[timerInt].isDisabled){
                if(trigger === "start"){
                    if(timerObjArray[i].isStopped){
                        timerObjArray[i].isStopped = false;
                    }
                }
                else if (trigger === "reset"){
                    timerObjArray[i].secs = timerObjArray[i].totalSecs;
                    $(timerObjArray[i].ref).text(showTimer(timerObjArray[i].totalSecs));
                }
                else if (trigger === "pause"){
                    if(!timerObjArray[i].isStopped){
                        timerObjArray[i].isStopped = true;
                    }
                }
            }


            //Edit the alert of timer
            else if (trigger === "edit"){
                console.log("HERE");
                console.log("Edited!" + msg);
                timerObjArray[timerInt].alert = msg;
            }

            //Disable the timer
            else if (trigger === "disable"){
                if(!timerObjArray[i].isDisabled){ // Not disabled yet - disable the timer
                    console.log(findtimer + "Disabling...!");
                    timerObjArray[i].isDisabled = true;
                    timerObjArray[i].isStopped = true;
                    $(timerObjArray[i].ref).text("DISABLED ");
                    $(timerObjArray[i].ref).parent().css('background-color', '#707070');;
                }else if (timerObjArray[i].isDisabled){ // Disabled - enable the timer
                    console.log(findtimer + "Enabling...!");
                    timerObjArray[i].isDisabled = false;
                    $(timerObjArray[i].ref).text(showTimer(timerObjArray[i].secs));
                    $(timerObjArray[i].ref).parent().css('background-color', '#303030');;
                }
            }


        }

    }

    // Show Timer Function - returns a string converting seconds into h:m:s in 00 : 00 : 00 format
    function showTimer(secs){
        var s, m, h;
        s = Math.floor(secs % 60);
        m = Math.floor((secs / 60) % 60);
        h = Math.floor((secs / 60 / 60));
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

    // Loads all the timers from the data
    function loadFromStorage(){
        console.log("Loading new timers..." + customTimers);
        //Add a new timer object
        for(var i = 0; i < customTimers; i++){
            console.log("Loading new timers..." + i + " : " + localStorage.getItem("timer_isRemoved" + i));
            if(localStorage.getItem("timer_isRemoved" + i) === "false" || localStorage.getItem("timer_isRemoved" + i) === "undefined"){
                timerObj = new Object();
                timerObj.name = localStorage.getItem("timer_name" + i);
                timerObj.id = Number(localStorage.getItem("timer_id" + i));
                if(localStorage.getItem("timer_isStopped" + i) === "false") timerObj.isStopped = false;
                else timerObj.isStopped = true;

                timerObj.alert = localStorage.getItem("timer_alert" + i);
                console.log("ALERT" + timerObj.alert);
                timerObj.secs = Number(localStorage.getItem("timer_secs" + i));
                console.log("SECS: " + timerObj.secs);
                timerObj.totalSecs = Number(localStorage.getItem("timer_totalSecs" + i));
                timerObj.ref = localStorage.getItem("timer_ref" + i);
                timerObj.refName = localStorage.getItem("timer_refName" + i);
                $(timerObj.refName).text(timerObj.name);


                $(".timer-table").append(
                    "<tr id='eyerest" + (timerObj.id + 3) + "''> \
                        <td class='timer-description'>" + timerObj.name + "</td>\
                        <td class='timer-custom'>\
                            <span class='glyphicon glyphicon-star' aria-hidden='true'></span>\
                        </td>\
                        <td class='timer text'>" + showTimer(timerObj.secs) + "</td> \
                        \
                        <td class='timer-buttons'> \
                            <div class='btn btn-primary btn-start btn-act'>  \
                                <span class='glyphicon glyphicon-play' aria-hidden='false'></span>\
                            </div> \
                            <div class='btn btn-danger btn-pause btn-act'> \
                                <span class='glyphicon glyphicon-stop' aria-hidden='false'></span>\
                            </div> \
                            <div class='btn btn-success btn-reset btn-act'> \
                                <span class='glyphicon glyphicon-repeat' aria-hidden='false'></span>\
                            </div> \
                            <button type='button' class='btn btn-warning btn-disable btn-act'> \
                                <span class='glyphicon glyphicon-ban-circle' aria-hidden='false'></span> \
                            </button> \
                        </td> \
                        <td class='timer-buttons-2'>\
                            <button type='button' class='btn btn-danger btn-remove btn-act'>\
                                <span class='glyphicon glyphicon-remove' aria-hidden='false'></span>\
                            </button>\
                            <button type='button' class='btn btn-primary btn-edit-alert btn-act' data-toggle='modal' data-target='#editModal'>\
                                <span class='glyphicon glyphicon-edit' aria-hidden='false'></span>\
                            </button>\
                        </td>\
                    </tr>"
                );
                console.log(timerObj.isStopped);
                if(localStorage.getItem("timer_isDisabled" + i) === "true"){
                    timerObj.isDisabled = true;
                    $(timerObj.ref).text("DISABLED ");
                    $(timerObj.ref).parent().css('background-color', '#707070');;
                }else if(localStorage.getItem("timer_isDisabled" + i) === "false"){
                    $(timerObj.ref).text(showTimer(timerObj.secs));
                    timerObj.isDisabled = false;
                }
                timerObjArray.push(timerObj);
            }
            else{
                timerObj = new Object();
                timerObjArray.push(timerObj);
            }
        }
        //console.log("Name: " + addname.val() + " Secs: " + timerObj.secs);
        initializeButtons();
    }

    // For this app, I use local storage to store information, since no user/pass is needed (may update)
    // This function stores the total number of timers that exist, including custom ones
    function webstorage(){
        if(typeof(Storage) !== "undefined"){
            //Store && Retrieve
            if(localStorage.numberOfTimers){
                numberOfTimers = localStorage.numberOfTimers;
            }else{
                localStorage.numberOfTimers = 3; //Default Timers
                numberOfTimers = 3;
            }

            if(localStorage.customTimers){
                customTimers = localStorage.customTimers;
            }else{
                customTimers = 0;
            }
            //Store custom timers based on number of timers
        }else{
            alert("Sorry, your browser does not support Web storage!");
        }
    }

    // Store the timer locally, using the timer's id (custom only)
    // e.g. the first added timer would have id 0 ...
    function storeTimerLocal(custom){
        localStorage.setItem("timer_id" + custom.id, custom.id);
        localStorage.setItem("timer_name" + custom.id, custom.name);
        localStorage.setItem("timer_isRemoved" + custom.id, custom.isRemoved);
        localStorage.setItem("timer_isDisabled" + custom.id, custom.isDisabled);
        localStorage.setItem("timer_isStopped" + custom.id, custom.isStopped);
        localStorage.setItem("timer_alert" + custom.id, custom.alert);
        localStorage.setItem("timer_secs" + custom.id, custom.secs);
        localStorage.setItem("timer_totalSecs" + custom.id, custom.totalSecs);
        localStorage.setItem("timer_ref" + custom.id, custom.ref);
        localStorage.setItem("timer_refName" + custom.id, custom.refName);
    }

    // Called when the user reloads
    function updateLocalTimers(){
        for(var i = 0; i < customTimers; i++){
            storeTimerLocal(timerObjArray[i + 3]);
            console.log(timerObjArray[i + 3].isStopped);
        }
    }

    // Called to save the changes
    function reloadElements(){

    }
    $(window).bind('beforeunload', function(){
        updateLocalTimers();
    });
})

function format(input){ //Format the input
    if(input.value.length === 1){
        input.value = "0" + input.value;
    }
    var check = input.value;
    console.log(check);
    if(isNaN(check)){
        alert("Please input numbers!");
        input.value = "0" + 0;
    }

    if(input.id === "hour"){
        if(input.value.length > 2){
            input.value %= 100;
        }
    }
    else {
        if(input.value.length > 2){
            input.value = 59;
        }
    }
}













<!---->
