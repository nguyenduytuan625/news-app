'use strict';

// Selecting elements
const newscontainerEl = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pagenumEl = document.getElementById('page-num');

// Global variables
const currentUser = parseUser(JSON.parse(getFromStorage('currentUser', '{}')));
const country = 'us';
const category = getFromStorage('category', 'general');
const pageSize = +getFromStorage('pageSize', '5');
let curPageNum = 1, totalResults;

// Functions
const renderPageNum = function () {
  pagenumEl.textContent = curPageNum;
  if (curPageNum === 1) {
    prevBtn.style.display = 'none';
    if (curPageNum * pageSize < totalResults) { nextBtn.style.display = 'block'; }
    else { nextBtn.style.display = 'none'; }
  }
  else if (curPageNum * pageSize >= totalResults) {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'block';
  }
  else {
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  }
};
const renderArticles = function (articles) {
  newscontainerEl.innerHTML = '';
  articles.forEach(article => {
    const html = `
      <div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src=${article.urlToImage} class="card-img"
                alt="">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href=${article.url} class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    newscontainerEl.insertAdjacentHTML('beforeend', html);
  });
};

// Fetching data
User.prototype.getNews = async function () {
  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}` +
      `&pageSize=${pageSize}&page=${curPageNum}&apiKey=88d76dfbfe744e2482aa931495e257cf`);
    const data = await res.json();
    console.log(data);
    if (data.status !== 'ok') { return new Error('Cannot receive data!'); }
    console.log(data.articles[0]);
    totalResults = +data.totalResults;
    renderPageNum();
    renderArticles(data.articles);
  } catch (err) {
    console.error(err);
  }
};

// Next page
nextBtn.addEventListener('click', function () {
  if (curPageNum * pageSize < totalResults) { curPageNum += 1; }
  renderPageNum();
  if (currentUser.username) { currentUser.getNews(); }
});

// Previous page
prevBtn.addEventListener('click', function () {
  if (curPageNum > 1) { curPageNum -= 1; }
  renderPageNum();
  if (currentUser.username) { currentUser.getNews(); }
});

// Initialization
const init = function () {
  newscontainerEl.innerHTML = '';
  if (currentUser.username) {
    currentUser.getNews();
  }
};
init();
