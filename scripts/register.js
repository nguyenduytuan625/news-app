'use strict';

// Selecting elements
const registerBtn = document.getElementById('btn-submit');
const firstnameInput = document.getElementById('input-firstname');
const lastnameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmpasswordInput = document.getElementById('input-password-confirm');

// Global variables
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY, '[]')).map(parseUser);

// Functions
const findUser = dataUserName => userArr.find(user => user.username === dataUserName);
const validate = function (data) {
  if (!data.firstname) { alert('Please fill in First Name'); }
  else if (!data.lastname) { alert('Please fill in Last Name'); }
  else if (!data.username) { alert('Please fill in Username'); }
  else if (!data.password) { alert('Please fill in Password'); }
  else if (!data.confirmpassword) { alert('Please fill in Confirm Password'); }
  else if (findUser(data.username)) { alert('Invalid Username'); }
  else if (data.password !== data.confirmpassword) { alert('Invalid Confirm Password'); }
  else if (data.password.length < 8) { alert('Password has at least 8 characters'); }
  else { return true; }
  return false;
}

// Registering the form
registerBtn.addEventListener('click', function () {
  const data = {
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    confirmpassword: confirmpasswordInput.value,
  };
  if (validate(data)) {
    const user = parseUser(data);
    userArr.push(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = '../pages/login.html';
  }
});

// localStorage.removeItem(KEY);
console.log(userArr);