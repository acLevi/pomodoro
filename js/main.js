const $openMenuButton = document.querySelector('.open-menu-button')
const $closeMenuButton = document.querySelector('.close-menu-button')
const $themeButton = document.querySelector('.theme-button')

setTimeout(() => {
  document.onload = openMenu()
}, 500)
$openMenuButton.addEventListener('click', openMenu)
$closeMenuButton.addEventListener('click', closeMenu)
$themeButton.addEventListener('click', toggleTheme)

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

let currentTheme = 'light'
function toggleTheme() {
  let r = document.querySelector(':root')
  if(currentTheme === 'light') {
    currentTheme = 'dark'
    $themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>'
    r.style.setProperty('--primary-color', '#191919')
    r.style.setProperty('--second-color', '#252525')
    r.style.setProperty('--text-color', '#e2e2e2')
  } else {
    currentTheme = 'light'
    $themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>'
    r.style.setProperty('--primary-color', '#ffffff')
    r.style.setProperty('--second-color', '#e7e7e7')
    r.style.setProperty('--text-color', '#36362f')
  }
}

