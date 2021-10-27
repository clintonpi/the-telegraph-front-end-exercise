/**
 * A function that generates the UI of the comments
 * 
 * @param {Object[]} commentsList - An `array` of comment objects
 * @returns {string} A `string` of UI snippets for all comments
 */
const generateCommentUI = (commentsList) => commentsList.map(
	(comment) => `
		<div id="comment-${comment.id}" class="comment flex flex-col justify-between py-4">
			<div class="comment__main">
				<h3 class="comment__name font-serif">${comment.name}</h3>
				<p class="comment__body">${comment.body}</p>
			</div>
			<span class="comment__likes font-serif">${comment.likes} Like${comment.likes !== 1 ? 's' : ''}</span>
		</div>
	`).join('');

module.exports = generateCommentUI;
