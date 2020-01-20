import { COLOUR, ChessPiece, generateEmptyBoardArray, Position, T_MOVE_PIECE, sendUpdatedBoard, S_YOUR_TURN, Player } from '../../public/lib/index.js'
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

		/** @type {Player} */
		this.playerW = null

		/** @type {Player} */
		this.playerB = null

		/** @type ChessPiece[][] */
		this.gameBoard = generateEmptyBoardArray()

		/** @type {Player} */
		this.winner = null

		this.setValidMoves()
	}

	/**
	 * Checks whether the current game has two players
	 * @returns {boolean}
	 */
	hasTwoConnectedPlayers() {
		return this.playerB.id !== null
	}

	/**
	 * If the current game is not full, adds the given player to the game
	 * @param {WebSocket} playerId
	 * @throws {Error} Game already full
	 */
	addPlayer(playerId) {
		if (!this.playerW) {
			this.playerW = new Player(playerId, COLOUR.white)
			return COLOUR.white
		} else {
			this.playerB = new Player(playerId, COLOUR.black)
			return COLOUR.black
		}
	}

	/**
	 * @param {Position} start Position to move from
	 * @param {Position} target Position to move to
	 * @returns {void}
	 */
	movePiece(start, target) {
		// console.log(this.gameBoard[start.x][start.y])
		let piece = this.gameBoard[start.x][start.y]
		this.gameBoard[start.x][start.y] = null

		let cell = this.gameBoard[target.x][target.y]
		this.gameBoard[target.x][target.y] = piece
		piece.move(target)

		if (cell) {
			(cell.colour === COLOUR.white) 
				? this.playerW.capturePiece(cell)
				: this.playerB.capturePiece(cell)
		}

		this.checkWinStatus() // do something with it
		
		this.setValidMoves()
	}

	/** @returns {WebSocket} The Winner */
	getWinner() {
		return this.winner
	}

	/** @returns {ChessPiece[][]} The Gameboard array */
	getBoard() {
		return this.gameBoard
	}

	checkWinStatus() {
		if (this.playerW.hasCapturedKing()) this.winner = this.playerW
		else if (this.playerB.hasCapturedKing()) this.winner = this.playerB
	}

	/**
	 * Initialises the valid moves of each piece on the game board on game start
	 * @returns {void}
	 */
	setValidMoves() {
		this.gameBoard.map(arr => arr
			.filter(Boolean)
			.map(cp => cp.updateValidMoves(getValidMoves(this.gameBoard, cp)))
		)
	}

	/**
	 * @param {object} message
	 * @param {WebSocket} connection
	 */
	messageHandler(message, connection)  {
		let currentPlayerIsWhite = this.playerW === connection

		switch (message.type) {
			case T_MOVE_PIECE:
				console.log(message.data)
				this.movePiece(message.data.from, message.data.to)

				sendUpdatedBoard(this)

				currentPlayerIsWhite ? this.playerB.send(S_YOUR_TURN) : this.playerW.send(S_YOUR_TURN)
				break
		}
	}
}
