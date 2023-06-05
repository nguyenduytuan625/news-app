'use strict';

// Selecting elements
const maincontentEl = document.getElementById('main-content');
const loginmodalEl = document.getElementById('login-modal');
const logoutBtn = document.getElementById('btn-logout');
const welcomemessageEl = document.getElementById('welcome-message');

// Global variables
const currentUser = parseUser(JSON.parse(getFromStorage('currentUser', '{}')));

// Functions
const init = function () {
  if (currentUser.firstname) {
    loginmodalEl.style.display = 'none';
    maincontentEl.style.display = 'block';
    welcomemessageEl.textContent = `Welcome ${currentUser.firstname}`;
  } else {
    loginmodalEl.style.display = 'block';
    maincontentEl.style.display = 'none';
    welcomemessageEl.textContent = `Please Login or Register`;
  }
};
init();

// Loging out
logoutBtn.addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = './pages/login.html';
});

console.log(getFromStorage('currentUser', '{}'));