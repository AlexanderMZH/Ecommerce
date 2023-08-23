const checkAuthorization = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData?.token) {
    window.location.href = 'file:///E:/Digital%20Institute/26.api/index.html'
    return
  }
}

checkAuthorization()


const registerLink = document.querySelector('.register-link')
const loginLink = document.querySelector('.login-link')
const signInContainer = document.querySelector('.sign-in.authorization-container')
const signUpContainer = document.querySelector('.sign-up.authorization-container')
const signInInputs = document.querySelectorAll('.sign-in.authorization-container input:not(#remember-me)')
const singUpInputs = document.querySelectorAll('.sign-up.authorization-container input')
const signInButton = document.querySelector('#sing-in-button');
const signUpButton = document.querySelector('#sign-up-button');
const loader = document.querySelector('.loader-container');
const errorTextElement = document.querySelector('.error-text')
const modalButton = document.querySelector('.modal-container button')
const modal = document.querySelector('.modal-container')
const users = [];

modalButton.addEventListener('click', () => {
  modal.classList.remove('active')
})

registerLink.addEventListener('click', () => {
  signInContainer.classList.remove('active')
  signUpContainer.classList.add('active')
})

loginLink.addEventListener('click', () => {
  signUpContainer.classList.remove('active')
  signInContainer.classList.add('active')
})

const singInObject = {
  email: '',
  password: '',
  remember: false
}

const signUpObject = {
  email: '',
  username: '',
  password: '',
  repeat_password: ''
}

const handleSingInInputChange = (event) => {
  singInObject[event.target.name] = event.target.value
}

for (let i = 0; i < signInInputs.length; i++) {
  signInInputs[i].addEventListener('keyup', handleSingInInputChange)
}


signInButton.addEventListener('click', () => {
  const { email, password } = singInObject;
  if (
    !email ||
    email === '' ||
    !password ||
    password === ''
  ) {
    alert('you need to fill all inputs')
    return
  }

  if (password.length < 6) {
    alert('password value is too short')
    return
  }

  handleAuthorization(email, password)

})

const handleAuthorization = (username, password) => {
  loader.classList.add('active')
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      // expiresInMins: 60, // optional
    })
  })
    .then(res => res.json())
    .then((data) => {
      if (data.message) {
        errorTextElement.innerText = data.message
        modal.classList.add('active')
        loader.classList.remove('active')
        return
      }
      localStorage.setItem('userData', JSON.stringify(data))

      // here down below should be the link of the file to which this page is to take you!!!

      // window.location.href = "link of the file"
      console.log(data)
      loader.classList.remove('active')
    })
    .catch((error) => {
      console.log(error)
      loader.classList.remove('active')
    });
}

const handleRegistration = () => {
  for (let i = 0; i < singUpInputs.length; i++) {
    signUpObject[singUpInputs[i].name] = singUpInputs[i].value
  }
  const { email, username, password, repeat_password } = signUpObject;
  if (password !== repeat_password) {
    alert('passwords are not same')
    return;
  }

  users.push(signUpObject)
  signUpObject.email = ''
  signUpObject.password = ''
  signUpObject.username = ''
  signUpObject.repeat_password = ''
  for (let i = 0; i < singUpInputs.length; i++) {
    singUpInputs[i].value = ''
  }
  alert('successfull registration')
  console.log(users)
}

signUpButton.addEventListener('click', handleRegistration)