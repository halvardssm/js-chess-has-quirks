import { ChessPiece, Position, PIECES_ORDER, COLOUR, TYPES, T_GAME_START, T_MOVE_PIECE, S_YOUR_TURN } from './index.js'
import { O_BOARD } from './messages.js'

/**
 	* @param {number} x
 	* @param {number} y
 	* @returns {ChessPiece} cp
 	*/
export const pieceMapper = (x, y) => {
	if (y === 7) {
		return new ChessPiece(PIECES_ORDER[x], COLOUR.black, new Position(x, y))
	} else if (y === 6) {
		return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(x, y))
	} else if (y === 1) {
		return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(x, y))
	} else if (y === 0) {
		return new ChessPiece(PIECES_ORDER[x], COLOUR.white, new Position(x, y))
	}
}

/**
 * @returns {ChessPiece[][]}
 */
export const generateEmptyBoardArray = () => {
	return Array(8).fill(null).map((x, i) => Array(8).fill(null).map((y, j) => pieceMapper(i, j)))
}

export const modifyClassName = (el, className, remove = false) => {
	let classArray = el.className.split(' ')

	if (remove) {
		classArray = classArray.filter(cn => cn !== className)
	} else {
		classArray.push(className)
	}

	el.className = classArray.join(' ')
}

export const sendUpdatedBoard = (game) => {
	const boardMessage = O_BOARD
	boardMessage.data = game.getBoard()

	game.playerW.send(JSON.stringify(boardMessage))
	game.playerB.send(JSON.stringify(boardMessage))
}

/**
 * @param {ChessPiece} piece 
 * @return {1 | -1}
 */
export const getDirection = (piece) => piece.colour === COLOUR.white ? 1 : -1
