const { T_GAME_START, T_MOVE_PIECE } = require('../../public/shared-js/messages')
const Game = require('./Game')
const messages = require('../../public/shared-js/messages')
const { TYPES, Position, ChessPiece } = require('../../public/shared-js/structs')

/**
 * @param {ChessPiece[][]} board
 * @param {string} colour
 * @param {Position} start 
 * @param {Position} end 
 */
const pawnLogic = (board, colour, start, end) => {
	let direction = (colour === 'BLACK') ? -1 : 1

	if (start.x === end.x) {
		return true
	}
}

const rookLogic = (board, start, end) => Math.abs(start.x - end.x) === 0 || Math.abs(start.y - end.y) === 0 ? rookLogicHelper(board, start, end) : false

const rookLogicHelper = (board, position, end) => {

}

const knightLogic = (board, start, end) => { }

const bishopLogic = (board, start, end) => Math.abs(start.x - end.x) === Math.abs(start.y - end.y) ? false : bishopHelper(board, start, end)

const bishopHelper = (curr, end) => {

}

const queenLogic = (board, start, end) => { }

const kingLogic = (board, start, end) => { }

/**
 * @param {ChessPiece[][]} board
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @return {boolean}
 */
const validateMove = (board, piece, end) => {
	let start = new Position(piece.position.x, piece.position.y)


	switch (piece.type) {
		case TYPES.pawn:
			pawnLogic(board, start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.rook:
			rookLogic(board, start, end) ? piece.move(end) : console.log('Invalid Move!')
			break

		case TYPES.knight:
			knightLogic(board, start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.bishop:
			bishopLogic(board, start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.queen:
			queenLogic(board, start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.king:
			kingLogic(board, start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		default:
			console.log('Invalid piece given')
			break
	}
}

const playerTurn = (gameObject, message, connection) => {

	/** @type Game */
	let game = gameObject

	let isCurrentPlayer = game.playerW == connection ? true : false

	switch (message.type) {
		case T_GAME_START:


			break
		case T_MOVE_PIECE:

	}
}

module.exports = { playerTurn, validateMove }

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
