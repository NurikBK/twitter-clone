import { tweetsData } from './data.js';

const tweetBtn = document.querySelector('#tweet-btn');
const feed = document.querySelector('#feed');
const tweetInput = document.querySelector('#tweet-input');

tweetBtn.addEventListener('click', () => {
  if (tweetInput.value !== '') {
    feed.innerHTML += `
      <p>${tweetInput.value}</p>
    `;
    tweetInput.value = '';
  }
});
