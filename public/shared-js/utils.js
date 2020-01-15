// @ts-nocheck
/* global Structs */

((exports) => {
	const Structs = typeof exports === 'undefined' ? Structs : require('./structs')

	const { ChessPiece, Position, PIECES_ORDER, COLOUR, TYPES } = Structs

	/**
 	* @param {number} x
 	* @param {number} y
 	* @returns {Structs.ChessPiece} cp
 	*/
	exports.pieceMapper = (x, y) => {
		if (y === 7) {
			return new ChessPiece(Structs.PIECES_ORDER[x], COLOUR.black, new Position(x, y))
		} else if (y === 6) {
			return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(x, y))
		} else if (y === 1) {
			return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(x, y))
		} else if (y === 0) {
			return new ChessPiece(PIECES_ORDER[x], COLOUR.white, new Position(x, y))
		}
	}

	exports.generateEmptyBoardArray = () => {
		return Array(8).map((y, i) => Array(8).map((x, j) => exports.pieceMapper(x, i)))
	}


})(typeof exports === 'undefined' ? (this.Utils = {}) : exports)


// const utils = {}

// utils.generateEmptyBoardArray = () => {
// 	return Array(8).fill(0).map(() => Array(8).fill(0))
// }

// utils.initialPieceMapper = (x, y) => {
// 	if(y === 7){
// 		return new ChessPiece(PIECES_ORDER[x], COLOUR.black, new Position(x, y))
// 	} else if(y === 6){
// 		return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(x, y))
// 	} else if(y === 1){
// 		return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(x, y))
// 	} else if(y === 0){
// 		return new ChessPiece(PIECES_ORDER[x], COLOUR.white, new Position(x, y))
// 	}
// }

// module.exports = utils
