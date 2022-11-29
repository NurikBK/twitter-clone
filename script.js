import { tweetsData } from './data.js';

const tweetBtn = document.querySelector('#tweet-btn');
const feed = document.querySelector('#feed');
const tweetInput = document.querySelector('#tweet-input');

tweetBtn.addEventListener('click', () => {
  if (tweetInput.value !== '') {
    feed.innerHTML = getFeedHtml();
    tweetInput.value = '';
  }
});

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach((tweet) => {
    const {
      handle,
      profilePic,
      likes,
      retweets,
      tweetText,
      replies,
      isLiked,
      isRetweeted,
      uuid,
    } = tweet;

    feedHtml += `
        <div class="tweet">
          <div class="tweet-inner">
              <img src="${profilePic}" class="profile-pic">
              <div>
                  <p class="handle">${handle}</p>
                  <p class="tweet-text">${tweetText}</p>
                  <div class="tweet-details">
                      <span class="tweet-detail">
                          ${replies.length}
                      </span>
                      <span class="tweet-detail">
                          ${likes}
                      </span>
                      <span class="tweet-detail">
                          ${retweets}
                      </span>
                  </div>   
              </div>            
          </div>
      </div>
    `;

  });
    return feedHtml;
}

