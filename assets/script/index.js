const cartMenuItem = document.querySelector('.user-profile-li .cart')
const profileItem = document.querySelector('.profile span')
const modal = document.querySelector('.modal-container')
const modalNoButton = document.querySelector('.modal-container .no');
const modalYesButton = document.querySelector('.modal-container .yes');
const logoutButton = document.querySelector('.logout-button');


logoutButton.addEventListener('click', () => {
  modal.classList.add('active')
})

modalNoButton.addEventListener('click', () => {
  modal.classList.remove('active')
})

modalYesButton.addEventListener('click', () => {
  localStorage.removeItem('userData')
  modal.classList.remove('active')

  // here down below should be the link of the file to which this page is to take you!!! 
  // window.location.href = 'link of the file'
})

const handleProfileChange = () => {
  let userData = JSON.parse(localStorage.getItem('userData'))
  if (userData?.username) {
    profileItem.innerText = userData?.username
  }
}

handleProfileChange()

cartMenuItem.addEventListener('click', () => {

  // here down below should be the link of the cart file!!!
  // window.location.href = 'link of  the file'
})