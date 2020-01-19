import { COLOUR, ChessPiece, generateEmptyBoardArray, Position } from '../../public/lib/index.js'
import { getValidMoves } from './index.js'

/**
 * Class representing the GameState
 * @property {number} gameId
 * @property {WebSocket} playerW
 * @property {WebSocket} playerB
 * @property {ChessPiece[][]} gameBoard
 * @property {WebSocket} winner
 */
export class GameState {

	/** @param {number} gameId */
	constructor(gameId) {
		this.id = gameId

		/** @type {WebSocket} */
		this.playerW = null

		/** @type {WebSocket} */
		this.playerB = null

		/** @type ChessPiece[][] */
		this.gameBoard = generateEmptyBoardArray()

		/** @type {WebSocket} */
		this.winner = null

		this.initValidMoves()
	}

	/**
	 * Checks whether the current game has two players
	 * @returns {boolean}
	 */
	hasTwoConnectedPlayers() {
		return this.playerB !== null
	}

	/**
	 * If the current game is not full, adds the given player to the game
	 * @param {WebSocket} player 
	 * @throws {Error} Game already full
	 */
	addPlayer(player) {
		if (this.playerW && this.playerB) return new Error('Invalid call to addPlayer, Game full')

		if (this.playerW === null) {
			this.playerW = player
			return COLOUR.white
		} else {
			this.playerB = player
			return COLOUR.black
		}
	}

	/**
	 * @param {Position} start Position to move from
	 * @param {Position} target Position to move to
	 * @returns {void}
	 */
	movePiece(start, target) {
		//console.log(this.gameBoard[start.x][start.y])
		let piece = new ChessPiece(
			this.gameBoard[start.x][start.y].type,
			this.gameBoard[start.x][start.y].colour,
			this.gameBoard[start.x][start.y].position
		)

		this.gameBoard[start.x][start.y] = null
		piece.move(target)
		this.gameBoard[target.x][target.y] = piece
		piece.updateValidMoves(getValidMoves(this.gameBoard, piece))
	}

	/** @returns {WebSocket} The Winner */
	getWinner() {
		return this.winner
	}

	/** @returns {ChessPiece[][]} The Gameboard array */
	getBoard() {
		return this.gameBoard
	}

	/**
	 * Initialises the valid moves of each piece on the game board on game start
	 * @returns {void}
	 */
	initValidMoves() {
		console.log('initValidMoves')
		this.gameBoard.map(arr => arr
			.filter(Boolean)
			.map(cp => cp.updateValidMoves(getValidMoves(this.gameBoard, cp)))
		)
	}
}
