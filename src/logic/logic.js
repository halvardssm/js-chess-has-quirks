import { ChessPiece, Position, TYPES, COLOUR, T_GAME_START, T_MOVE_PIECE } from '../../public/lib/index.js'
import { GameState } from './index.js'

/**
 * @param {ChessPiece[][]} gameBoard
 * @param {ChessPiece} piece
 */
export function* updateAvailableMoves(gameBoard, piece) {
	yield gameBoard.map((arr, i) => arr.map((_, j) => { if (validateMove(gameBoard, piece, new Position(i, j))) return new Position(i, j) }))
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
 * Pawns can only move forward by one, can only attack diagonally - barred by collision
 */
const pawnLogic = (board, piece, end) => {
	let start = piece.position
	// Assert that target position does not contain a friendly unit
	if (containsPieceColour(end, piece.colour)) return false

	// Assert that pawn can only move diagonally by one 
	if (end.x > start.x + 1 || end.x < start.x - 1) return false

	// Assert that pawns can only attack diagonally
	if (isStraight(start, end) && containsPieceColour(end, getOppositiveColour(piece.colour))) return false

	// Assert that pawns can only move "forwards"
	let direction = (piece.colour === 'WHITE') ? 1 : -1
	if (direction > 0) { if (end.y < start.y) return false }
	else { if (end.y > start.y) return false }

	return bresenham(board, piece.position, end)

}

/**
 * @param {ChessPiece[][]} board 
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 * Rooks can only move straight - barred by collision
 */
const rookLogic = (board, piece, end) => isStraight(piece.position, end)
	? bresenham(board, piece.position, end)
	: false

/**
 * @param {ChessPiece[][]} board 
 * @param {Position} position 
 * @param {Position} end 
 * @returns {boolean}
 * Possibly depracated?
 */
const rookLogicHelper = (board, colour, pos, end) => false

/**
 * @param {ChessPiece[][]} board 
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 * Knights can only move in an 'L' shape - not barred by collision
 */
const knightLogic = (board, piece, end) => false

/**
 * @param {ChessPiece[][]} board 
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 * Bishops can only move diagonally - barring collision
 */
const bishopLogic = (board, piece, end) => isDiagonal(piece.position, end)
	? bresenham(board, piece.position, end)
	: false

/**
 * @param {ChessPiece[][]} board
 * @param {Position} curr 
 * @param {Position} end 
 * @returns {boolean}
 * Possibly depracated?
 */
const bishopHelper = (board, curr, end) => {

}

/**
 * @param {ChessPiece[][]} board 
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @returns {boolean}
 * Queens can move in any single direction and to any range - barring collision
 */
const queenLogic = (board, piece, end) => !containsPieceColour(end, piece.colour)
	&& (isDiagonal(piece.position, end) || isStraight(piece.position, end))
	? bresenham(board, piece.position, end)
	: false

/**
 * 
 * @param {ChessPiece[][]} board 
 * @param {Position} curr 
 * @param {Position} end 
 * @returns {boolean}
 * Possibly depracated?
 */
const queenLogicHelper = (board, piece, end) => false

/**
 * @param {ChessPiece[][]} board 
 * @param {ChessPiece} piece
 * @param {Position} end 
 * @returns {boolean}
 * Kings can move in any direction but only by one
 */
const kingLogic = (board, piece, end) => !containsPieceColour(piece.colour, end)
	? (Math.abs(end.x - start.x) <= 1 && Math.abs(end.y - start.y) <= 1)
	: false

/**
 * @param {ChessPiece[][]} board
 * @param {Position} start 
 * @param {Position} end 
 * @return {boolean}
 */
const bresenham = (board, start, end) => {
	let curr = new Position(start.x, start.y)
	let dx = Math.abs(end.x - curr.x)
	let dy = Math.abs(end.y - curr.y)
	let sx = (curr.x < end.x) ? 1 : -1
	let sy = (curr.y < end.y) ? 1 : -1
	let err = dx - dy

	let con = 0
	let exit = 1

	while (con < exit) {
		// Done with collision detection
		if ((curr.x === end.x) && (curr.x === end.y)) break
		// If there's a piece in the way, then the move is not valid
		if (board[curr.x][curr.y]) return false

		var e2 = 2 * err
		e2 > -dy ? err -= dy : curr.x += sx
		e2 < dx ? err += dx : curr.y += sy
	}

	return true
}

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
const isStraight = (pos1, pos2) => (pos1.x === pos2.x) || (pos1.y === pos2.y)

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
 * 
 * @param {number} start 
 * @param {number} end 
 */
function* range(start, end) {
	yield start
	if (start === end) return
	yield* range(start + 1, end)
}

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
			break
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
