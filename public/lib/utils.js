import { ChessPiece, Position, PIECES_ORDER, COLOUR, TYPES } from './index.js'

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
	return Array(8).fill(null).map((y, i) => Array(8).fill(null).map((x, j) => pieceMapper(j, i)))
}

export const modifyClassName = (el, className, remove = false) => {
	let classArray = el.className.split(' ')

	if(remove){
		classArray = classArray.filter(cn => cn !== className)
	} else {
		classArray.push(className)
	}

	el.className = classArray.join(' ')
}