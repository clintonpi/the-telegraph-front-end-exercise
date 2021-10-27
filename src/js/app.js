const Utils = require('./utils');
const utils = new Utils();

/**
 * Displays comments in a DOM node
 * 
 * @param {string} commentsElementID The id of the DOM node to contain the comments
 * @param {array} commentsList An array of Comment objects
 */
function displayComments(commentsElementID, commentsList) {
  const { generateCommentUI, render } = utils;
  const commentHTML = generateCommentUI(commentsList);
  render(commentsElementID, commentHTML);
}

/**
 * Updates the comments count
 * 
 * @param {array} commentsList An array of Comment objects
 */
function updateCommentsCount(commentsList) {
  const { render } = utils;
  render('comments-count', `${commentsList.length} Comment${commentsList.length !== 1 ? 's' : ''}`);
}

/**
 * Handles the sorting of comments
 * 
 * @param {string} commentsElementID The id of the DOM node to containt the comments
 * @param {array} commentsList An array of Comment objects
 * @returns {function} A closure that sets up the "Sort by likes" button
 */
function useSortHandler(commentsElementID, commentsList) {
  let sortedComments;
  const SORT_BY_MOST_LIKES =  'Sort By Most Likes';
  const UNSORT =  'Unsort';

  const sortByLikesBtn = document.querySelector('#sort-by-likes');
  sortByLikesBtn.disabled = false;
	sortByLikesBtn.title = SORT_BY_MOST_LIKES;

  return () => {
    sortByLikesBtn.addEventListener('click', () => {
      if (sortByLikesBtn.classList.contains('btn-likes--sorted')) {
        sortByLikesBtn.classList.remove('btn-likes--sorted');
        sortByLikesBtn.title = SORT_BY_MOST_LIKES;
        displayComments(commentsElementID, commentsList);
      } else {
        if (sortedComments === undefined) {
          sortedComments = [...commentsList].sort((commentA, commentB) => commentB.likes - commentA.likes)
        }
        sortByLikesBtn.classList.add('btn-likes--sorted');
        sortByLikesBtn.title = UNSORT;
        displayComments(commentsElementID, sortedComments);
      }
    });
  };
}

(async () => {
  const commentsElementID = 'comments';
  const { fetchComments, composeErroMessage, render } = utils;
  
  try {
    const comments = await fetchComments();
    displayComments(commentsElementID, comments);
    updateCommentsCount(comments);
    const sortHandler = useSortHandler(commentsElementID, comments);
    sortHandler();
  } catch (e) {
    const errorHTML = composeErroMessage(e);
    render(commentsElementID, errorHTML);
  }
})();

// todo: add unit tests
