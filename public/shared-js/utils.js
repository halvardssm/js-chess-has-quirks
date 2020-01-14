const { ChessPiece, Position, PIECES_ORDER, COLOUR, TYPES } = require('./structs')

const utils = {}

utils.generateEmptyBoardArray = () => {
	return Array(8).fill(0).map(() => Array(8).fill(0))
}

utils.initialPieceMapper = (x, y) => {
	if(y === 7){
		return new ChessPiece(PIECES_ORDER[x], COLOUR.black, new Position(x, y))
	} else if(y === 6){
		return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(x, y))
	} else if(y === 1){
		return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(x, y))
	} else if(y === 0){
		return new ChessPiece(PIECES_ORDER[x], COLOUR.white, new Position(x, y))
	}
}

module.exports = utils
