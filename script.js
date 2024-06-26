const burgerMenuOpenButton = document.querySelector(".main__menu-button")
const burgerMenuCloseButton = document.querySelector(".burger-menu__close-btn")
const burgerMenu = document.querySelector(".burger-menu")
const backgroundBlur = document.querySelector(".background-blur")
const body = document.querySelector('body');
const inputName = document.getElementById("contacts__form-input-name")
const inputNameError = document.querySelector(".contacts__form-input-name-error")
const inputEmail = document.getElementById("contacts__form-input-email")
const inputEmailError = document.querySelector(".contacts__form-input-email-error")
const textAreaMessage = document.getElementById("contacts__form-message")
const textAreaMessageError = document.querySelector(".contacts__form-message-error")
const form = document.querySelector(".contacts__form")
const formSubmitButton = document.querySelector(".contacts__form-button")
const checkboxAllowSubmit = document.querySelector(".contacts__form-allow-submit")
const checkboxAllowBlock = document.querySelector(".contacts__form-checkbox")


//burger menu
burgerMenuOpenButton.addEventListener("click", () => {
  burgerMenu.classList.add("burger-menu_active")
  backgroundBlur.style = "display: flex"
})

burgerMenuCloseButton.addEventListener("click", () => {
  burgerMenu.classList.remove("burger-menu_active")
  backgroundBlur.style = "display: none"
})


//form
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const validation = validationForm()
  const checked = checkboxChecked()
  validation && checked && sendFormToServer()
})

let isLoading = false

const sendFormToServer = async () => {
  isLoading = true
  loaderSubmitButton()
  try {
    await fetch("https://636de0e191576e19e3326ef1.mockapi.io/all/Projects", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputName.value, 
        email: inputEmail.value,
        message: textAreaMessage.value,
      })
    })
    .then((response) => response.json())
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading = false
    loaderSubmitButton()
    inputName.value = ""
    inputEmail.value = ""
    textAreaMessage.value = ""
    checkboxAllowSubmit.checked = false
  }
}


//loader
const loader = `<div class="loader"></div>`

const loaderSubmitButton = () => {
  formSubmitButton.innerHTML = isLoading ? loader : "Отправить сообщение"
}


//validation
const validationName = (name) => {
  const regEx = /^[A-Za-zА-Яа-яЁё]{2,30}$/;
  const splitName = name.split(" ");
  const result = splitName.every((item) => regEx.test(item))
  if(!result) {
    inputName.classList.add("contacts__form_invalid")
    if(name === "") {
      inputNameError.innerHTML = "Поле имени не должно быть пустым"
      return false
    } else if(name.length < 2 || name.length > 30) {
      inputNameError.innerHTML = "Имя должно содержать от 2 до 30 букв"
    } else {
      inputNameError.innerHTML = "Не допускаются цифры и символы"
    }
  } else {
    inputNameError.innerHTML = ""
    inputName.classList.remove("contacts__form_invalid")
  }
  return result
}

const validationEmail = (email) => {
  const regEx = /(\w\.?)+@[\w\.-]+\.\w{2,}/;
  const result = regEx.test(email)
  if(!result) {
    inputEmail.classList.add("contacts__form_invalid")
    if(email === "") {
      inputEmailError.innerHTML = "Поле почты не должно быть пустым"
      return false
    } else {
      inputEmailError.innerHTML = "Почта должна иметь следующий формат: example@mail.com"
    }
  } else {
    inputEmailError.innerHTML = ""
    inputEmail.classList.remove("contacts__form_invalid")
  }
  return result
}

const validationMessage = (message) => {
  const result = message === "" ? false : true
  if(!result) {
    textAreaMessage.classList.add("contacts__form_invalid")
    textAreaMessageError.innerHTML = "Поле сообщения не должно быть пустым"
  } else {
    textAreaMessageError.innerHTML = ""
    textAreaMessage.classList.remove("contacts__form_invalid")
  }
  return result
}

const validationForm = () => {
  const validName = validationName(inputName.value)
  const validEmail = validationEmail(inputEmail.value)
  const validMessage = validationMessage(textAreaMessage.value)
  return validName && validEmail && validMessage
}

const checkboxChecked = () => {
  if(window.innerWidth <= 1000) {
    checkboxAllowBlock.style = checkboxAllowSubmit.checked ? "" : "color: #ff1111;"
  }
  return window.innerWidth >= 1000 ? true : checkboxAllowSubmit.checked
}


//Фибоначчи
const fun = (n) => {
  if(n <= 1) {
    return n
  } else {
    return fun(n - 2) + fun(n - 1)
  }
}