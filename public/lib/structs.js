/** Enum containing the different types of chess pieces */
export const TYPES = {
	pawn  : 'PAWN',
	rook  : 'ROOK',
	knight: 'KNIGHT',
	bishop: 'BISHOP',
	queen : 'QUEEN',
	king  : 'KING'
}

/** Enum containing the two different colours of chess pieces */
export const COLOUR = {
	black: 'BLACK',
	white: 'WHITE',
}

/**
 * Class representing a pair of co-ordinates : (x, y)
 * @property {number} x
 * @property {number} y
 */
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

/**
 * Class representing a chess piece with a type, colour, and position
 * @property {string} type
 * @property {string} colour
 * @property {Position} position
 */
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

		/** @type Position[] */
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

/** The order in which pieces appear on the board */
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

export class Player {

	/**
	 * @param {WebSocket} id 
	 * @param {string} colour 
	 */
	constructor(id, colour) {
		this.id = id
		this.colour = colour

		/** @type ChessPiece[] */
		this.capturedPieces = []
	}

	/** @param {ChessPiece} piece */
	capturePiece(piece) {
		this.capturedPieces.push(piece)
	}

	hasCapturedKing() {
		return !!this.capturedPieces.find(cp => cp.type === TYPES.king)
	}
}
