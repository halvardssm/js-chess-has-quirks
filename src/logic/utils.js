// @ts-nocheck

const { ChessPiece, CPPosition, PIECES_ORDER, CPCOLOUR, CPTYPES } = require('../../public/shared-js/structs')

const Utils = {}
/**
 	* @param {number} x
 	* @param {number} y
 	* @returns {Structs.ChessPiece} cp
 	*/
Utils.pieceMapper = (x, y) => {
	if (y === 7) {
		return new ChessPiece(PIECES_ORDER[x], CPCOLOUR.black, new CPPosition(x, y))
	} else if (y === 6) {
		return new ChessPiece(CPTYPES.pawn, CPCOLOUR.black, new CPPosition(x, y))
	} else if (y === 1) {
		return new ChessPiece(CPTYPES.pawn, CPCOLOUR.white, new CPPosition(x, y))
	} else if (y === 0) {
		return new ChessPiece(PIECES_ORDER[x], CPCOLOUR.white, new CPPosition(x, y))
	}
}

Utils.generateEmptyBoardArray = () => {
	return Array(8).fill(null).map((y, i) => Array(8).fill(null).map((x, j) =>  Utils.pieceMapper(j, i)))
}

module.exports = Utils


// ((exports) => {
// 	const Structs = typeof exports === 'undefined' ? Structs : require('../../public/shared-js/structs')
//
// 	const { ChessPiece, Position, PIECES_ORDER,CPCOLOUR, TYPES } = Structs
//
// 	/**
//  	* @param {number} x
//  	* @param {number} y
//  	* @returns {Structs.ChessPiece} cp
//  	*/
// 	exports.pieceMapper = (x, y) => {
// 		if (y === 7) {
// 			return new ChessPiece(Structs.PIECES_ORDER[x],CPCOLOUR.black, new Position(x, y))
// 		} else if (y === 6) {
// 			return new ChessPiece(TYPES.pawn,CPCOLOUR.black, new Position(x, y))
// 		} else if (y === 1) {
// 			return new ChessPiece(TYPES.pawn,CPCOLOUR.white, new Position(x, y))
// 		} else if (y === 0) {
// 			return new ChessPiece(PIECES_ORDER[x],CPCOLOUR.white, new Position(x, y))
// 		}
// 	}
//
// 	exports.generateEmptyBoardArray = () => {
// 		return Array(8).map((y, i) => Array(8).map((x, j) => exports.pieceMapper(j, i)))
// 	}
//
//
// })(typeof exports === 'undefined' ? (this.Utils = {}) : exports)

