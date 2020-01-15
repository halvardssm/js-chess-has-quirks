const { COLOUR } = require('../../public/shared-js/structs')

class GameState {
	constructor(gameId) {
		this.id = gameId
		this.playerW = null
		this.playerB = null
		this.gameBoard = null
		this.winner = null
	}

	/**
	 * @param {any} playerB
	 */
	setPlayerB(playerB) {
		this.playerB = playerB
	}

	hasTwoConnectedPlayers() {
		return this.playerB != null
	}

	addPlayer(player) {
		if (this.playerW && this.playerB) {
			return new Error('Invalid call to addPlayer, Game full')
		}
	
		if (this.playerW == null) {
			this.playerW = player
			return COLOUR.white
		} else {
			this.black = player
			return COLOUR.black
		}
	}

	getWinner(){
		return this.winner
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

module.exports = GameState
