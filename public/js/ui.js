const Game = require('../scripts/Game')

module.exports.default = function emptyGameBoard() {
	const canvas = document.getElementById('game-board')
	console.log('BOAAAARD')
	const ctx = canvas.getContext('2d')
	let height = canvas.style.height
			
	const board = Array(8).map((el, i) => Array(8).map((square, j) => {
		return Game.prototype.pieceMapper(i, j)
	}))
}
