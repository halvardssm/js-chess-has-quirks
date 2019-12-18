const { TYPES, Position, ChessPiece } = require('./structs')

/**
 * 
 * @param {ChessPiece} piece 
 * @param {Position} end 
 * @return {boolean}
 */
const validateMove = (piece, end) => {
	let start = new Position(piece.position.x, piece.position.y)

	switch (piece.type) {
		case TYPES.pawn:
			pawnLogic(start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.rook:
			rookLogic(start, end) ? piece.move(end) : console.log('Invalid Move!')
			break

		case TYPES.knight:
			knightLogic(start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.bishop:
			bishopLogic(start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.queen:
			queenLogic(start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		case TYPES.king:
			kingLogic(start, end) ? piece.move(end) : console.log('Invalid move!')
			break

		default:
			console.log('Invalid piece given')
			break
	}
}

const pawnLogic = (start, end) => { }

const rookLogic = (start, end) => { }

const knightLogic = (start, end) => { }

const bishopLogic = (start, end) => Math.abs(start.x - end.x) !== Math.abs(start.y - end.y) ? false : bishopHelper(start, end)

const bishopHelper = (curr, end) => {

}

const queenLogic = (start, end) => { }

const kingLogic = (start, end) => { }
