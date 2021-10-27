/**
 * Utility class that provides functions to work with comments
 */
class Utils {
	constructor() {
		this.URL = 'https://my-json-server.typicode.com/telegraph/frontend-exercise/comments';
		this.fetchComments = this.fetchComments.bind(this);
		this.generateCommentUI = this.generateCommentUI.bind(this);
		this.composeErroMessage = this.composeErroMessage.bind(this);
		this.render = this.render.bind(this);
	}

	/**
	 * Renders HTML inside a DOM node
	 * 
	 * @param {string} elementID The id of the element to be rendered into
	 * @param {string} HTML The HTML string to be rendered
	 */
	render(elementID, HTML) {
		const node = document.querySelector(`#${elementID}`);
		node.innerHTML = HTML;
	}

	/**
	 * Tries to fetch comments
	 * 
	 * @returns {Promise<array> | Error} A promise of an array of Comment objects
	 */
	async fetchComments() {
		try {
			const commentsPromise = await fetch(this.URL);
			return commentsPromise.json();
		} catch {
			throw new Error('Unable to load comments. Please check your internet connection.');
		}	
	}

	/**
	 * Composes the comment structure from the recieved Comment object
	 * 
	 * @param {Object} comment A Comment object
	 * @returns {string} A composed HTML string utilising the properties if the Comment object
	 */
	composeComment(comment) {
		return `
			<div id="comment-${comment.id}" class="comment flex flex-col justify-between py-4">
				<div class="comment__main">
					<h3 class="comment__name font-serif">${comment.name}</h3>
					<p class="comment__body">${comment.body}</p>
				</div>
				<span class="comment__likes font-serif">${comment.likes} Like${comment.likes !== 1 ? 's' : ''}</span>
			</div>
		`;
	}

	/**
	 * Generates the UI of each comment from a list of Comment objects
	 * 
	 * @param {array} commentsList An array of Comment objects
	 * @returns {string} A HTML string of composed comments
	 */
	generateCommentUI(commentsList) {
		return commentsList.map(comment => this.composeComment(comment)).join('');
	}

	/**
	 * Composes the structure of an error message from an error object
	 * 
	 * @param {Error} error An error object
	 * @returns {string} A HTML string composed with the error message
	 */
	composeErroMessage(error) {
		return `<p class="m-auto py-4 font-serif">${error.message}</p>`;
	}
}

module.exports = Utils;
