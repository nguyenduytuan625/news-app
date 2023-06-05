'use strict';

// Selecting elements
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

// Global variables
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY, '[]')).map(parseUser);

// Functions
const findUser = data => userArr.find(user => user.username === data.username && user.password === data.password);

// Loging in 
loginBtn.addEventListener('click', function () {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value
  };
  const user = findUser(data);
  if (user) {
    saveToStorage('currentUser', JSON.stringify(user));
    window.location.href = '../index.html';
  }
});
