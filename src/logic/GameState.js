const { CPCOLOUR, ChessPiece } = require('../../public/shared-js/structs')
const { generateEmptyBoardArray } = require('../../public/shared-js/utils')

class GameState {

	/**
	 * @param {number} gameId 
	 */
	constructor(gameId) {
		this.id = gameId
		this.playerW = null
		this.playerB = null
		/** @type ChessPiece[][] */
		this.gameBoard = EmptyBoardArray()
		this.winner = null
	}

	hasTwoConnectedPlayers() {
		return this.playerB !== null
	}

	addPlayer(player) {
		if (this.playerW && this.playerB) {
			return new Error('Invalid call to addPlayer, Game full')
		}

		if (this.playerW === null) {
			this.playerW = player
			return COLOUR.white
		} else {
			this.playerB = player
			return COLOUR.black
		}
	}

	getWinner() {
		return this.winner
	}

	initValidMoves() {
		this.gameBoard.map(arr => arr.map(cp => cp.updateAvailableMoves()))
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
