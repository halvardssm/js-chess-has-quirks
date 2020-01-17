const { T_GAME_START, T_MOVE_PIECE } = require('../../public/shared-js/messages')
const GameState = require('./GameState')
const Messages = require('../../public/shared-js/messages')
const Structs = require('../../public/shared-js/structs')

/**
 * @param {Structs.ChessPiece[][]} gameBoard
 * @param {Structs.ChessPiece} piece
 * @returns {void}
 */
const updateAvailableMoves = (gameBoard, piece) => {
	gameBoard.map(arr => arr.map())
}

/**
 * @param {Structs.ChessPiece[][]} board
 * @param {Structs.ChessPiece} piece 
 * @param {Structs.CPPosition} end 
 * @return {boolean}
 */
const validateMove = (board, piece, end) => {
	let start = new Structs.CPPosition(piece.position.x, piece.position.y)

	switch (piece.type) {
		case TYPES.pawn:
			return pawnLogic(board, piece, end)

		case TYPES.rook:
			return rookLogic(board, piece, end)

		case TYPES.knight:
			return knightLogic(board, piece, end)

		case TYPES.bishop:
			return bishopLogic(board, piece, end)

		case TYPES.queen:
			return queenLogic(board, piece, end)

		case TYPES.king:
			return kingLogic(board, piece, end)

		default:
			console.log('Invalid piece given')
			return false
	}
}

/**
 * @param {Structs.ChessPiece[][]} board
 * @param {Structs.ChessPiece} piece 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const pawnLogic = (board, piece, end) => {
	let direction = (colour === 'BLACK') ? -1 : 1

	if (start.x === end.x) {
		return true
	}
}

/**
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.ChessPiece} piece 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const rookLogic = (board, piece, end) => isStraight(start, end)
	? rookLogicHelper(board, piece.colour, piece.position, end)
	: false

/**
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.CPPosition} position 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const rookLogicHelper = (board, colour, pos, end) => false

/**
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.ChessPiece} piece 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const knightLogic = (board, piece, end) => false

/**
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.ChessPiece} piece 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const bishopLogic = (board, piece, end) => isDiagonal(start, end)
	? bishopHelper(board, piece.position, end)
	: false

/**
 * @param {Structs.ChessPiece[][]} board
 * @param {Structs.CPPosition} curr 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const bishopHelper = (board, piece, end) => {

}

/**
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.ChessPiece} piece 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const queenLogic = (board, piece, end) => !containsPieceColour(end, piece.colour)
	&& (isDiagonal(piece.position, end) || isStraight(piece.position, end))
	? queenLogic(board, piece.position, end)
	: false

/**
 * 
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.CPPosition} curr 
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const queenLogicHelper = (board, piece, end) => false

/**
 * @param {Structs.ChessPiece[][]} board 
 * @param {Structs.ChessPiece} piece
 * @param {Structs.CPPosition} end 
 * @returns {boolean}
 */
const kingLogic = (board, piece, end) => !containsPieceColour(piece.colour, end)
	? (Math.abs(end.x - start.x) <= 1 && Math.abs(end.y - start.y) <= 1)
	: false

/**
 * @param {Structs.CPPosition} pos1 
 * @param {Structs.CPPosition} pos2 
 * @returns {boolean}
 */
const isDiagonal = (pos1, pos2) => Math.abs(pos1.x - pos2.x) === Math.abs(pos1.y - pos2.y)

/**
 * @param {Structs.CPPosition} pos1 
 * @param {Structs.CPPosition} pos2 
 * @returns {boolean}
 */
const isStraight = (pos1, pos2) => pos1.x === pos2.x || pos1.y === pos2.y

/**
 * @param {Structs.CPPosition} pos 
 * @param {Structs.CPCOLOUR} colour
 * @returns {boolean}
 */
const containsPieceColour = (pos, colour) => board[pos.x][pos.y]
	? board[pos.x][pos.y].colour === colour
	: false

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
