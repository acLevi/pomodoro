// Display vars
const displayMinutes = document.querySelector('.display-minutes')
const displaySeconds = document.querySelector('.display-seconds')
const counterDiv = document.querySelector('.break-counter')
const statusDiv = document.querySelector('.status')

// Input vars
const inputMinutes = document.querySelector('#minutes-input')
const inputPauseMinutes = document.querySelector('#pause-input')
const inputBreaks = document.querySelector('#breaks-input')

// Buttons vars
const $openMenuButton = document.querySelector('.open-menu-button')
const $closeMenuButton = document.querySelector('.close-menu-button')
const $themeButton = document.querySelector('.theme-button')
const $startButton = document.querySelector('.start-button')

// Audio vars
clickAudio = document.querySelector('#clickAudio')
endTimerAudio = document.querySelector('#endTimerAudio')
finishedTimerAudio = document.querySelector('#finishedTimerAudio')
workTimeAudio = document.querySelector('#workTimeAudio')


// Open/Close Menu & Theme Button Eventlisteners
$openMenuButton.addEventListener('click', openMenu)
$closeMenuButton.addEventListener('click', closeMenu)
$themeButton.addEventListener('click', toggleTheme)

// Open/Close Menu functions
function openMenu(){
  let x = document.querySelector('.sidebar')
  x.style.width = '250px'
  x.style.padding = '80px 2% 2% 2%'
}

function closeMenu() {
  let x = document.querySelector('.sidebar')
  x.style.width = '0'
  x.style.padding = '80px 0 0 0'
}

// Change Theme function
let currentTheme = localStorage.getItem('theme')
function toggleTheme() {
  if(currentTheme === 'light') {
    currentTheme = 'dark'
    setTheme()
  } else {
    currentTheme = 'light'
    setTheme()
  }
}

function setTheme() {
  let r = document.querySelector(':root')
  if(currentTheme === 'dark') {
    currentTheme = 'dark'
    $themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>'
    r.style.setProperty('--primary-color', '#191919')
    r.style.setProperty('--second-color', '#252525')
    r.style.setProperty('--text-color', '#e2e2e2')
    localStorage.setItem('theme', currentTheme)
  } else {
    currentTheme = 'light'
    $themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>'
    r.style.setProperty('--primary-color', '#ffffff')
    r.style.setProperty('--second-color', '#e7e7e7')
    r.style.setProperty('--text-color', '#36362f')
    localStorage.setItem('theme', currentTheme)
  }
}

window.onload = setTheme()

// Set display values
let minutes;
let pauseMinutes;
let breaks;

let minutesTimer
let pauseMinutesTimer
let secondsTimer = 0
let breaksCount = -1

inputMinutes.addEventListener('change', applySettings)
inputBreaks.addEventListener('change', applySettings)

function applySettings() {
  minutes = parseInt(inputMinutes.value)
  pauseMinutes = parseInt(inputPauseMinutes.value)
  breaks = parseInt(inputBreaks.value)
  minutesTimer = minutes
  // pauseMinutesTimer = pauseMinutes
  // secondsTimer = secondsValue
  displayMinutes.textContent = minutes >= 10 ? minutes : `0${minutes}`
}

// debug
window.onload = applySettings()

// Timer function
function timer() {  
    if(secondsTimer !== 0){
      secondsTimer = secondsTimer - 1
    } else {
      secondsTimer = 59
      minutesTimer -= 1
      if (minutesTimer === -1){
        breaksCount += 1
        secondsTimer = 0
        if (breaksCount !== breaks + 2){
          if (breaksCount % 2 === 0){
            counterDiv.innerHTML += '<i class="fa-solid fa-circle"></i>'
            pauseTimer()
            endTimerAudio.play()
            statusDiv.textContent = 'rest'
            minutesTimer = pauseMinutes
          } else {
            workTimeAudio.play()
            pauseTimer()
            statusDiv.textContent = 'work'
            minutesTimer = minutes
          }
        } else {
          finishedTimerAudio.play()
          breaksCount = -1
          minutesTimer = minutes
          pauseTimer()
          statusDiv.textContent = 'finished'
          counterDiv.innerHTML = ''
        }
      }
    }

  displayMinutes.textContent = minutesTimer >= 10 ? minutesTimer : `0${minutesTimer}`
  displaySeconds.textContent = secondsTimer >= 10 ? secondsTimer : `0${secondsTimer}`
  document.querySelector('title').textContent = `${minutesTimer >= 10 ? minutesTimer : '0' + minutesTimer} : ${secondsTimer >= 10 ? secondsTimer : '0' + secondsTimer}`
}

// Start timer
$startButton.addEventListener('click', startAndPauseButton)

let isOn = false
let finished = false
let timerInterval;

function startAndPauseButton() {
  clickAudio.play()
  if(isOn){
    enableInputs()
    pauseTimer()
  } else {
    disableInputs()
    // statusDiv.textContent = 'work'
    $startButton.textContent = 'pause'
    isOn = true
    timerInterval = setInterval(timer, 1000)
    if(finished){
      counterDiv.innerHTML = ''
    }
  }
}

function pauseTimer() {
  statusDiv.textContent = 'paused'
  $startButton.textContent = 'start'
  isOn = false
  clearInterval(timerInterval)
}

// useful functions
function disableInputs() {
  inputMinutes.setAttribute('disabled', 'disabled')
  inputBreaks.setAttribute('disabled', 'disabled')
  inputPauseMinutes.setAttribute('disabled', 'disabled')
}

function enableInputs() {
  inputMinutes.removeAttribute('disabled')
  inputBreaks.removeAttribute('disabled')
  inputPauseMinutes.removeAttribute('disabled')
}