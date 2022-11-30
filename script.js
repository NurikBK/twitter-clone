import { tweetsData } from './data.js';

const tweetBtn = document.querySelector('#tweet-btn');
const tweetInput = document.querySelector('#tweet-input');

tweetBtn.addEventListener('click', () => {
  if (tweetInput.value !== '') {
    tweetInput.value = '';
  }
});

document.addEventListener('click', (e) => {
  const like = e.target.dataset.like;
  if (like) {
    handleLikeClick(like);
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
    targetTweetObj.isLiked = true;
  } else {
    targetTweetObj.isLiked = false;
    targetTweetObj.likes--;
  }

  render();
}

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
                      <i class="fa-regular fa-comment-dots" data-reply="${uuid}"></i>
                          ${replies.length}
                      </span>
                      <span class="tweet-detail">
                      <i class="fa-solid fa-heart" data-like="${uuid}"></i>
                          ${likes}
                      </span>
                      <span class="tweet-detail">
                      <i class="fa-solid fa-retweet" data-retweet="${uuid}"></i>
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

function render() {
  document.querySelector('#feed').innerHTML = getFeedHtml();
}

render();
