// @ts-nocheck

const { ChessPiece, Position, PIECES_ORDER, COLOUR, TYPES } = require('../../public/shared-js/structs')

const Utils = {}
/**
 	* @param {number} x
 	* @param {number} y
 	* @returns {Structs.ChessPiece} cp
 	*/
Utils.pieceMapper = (x, y) => {
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

Utils.generateEmptyBoardArray = () => {
	return Array(8).map((y, i) => Array(8).map((x, j) => Utils.pieceMapper(j, i)))
}

module.exports = Utils


// ((exports) => {
// 	const Structs = typeof exports === 'undefined' ? Structs : require('../../public/shared-js/structs')
//
// 	const { ChessPiece, Position, PIECES_ORDER, COLOUR, TYPES } = Structs
//
// 	/**
//  	* @param {number} x
//  	* @param {number} y
//  	* @returns {Structs.ChessPiece} cp
//  	*/
// 	exports.pieceMapper = (x, y) => {
// 		if (y === 7) {
// 			return new ChessPiece(Structs.PIECES_ORDER[x], COLOUR.black, new Position(x, y))
// 		} else if (y === 6) {
// 			return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(x, y))
// 		} else if (y === 1) {
// 			return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(x, y))
// 		} else if (y === 0) {
// 			return new ChessPiece(PIECES_ORDER[x], COLOUR.white, new Position(x, y))
// 		}
// 	}
//
// 	exports.generateEmptyBoardArray = () => {
// 		return Array(8).map((y, i) => Array(8).map((x, j) => exports.pieceMapper(j, i)))
// 	}
//
//
// })(typeof exports === 'undefined' ? (this.Utils = {}) : exports)

