import { ChessPiece, Position, TYPES, COLOUR, T_GAME_START, T_MOVE_PIECE, getDirection } from '../../public/lib/index.js'
import { GameState } from './index.js'

/**
 * @param {ChessPiece[][]} board
 * @param {ChessPiece} piece 
 * @return {Position[]}
 */
export const getValidMoves = (board, piece) => {
	/** @type {Position[]} */
	const validMoves = []
	/** @type {-1|1} */
	const direction = getDirection(piece)
	const pieceProps = getPieceProps(piece)

	const moveProps = { board, piece, direction, validMoves, oneStep: pieceProps.oneStep }

	if(pieceProps.horse){
		moveHorse(moveProps)
		return
	}
	if(pieceProps.fw){
		moveVertical(moveProps)
		
	}
	if(pieceProps.bw){
		moveProps.direction *= -1
		moveVertical(moveProps)
		moveProps.direction *= -1
	}
	if(pieceProps.horisontal){
		moveHorisontal(moveProps)
	}
	if(pieceProps.diagonal){
		moveDiagonal(moveProps)
	}

	return validMoves
}

/**
 * @param {ChessPiece} piece 
 * @param {null|ChessPiece} cell 
 * @return {boolean}
 */
const moveValidation = (piece, cell) => {
	if(cell === null||cell === undefined){
		return true
	}
	if(cell.colour !== piece.colour){
		return true
	}
	return false
}

const cellValidation = (x, y) => {
	if(x < 0 || x > 7){
		return false
	}
	if(y < 0 || y > 7){
		return false
	}
	return true
}

/**
* @param {{board: ChessPiece[][], piece: ChessPiece, validMoves: Position[]}} props
 * @return {void}
 */
const moveHorse = ({ board, piece, validMoves }) => {
	const possibleMoves = [
		{ x: -1, y: 2 },
		{ x: 1, y: 2 },
		{ x: 2, y: 1 },
		{ x: 2, y: -1 },
		{ x: -1, y: -2 },
		{ x: 1, y: -2 },
		{ x: -2, y: 1 },
		{ x: -2, y: -1 },
	]

	possibleMoves.forEach(el => {
		const dx = piece.position.x + el.x
		const dy = piece.position.y + el.y
		if(validate(piece, board, dx, dy)){
			validMoves.push(new Position(dx, dy))
		}
	})
}

/**
 * @param {{board: ChessPiece[][], piece: ChessPiece, direction: -1|1, validMoves: Position[], oneStep: boolean}} props
 * @return {void}
 */
const moveVertical = ({ board, piece, direction, validMoves, oneStep }) => {
	const dx = piece.position.x
	let dy = piece.position.y + direction

	do{
		if(validate(piece, board, dx, dy)){
			validMoves.push(new Position(dx, dy))
			dy += direction
		} else {
			return
		}
	} while(!oneStep)
	
}

/**
 * @param {{board: ChessPiece[][], piece: ChessPiece, validMoves: Position[], oneStep: boolean}} props
 * @return {void}
 */
const moveHorisontal = ({ board, piece, validMoves, oneStep }) => {
	let px = piece.position.x + 1
	let nx = piece.position.x - 1
	const dy = piece.position.y

	do{
		if(validate(piece, board, px, dy)){
			validMoves.push(new Position(px, dy))
			px++
		} else if(validate(piece, board, nx, dy)){
			validMoves.push(new Position(nx, dy))
			nx++
		}else {
			return
		}
	} while(!oneStep)
}

/**
 * @param {{board: ChessPiece[][], piece: ChessPiece, direction: -1|1, validMoves: Position[], oneStep: boolean}} props
 * @return {void}
 */
const moveDiagonal = ({ board, piece, direction, validMoves, oneStep }) => {

	//p: forward, n: backwards, l: left, r: right
	//fw-left
	let pxl = piece.position.x - 1
	let pyl = piece.position.y + direction
	//fw-right
	let pxr = piece.position.x + 1
	let pyr = piece.position.y + direction
	//dw-left
	let nxl = piece.position.x - 1
	let nyl = piece.position.y - direction
	//dw-right
	let nxr = piece.position.x + 1
	let nyr = piece.position.y - direction

	do{
		//fw-left
		if(validate(piece, board, pxl, pyl)){
			validMoves.push(new Position(pxl, pyl))
			pxl--
			pyl += direction
			
		//fw-right
		} else if(validate(piece, board, pxr, pyr)){
			validMoves.push(new Position(pxr, pyr))
			pxr++
			pyr += direction

		//dw-left
		} else if(piece.type !== TYPES.pawn && validate(piece, board, nxl, nyl)){
			validMoves.push(new Position(nxl, nyl))
			nxl--
			nyl -= direction

		//dw-right
		} else if(piece.type !== TYPES.pawn && validate(piece, board, nxr, nyr)){
			validMoves.push(new Position(nxr, nyr))
			nxr++
			nyr -= direction

		}else {
			return
		}
	} while(!oneStep)
}

/**
 * @param {ChessPiece} piece 
 * @param {ChessPiece[][]} board 
 * @param {number} x 
 * @param {number} y 
 * @return {boolean}
 */
const validate = (piece, board, x, y) => cellValidation(x, y) && moveValidation(piece, board[x][y])

/**
 * @param {ChessPiece} piece 
 * @return {{fw: boolean, bw: boolean, horisontal: boolean, diagonal: boolean, horse: boolean, oneStep: boolean}}
 *
 */
const getPieceProps = (piece) => {
	const propArr = {
		fw:         false,
		bw:         false,
		horisontal: false,
		diagonal:   false,
		horse:      false,
		oneStep:    false
	}

	switch (piece.type) {
		case TYPES.pawn:
			propArr.fw = true
			propArr.diagonal = true
			propArr.oneStep = true
			break 

		case TYPES.rook:
			propArr.fw = true
			propArr.bw = true
			propArr.horisontal = true
			break

		case TYPES.knight:
			propArr.horse = true
			break

		case TYPES.bishop:
			propArr.diagonal = true
			break

		case TYPES.queen:
			propArr.fw = true
			propArr.bw = true
			propArr.horisontal = true
			propArr.diagonal = true
			break

		case TYPES.king:
			propArr.fw = true
			propArr.bw = true
			propArr.horisontal = true
			propArr.diagonal = true
			propArr.oneStep = true
			break

		default:
			console.log('Invalid piece given')
			return propArr
	}

	return propArr
}