((exports) => {
	exports.PORT = 2000
	exports.WEB_SOCKET_BASE_URL = 'ws://localhost:'
	exports.WEB_SOCKET_URL = `${exports.WEB_SOCKET_BASE_URL}${exports.PORT}`
	exports.STATUS = {
		gameWon: 'Congratulations! You won!',
		gameLost: 'Game over. You lost!',
		playAgain: ' <a href=\'/play\'>Play again!</a>'
	}
	exports.STATUS.aborted = 'Your gaming partner is no longer available, game aborted. ' + exports.STATUS['playAgain']
	
	
})(typeof exports === 'undefined' ? (this.Config = {}) : exports)
