const { CPCOLOUR, ChessPiece } = require('../../public/shared-js/structs')
const { generateEmptyBoardArray } = require('./utils')

class GameState {

	/**
	 * @param {number} gameId 
	 */
	constructor(gameId) {
		this.id = gameId
		this.playerW = null
		this.playerB = null
		/** @type ChessPiece[][] */
		this.gameBoard = generateEmptyBoardArray()
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
			return CPCOLOUR.white
		} else {
			this.playerB = player
			return CPCOLOUR.black
		}
	}

	getWinner() {
		return this.winner
	}

	getBoard(){
		return this.gameBoard
	}

	initValidMoves() {
		this.gameBoard.map(arr => arr.map(cp => cp.updateAvailableMoves()))
	}
}

module.exports = GameState
