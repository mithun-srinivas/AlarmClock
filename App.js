var timeDisplay = document.getElementById('currentTime')

//Set ringtone
const ringtone = new Audio('./ringtone.mp3')


function refreshTime() {

//Time in 12Hrs Format

  var dateString = new Date().toLocaleTimeString("en-US");
  formattedString = dateString.replace(", ", " - ");

//Set Time TO Html

  timeDisplay.innerHTML = formattedString;
  var cHours = new Date().getHours();
  var cMin = new Date().getMinutes();
  var ampm = 'AM'
  
  if (parseInt(cHours) < 10){
    cHours = "0"+String(cHours);
    ampm='PM'
  }

  if (parseInt(cHours) > 12){
    cHours = "0"+String(cHours-12);
    ampm='PM'
  }
  
  if (parseInt(cMin) < 10){
    cMin = "0"+String(cMin);
    ampm='PM'
  }
    var currentTimeForAlarm = String(cHours)+":"+String(cMin)+":"+String(ampm)
    // console.log(typeof(alarmTime));
    // console.log(currentTimeForAlarm);
    if(alarmTime === currentTimeForAlarm){
        console.log('Alarm On');
        ringtone.play()
        ringtone.loop=true;
    }
    else{
        console.log('Alarm Off');
        if(optionsAll[0].disabled){
            optionsAll[0].disabled=false;
            optionsAll[1].disabled=false;
            optionsAll[2].disabled=false;
            document.getElementById('redText').hidden=true;
            document.getElementById('setButton').style.marginTop='50px'
        }
    }

}

setInterval(refreshTime, 1000);

var optionsAll = document.querySelectorAll('select')

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" +  i : i;
    let options = `<option value="${i}">${i}</options>`
    optionsAll[0].firstElementChild.insertAdjacentHTML("afterend",options);
    
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option value="${i}">${i}</options>`
    optionsAll[1].firstElementChild.insertAdjacentHTML("afterend",options);
    
}


//Set Alarm
let alarmTime;
function setAlarm() {
    const requested = `${optionsAll[0].value}:${optionsAll[1].value}:${optionsAll[2].value}`
    if (requested.includes('Hours') || requested.includes('Minutes') || requested.includes('AM / PM')){
        document.getElementById('redText').hidden=false
        document.getElementById('redText').innerHTML='Invalid Time Selected For Alarm'
        document.getElementById('setButton').style.marginTop='10px'
    }
    else{
        optionsAll[0].disabled=true;
        optionsAll[1].disabled=true;
        optionsAll[2].disabled=true;
        document.getElementById('redText').hidden=false
        document.getElementById('redText').innerHTML='Alarm Set'
        document.getElementById('setButton').style.marginTop='10px'
        alarmTime = requested;
    }
}

var setButtton = document.getElementById('setButton');
setButtton.addEventListener('click', setAlarm);


