((exports) => {
	exports.CPTYPES = {
		pawn: 'PAWN',
		rook: 'ROOK',
		knight: 'KNIGHT',
		bishop: 'BISHOP',
		queen: 'QUEEN',
		king: 'KING'
	}

	exports.CPCOLOUR = {
		black: 'BLACK',
		white: 'WHITE',
	}

	exports.CPPosition = class CPPosition {
		/**
		 * @param {number} x 
		 * @param {number} y 
		 */
		constructor(x, y) {
			this.x = x
			this.y = y
		}
	}

	exports.ChessPiece = class ChessPiece {
		/**
		 * @param {string} type 
		 * @param {string} colour 
		 * @param {exports.CPPosition} position 
		 */
		constructor(type, colour, position) {
			this.type = type
			this.colour = colour
			this.position = position
			this.availableMoves = []
		}

		move(target) {
			this.position.x += target.x
			this.position.y += target.y
		}
	}

	exports.PIECES_ORDER = [
		exports.TYPES.rook,
		exports.TYPES.knight,
		exports.TYPES.bishop,
		exports.TYPES.queen,
		exports.TYPES.king,
		exports.TYPES.bishop,
		exports.TYPES.knight,
		exports.TYPES.rook
	]
})(typeof exports === 'undefined' ? (this.Structs = {}) : exports)

// const TYPES = {
// 	pawn: 'PAWN',
// 	rook: 'ROOK',
// 	knight: 'KNIGHT',
// 	bishop: 'BISHOP',
// 	queen: 'QUEEN',
// 	king: 'KING',
// }
// Object.freeze(TYPES)

// const COLOUR = {
// 	black: 'BLACK',
// 	white: 'WHITE',
// }
// Object.freeze(COLOUR)

// class Position {
// 	/**
// 	 * @param {number} x 
// 	 * @param {number} y 
// 	 */
// 	constructor(x, y) {
// 		this.x = x
// 		this.y = y
// 	}
// }

// class ChessPiece {
// 	/**
// 	 * 
// 	 * @param {string} type 
// 	 * @param {string} colour 
// 	 * @param {Position} position 
// 	 */
// 	constructor(type, colour, position) {
// 		this.type = type
// 		this.colour = colour
// 		this.position = position
// 	}

// 	move(target) {
// 		this.position.x += target.x
// 		this.position.y += target.y
// 	}
// }

// const PIECES_ORDER = [
// 	TYPES.rook,
// 	TYPES.knight,
// 	TYPES.bishop,
// 	TYPES.queen,
// 	TYPES.king,
// 	TYPES.bishop,
// 	TYPES.knight,
// 	TYPES.rook
// ]

// module.exports = { TYPES, COLOUR, Position, ChessPiece, PIECES_ORDER }
