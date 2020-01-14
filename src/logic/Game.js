const { ChessPiece, TYPES, COLOUR, Position, piecesOrder } = require('../../public/shared-js/structs')

class Game {
	constructor(gameId) {
		this.id = gameId
		this.playerW = null
		this.playerB = null
		this.gameBoard = null

	}

	/**
	 * @param {any} playerB
	 */
	setPlayerB(playerB) {
		this.playerB = playerB
	}

	hasTwoConnectedPlayers() {
		return this.gameState == '2 JOINT'
	}

	addPlayer(p) {

		if (this.gameState != '0 JOINT' && this.gameState != '1 JOINT') {
			return new Error(`Invalid call to addPlayer, current state is ${this.gameState}`)
		}
	
		/*
	   * revise the game state
	   */
	
		var error = this.setStatus('1 JOINT')
		if (error instanceof Error) {
			this.setStatus('2 JOINT')
		}
	
		if (this.white == null) {
			this.white = p
			return 'W'
		} else {
			this.black = p
			return 'B'
		}
	}

	whoWon = function() {
		//too many wrong guesses? Player A (who set the word) won
		if (this.wrongGuesses > Setup.MAX_ALLOWED_GUESSES) {
			return 'A'
		}
		//word solved? Player B won
		if (this.visibleWordArray.indexOf('#') < 0) {
			return 'B'
		}
		return null //nobody won yet
	}

	// function AlphabetBoard(gs) {
// 	//only initialize for player that should actually be able to use the board
// 	this.initialize = function() {
// 		var elements = document.querySelectorAll('.alphabet')
// 		Array.from(elements).forEach(function(el) {
// 			el.addEventListener('click', function singleClick(e) {
// 				var clickedLetter = e.target.id
// 				new Audio('../data/click.wav').play()
// 				gs.updateGame(clickedLetter)

// 				/*
//          * every letter can only be selected once; handling this within
//          * JS is one option, here simply remove the event listener when a click happened
//          */
// 				el.removeEventListener('click', singleClick, false)
// 			})
// 		})
// 	}
// }
}

module.exports = Game
