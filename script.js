import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  }
  if (e.target.id === 'tweet-btn') {
    handleTweetBtnClick();
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
  } else {
    targetTweetObj.likes--;
  }

  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
  } else {
    targetTweetObj.retweets--;
  }

  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

  render();
}

function handleReplyClick(tweetId) {
  document.getElementById(`replies-${tweetId}`).classList.toggle('hidden');
}

function handleTweetBtnClick() {
  const tweetInput = document.querySelector('#tweet-input');

  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });

    tweetInput.value = '';

    render();
  }
}

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach((tweet) => {
    let likedClass = '';
    let retweetClass = '';
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

    if (isRetweeted) {
      retweetClass = 'retweeted';
    }

    if (isLiked) {
      likedClass = 'liked';
    }

    let repliesHtml = '';

    if (replies.length > 0) {
      replies.forEach((replie) => {
        repliesHtml += `
        <div class="tweet-reply">
          <div class="tweet-inner">
              <img src="${replie.profilePic}" class="profile-pic">
                  <div>
                      <p class="handle">${replie.handle}</p>
                      <p class="tweet-text">${replie.tweetText}</p>
                  </div>
          </div>
        </div>
     `;
      });
    }

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
                      <i class="fa-solid fa-heart ${likedClass}" data-like="${uuid}"></i>
                          ${likes}
                      </span>
                      <span class="tweet-detail">
                      <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${uuid}"></i>
                          ${retweets}
                      </span>
                  </div>   
              </div>            
          </div>
          <div class="hidden" id="replies-${uuid}">
            ${repliesHtml}
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
