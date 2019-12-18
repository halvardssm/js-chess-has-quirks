
const TYPES = {
	pawn: 'PAWN',
	rook: 'ROOK',
	knight: 'KNIGHT',
	bishop: 'BISHOP',
	queen: 'QUEEN',
	king: 'KING',
}
Object.freeze(TYPES)

const COLOUR = {
	black: 'BLACK',
	white: 'WHITE',
}
Object.freeze(COLOUR)

class Position {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class ChessPiece {
	constructor(type, colour, position) {
		this.type = type
		this.colour = colour
		this.position = position
	}

	move(target) {
		this.position.x += target.x
		this.position.y += target.y
	}
}

const piecesOrder = [TYPES.rook, TYPES.knight, TYPES.bishop,
	TYPES.queen, TYPES.king, TYPES.bishop,
	TYPES.knight, TYPES.rook]

module.exports = {TYPES,COLOUR,Position,ChessPiece,piecesOrder}
