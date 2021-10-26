/**
 * A function that tries to fetch comments.
 * 
 * @returns {Promise<array> | Object} A `Promise` of an array of comment objects or an `Object` with an error message
 */
const fetchComments = async () => {
  try {
    const commentsPromise = await fetch('https://my-json-server.typicode.com/telegraph/frontend-exercise/comments');
    return commentsPromise.json();
  } catch {
    return { error: new Error('Unable to load comments. Please check your internet connection.') };
  }
};

module.exports = fetchComments;
