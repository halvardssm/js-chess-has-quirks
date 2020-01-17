import { ChessPiece, Position, TYPES, COLOUR, T_GAME_START, T_MOVE_PIECE } from '../../public/lib/index.js'
import { GameState } from './index.js'

/**
 * @param {ChessPiece[][]} gameBoard
 * @param {ChessPiece} piece
 * @returns {void}
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
 * @param {ChessPiece[][]} board
 * @param {ChessPiece} piece
 * @param {Position} end
 * @returns {boolean}
 */
const pawnLogic = (board, piece, end) => {
	let start = piece.position
	if (containsPieceColour(end, piece.colour)) return false
	if (isStraight(start, end) && containsPieceColour(end, getOppositiveColour(piece.colour))) return false

	let direction = (piece.colour === 'WHITE') ? 1 : -1
}

/**
 * @param {Chesspiece[][]} board 
 * @param {Chesspiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 */
const rookLogic = (board, piece, end) => isStraight(start, end)
	? rookLogicHelper(board, piece.colour, piece.position, end)
	: false

/**
 * @param {Chesspiece[][]} board 
 * @param {Position} position 
 * @param {Position} end 
 * @returns {boolean}
 */
const rookLogicHelper = (board, colour, pos, end) => false

/**
 * @param {Chesspiece[][]} board 
 * @param {Chesspiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 */
const knightLogic = (board, piece, end) => false

/**
 * @param {Chesspiece[][]} board 
 * @param {Chesspiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 */
const bishopLogic = (board, piece, end) => isDiagonal(start, end)
	? bishopHelper(board, piece.position, end)
	: false

/**
 * @param {Chesspiece[][]} board
 * @param {Position} curr 
 * @param {Position} end 
 * @returns {boolean}
 */
const bishopHelper = (board, piece, end) => {

}

/**
 * @param {Chesspiece[][]} board 
 * @param {Chesspiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 */
const queenLogic = (board, piece, end) => !containsPieceColour(end, piece.colour)
	&& (isDiagonal(piece.position, end) || isStraight(piece.position, end))
	? queenLogic(board, piece.position, end)
	: false

/**
 * 
 * @param {Chesspiece[][]} board 
 * @param {Position} curr 
 * @param {Position} end 
 * @returns {boolean}
 */
const queenLogicHelper = (board, piece, end) => false

/**
 * @param {Chesspiece[][]} board 
 * @param {Chesspiece} piece
 * @param {Position} end 
 * @returns {boolean}
 */
const kingLogic = (board, piece, end) => !containsPieceColour(piece.colour, end)
	? (Math.abs(end.x - start.x) <= 1 && Math.abs(end.y - start.y) <= 1)
	: false

/**
 * @param {Position} pos1 
 * @param {Position} pos2 
 * @returns {boolean}
 */
const isDiagonal = (pos1, pos2) => Math.abs(pos1.x - pos2.x) === Math.abs(pos1.y - pos2.y)

/**
 * @param {Position} pos1 
 * @param {Position} pos2 
 * @returns {boolean}
 */
const isStraight = (pos1, pos2) => pos1.x === pos2.x || pos1.y === pos2.y

/**
 * @param {Position} pos 
 * @param {COLOUR} colour
 * @returns {boolean}
 */
const containsPieceColour = (pos, colour) => board[pos.x][pos.y]
	? board[pos.x][pos.y].colour === colour
	: false

/**
 * @param {COLOUR} colour
 * @returns {COLOUR}
 */
const getOppositiveColour = (colour) => colour === 'WHITE'
	? 'BLACK'
	: 'WHITE'

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
