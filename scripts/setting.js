'use strict';

// Selecting elements
const pagesizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const savesettingsBtn = document.getElementById('btn-submit');

// Functions
const clearInput = function () {
  pagesizeInput.value = '';
  categoryInput.value = 'general';
}

// Saving settings
savesettingsBtn.addEventListener('click', function () {
  const pageSize = pagesizeInput.value;
  if (!pageSize) { alert('Please fill in News per page'); }
  else {
    saveToStorage('pageSize', pageSize);
    saveToStorage('category', categoryInput.value);
    clearInput();
  }
});