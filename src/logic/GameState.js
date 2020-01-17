import { COLOUR, ChessPiece } from '../../public/lib/index.js'
import { generateEmptyBoardArray } from './index.js'
import { updateAvailableMoves } from './logic.js'

export class GameState {

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
			return COLOUR.white
		} else {
			this.playerB = player
			return COLOUR.black
		}
	}

	getWinner() {
		return this.winner
	}

	getBoard() {
		return this.gameBoard
	}

	initValidMoves() {
		this.gameBoard.map(arr => arr.map(cp => cp.updateValidMoves(
			[...updateAvailableMoves(this.gameBoard, cp)]
		)))
	}
}
