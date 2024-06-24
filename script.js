const burgerMenuOpenButton = document.querySelector(".main__menu-button")
const burgerMenuCloseButton = document.querySelector(".burger-menu__close-btn")
const burgerMenu = document.querySelector(".burger-menu")
const backgroundBlur = document.querySelector(".background-blur")
const body = document.querySelector('body');

burgerMenuOpenButton.addEventListener("click", () => {
  burgerMenu.classList.add("burger-menu_active")
  backgroundBlur.style = "display: flex"
  body.style = "overflow-y: hidden"
})

burgerMenuCloseButton.addEventListener("click", () => {
  burgerMenu.classList.remove("burger-menu_active")
  backgroundBlur.style = "display: none"
  body.style = "overflow-y: auto"
})