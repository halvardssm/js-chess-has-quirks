import { T_GAME_START, T_MOVE_PIECE } from '../../public/shared-js/messages.js'
import { ChessPiece, Position, TYPES, COLOUR } from '../../public/shared-js/structs.js'
import GameState from './GameState.js'

/**
 * @param {ChessPiece[][]} gameBoard
 * @param {ChessPiece} piece
 */
export const updateAvailableMoves = (gameBoard, piece) => {
	gameBoard.map(arr => arr.map())
}

/**
 * @param {ChessPiece[][]} board
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @return {boolean}
 */
export const validateMove = (board, piece, end) => {
	let start = new Position(piece.position.x, piece.position.y)

	switch (piece.type) {
		case TYPES.pawn:
			return pawnLogic(board, start, end)

		case TYPES.rook:
			return rookLogic(board, start, end)

		case TYPES.knight:
			return knightLogic(board, start, end)

		case TYPES.bishop:
			return bishopLogic(board, start, end)

		case TYPES.queen:
			return queenLogic(board, start, end)

		case TYPES.king:
			return kingLogic(board, start, end)

		default:
			console.log('Invalid piece given')
			return false
	}
}

/**
 * @param {ChessPiece[][]} board
 * @param {string} colour
 * @param {Position} start 
 * @param {Position} end 
 */
export const pawnLogic = (board, colour, start, end) => {
	let direction = (colour === 'BLACK') ? -1 : 1

	if (start.x === end.x) {
		return true
	}
}

export const rookLogic = (board, start, end) => isStraight(start, end)
	? rookLogicHelper(board, start, end)
	: false

export const rookLogicHelper = (board, position, end) => {

}

export const knightLogic = (board, start, end) => { }

export const bishopLogic = (board, start, end) => isDiagonal(start, end)
	? bishopHelper(board, start, end)
	: false

export const bishopHelper = (curr, end) => {

}

export const queenLogic = (board, start, end) => 'this is a return value'

/**
 * 
 * @param {ChessPiece[][]} board 
 * @param {COLOUR} colour
 * @param {Position} start 
 * @param {Position} end 
 */
export const kingLogic = (board, colour, start, end) => containsPieceColour(colour, end)
	? false
	: (Math.abs(end.x - start.x) <= 1 && Math.abs(end.y - start.y) <= 1)

/**
 * 
 * @param {Position} pos1 
 * @param {Position} pos2 
 */
export const isDiagonal = (pos1, pos2) => Math.abs(pos1.x - pos2.x) === Math.abs(pos1.y - pos2.y)

/**
 * 
 * @param {Position} pos1 
 * @param {Position} pos2 
 */
export const isStraight = (pos1, pos2) => pos1.x === pos2.x || pos1.y === pos2.y

/**
 * 
 * @param {Position} pos 
 * @param {COLOUR} colour 
 */
export const containsPieceColour = (pos, colour) => board[pos.x][pos.y].colour === colour

/**
 * @param {GameState} gameObject 
 * @param {object} message
 * @param {WebSocket} connection
 */
export const playerTurn = (gameObject, message, connection) => {

	let game = gameObject

	let isCurrentPlayer = game.playerW == connection ? true : false

	switch (message.type) {
		case T_GAME_START:


			break
		case T_MOVE_PIECE:

	}
}

// 	if (isPlayerW) {
// 		/*
//    * player W cannot do a lot, just send the target word;
//    * if player B is already available, send message to B
//    */
// 		if (message.type == messages.T_TARGET_WORD) {

// 			if (game.hasTwoConnectedPlayers()) {
// 				game.playerB.send(message)
// 			}
// 		}
// 	} else {
// 		/*
//    * player B can make a guess;
//    * this guess is forwarded to W
//    */
// 		if (message.type == messages.T_MAKE_A_GUESS) {
// 			game.playerW.send(message)
// 			game.setStatus('CHAR GUESSED')
// 		}

// 		/*
//    * player B can state who won/lost
//    */
// 		if (message.type == messages.T_GAME_WON_BY) {
// 			game.setStatus(oMsg.data)
// 			//game was won by somebody, update statistics
// 			game.gamesCompleted++
// 		}
// 	}
