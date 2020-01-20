import { COLOUR, ChessPiece, generateEmptyBoardArray, Position, T_MOVE_PIECE, sendUpdatedBoard, S_YOUR_TURN, Player, O_GAME_OVER } from '../../public/lib/index.js'
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
		return this.playerB !== null
	}

	/**
	 * If the current game is not full, adds the given player to the game
	 * @param {WebSocket} playerId
	 * @throws {Error} Game already full
	 */
	addPlayer(playerId) {
		if (!this.playerW) {
			this.playerW = new Player(playerId, COLOUR.white)
			return this.playerW
		} else {
			this.playerB = new Player(playerId, COLOUR.black)
			return this.playerB
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
				? this.playerB.capturePiece(cell)
				: this.playerW.capturePiece(cell)
		}

		this.getWinStatus()
			? this.endGame()
			: this.setValidMoves()
	}
	
	endGame() {
		const message = O_GAME_OVER
		message.data = this.winner
		const msgString = JSON.stringify(message)

		this.playerW.id.send(msgString)
		this.playerB.id.send(msgString)
	}

	/** @returns {Player} The Winner */
	getWinner() {
		return this.winner
	}

	/** @returns {ChessPiece[][]} The Gameboard array */
	getBoard() {
		return this.gameBoard
	}

	getWinStatus() {
		if (this.playerW.hasCapturedKing()) this.winner = this.playerW
		else if (this.playerB.hasCapturedKing()) this.winner = this.playerB
		return this.winner
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
		let currentPlayerIsWhite = this.playerW.id === connection

		switch (message.type) {
			case T_MOVE_PIECE:
				this.movePiece(message.data.from, message.data.to)

				sendUpdatedBoard(this)

				currentPlayerIsWhite ? this.playerB.id.send(S_YOUR_TURN) : this.playerW.id.send(S_YOUR_TURN)
				break
		}
	}
}
