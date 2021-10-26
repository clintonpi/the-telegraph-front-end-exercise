const fetchComments = require('./fetchComments');
const generateCommentUI = require('./generateCommentUI');
const { SORT_BY_MOST_LIKES, UNSORT } = require('./constants');

/**
 * A function that tries to display the comments and setup other necessary features
 * 
 * @returns {boolean} `false` if the comments were not initialised or `true` if they were
 */
const setupComments = async () => {
  const commentsList = await fetchComments();
  const commentsElement = document.querySelector('#comments');

  if (commentsList.error) {
    commentsElement.innerHTML = `<p class="m-auto py-4">${commentsList.error.toString()}</p>`;

    return false;
  }

  const commentsInnerHTML = generateCommentUI(commentsList);
  const sortByLikesBtn = document.querySelector('#sort-by-likes');
  let sortedCommentsList;
  let sortedCommentsInnerHTML;

  commentsElement.innerHTML = commentsInnerHTML;

  document.querySelector("#comments-count").textContent = `${commentsList.length} Comment${commentsList.length !== 1 ? 's' : ''}`;

  sortByLikesBtn.disabled = false;
  sortByLikesBtn.title = SORT_BY_MOST_LIKES;

  sortByLikesBtn.addEventListener('click', () => {
    if (sortByLikesBtn.classList.contains('btn-likes--sorted')) {
      commentsElement.innerHTML = commentsInnerHTML;

      sortByLikesBtn.classList.remove('btn-likes--sorted');
      sortByLikesBtn.title = SORT_BY_MOST_LIKES;
    } else {
      sortedCommentsList = sortedCommentsList || commentsList.sort((commentA, commentB) => commentB.likes - commentA.likes);
    
      sortedCommentsInnerHTML = sortedCommentsInnerHTML || generateCommentUI(sortedCommentsList);
  
      commentsElement.innerHTML = sortedCommentsInnerHTML;

      sortByLikesBtn.classList.add('btn-likes--sorted');
      sortByLikesBtn.title = UNSORT;
    }
  });

  return true;
};

module.exports = setupComments;
