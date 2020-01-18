export const TYPES = {
	pawn:   'PAWN',
	rook:   'ROOK',
	knight: 'KNIGHT',
	bishop: 'BISHOP',
	queen:  'QUEEN',
	king:   'KING'
}

export const COLOUR = {
	black: 'BLACK',
	white: 'WHITE',
}

export class Position {
	/**
		 * @param {number} x 
		 * @param {number} y 
		 */
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

export class ChessPiece {
	/**
		 * @param {string} type 
		 * @param {string} colour 
		 * @param {Position} position 
		 */
	constructor(type, colour, position) {
		this.type = type
		this.colour = colour
		this.position = position
		/**@type Position[] */
		this.availableMoves = []
	}

	/**
	 * @param {Position} target 
	 */
	move(target) {
		this.position.x = target.x
		this.position.y = target.y
	}

	/**
	 * @param  {Position[]} moves 
	 */
	updateValidMoves(moves) {
		this.availableMoves = moves
	}
}

export const PIECES_ORDER = [
	TYPES.rook,
	TYPES.knight,
	TYPES.bishop,
	TYPES.queen,
	TYPES.king,
	TYPES.bishop,
	TYPES.knight,
	TYPES.rook
]
