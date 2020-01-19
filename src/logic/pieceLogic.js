import { ChessPiece, Position, TYPES, getDirection } from '../../public/lib/index.js'

/**
 * @param {ChessPiece[][]} board
 * @param {ChessPiece} piece 
 * @return {Position[]}
 */
export const getValidMoves = (board, piece) => {
	/** @type {Position[]} */
	const validMoves = []

	/** @type {1 | -1} */
	const direction = getDirection(piece)

	const pieceProps = getPieceProps(piece)

	const validationProps = { board, piece, direction, validMoves, oneStep: pieceProps.oneStep }

	if (pieceProps.knight) {
		validateKnight(validationProps)
		return validMoves	// Returns early because knights are special
	}

	if (pieceProps.fw) validateVertical(validationProps)

	if (pieceProps.bw) {
		validationProps.direction *= -1		// Reverse direction to make the piece go backwards
		validateVertical(validationProps)	// Validate
		validationProps.direction *= -1		// Revert direction back to normal
	}

	if (pieceProps.horisontal) validateHorisontal(validationProps)

	if (pieceProps.diagonal) validateDiagonal(validationProps)

	return validMoves
}

/**
* @param {{board: ChessPiece[][], piece: ChessPiece, validMoves: Position[]}} props
 * @return {void}
 */
const validateKnight = ({ board, piece, validMoves }) => {
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
		if (validate(piece, board, dx, dy)) validMoves.push(new Position(dx, dy))
	})
}

/**
 * @param {{board: ChessPiece[][], piece: ChessPiece, direction: 1 | -1, validMoves: Position[], oneStep: boolean}} props
 * @return {void}
 */
const validateVertical = ({ board, piece, direction, validMoves, oneStep }) => {
	const dx = piece.position.x
	let dy = piece.position.y + direction

	do {
		if (validate(piece, board, dx, dy)) {
			validMoves.push(new Position(dx, dy))
			
			if (board[dx][dy]) return
			dy += direction
		} else return
	} while (!oneStep)

}

/**
 * @param {{board: ChessPiece[][], piece: ChessPiece, validMoves: Position[], oneStep: boolean}} props
 * @return {void}
 */
const validateHorisontal = ({ board, piece, validMoves, oneStep }) => {
	let px = piece.position.x + 1
	let nx = piece.position.x - 1
	const dy = piece.position.y

	do {
		if (validate(piece, board, px, dy)) {
			validMoves.push(new Position(px, dy))

			board[px][dy] ? px = 8 : px++

		} else if (validate(piece, board, nx, dy)) {
			validMoves.push(new Position(nx, dy))

			board[nx][dy] ? nx = 8 : nx++
		} else return
	} while (!oneStep)
}

/**
 * @param {{board: ChessPiece[][], piece: ChessPiece, direction: 1 | -1, validMoves: Position[], oneStep: boolean}} props
 * @return {void}
 */
const validateDiagonal = ({ board, piece, direction, validMoves, oneStep }) => {

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

	do {
		//fw-left
		if (validate(piece, board, pxl, pyl, true)) {
			validMoves.push(new Position(pxl, pyl))

			if (board[pxl][pyl]){
				pxl = 9
				pyl = 9
			} 
			pxl -= 1
			pyl += direction

			//fw-right
		} else if (validate(piece, board, pxr, pyr, true)) {
			validMoves.push(new Position(pxr, pyr))

			if (board[pxr][pyr]){
				pxr = 9
				pyr = 9
			} 

			pxr += 1
			pyr += direction

			//dw-left
		} else if (validate(piece, board, nxl, nyl, true)) {
			validMoves.push(new Position(nxl, nyl))

			if (board[nxl][nyl]){
				nxl = 9
				nyl = 9
			} 

			nxl -= 1
			nyl -= direction

			//dw-right
		} else if (validate(piece, board, nxr, nyr, true)) {
			validMoves.push(new Position(nxr, nyr))

			if (board[nxr][nyr]){
				nxr = 9
				nyr = 9
			} 

			nxr += 1
			nyr -= direction

		} else return
	} while (!oneStep)
}

/**
 * @param {ChessPiece} piece 
 * @param {ChessPiece[][]} board 
 * @param {number} x 
 * @param {number} y 
 * @param {boolean} isDiagonal
 * @return {boolean}
 */
const validate = (piece, board, x, y, isDiagonal = false) => cellValidation(x, y)
	&& pawnValidation(piece, board[x][y], isDiagonal)
	&& moveValidation(piece, board[x][y])

/**
 * @param {ChessPiece} piece 
 * @param {null|ChessPiece} cell 
 * @return {boolean}
 */
const moveValidation = (piece, cell) => !cell
	? true
	: (piece.colour !== cell.colour)


/**
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
const cellValidation = (x, y) => !(x < 0 || x > 7) && !(y < 0 || y > 7)

/**
 * @param {ChessPiece} piece 
 * @param {null|ChessPiece} cell 
 * @param {boolean} isDiagonal 
 * @return {boolean}
 */
const pawnValidation = (piece, cell, isDiagonal) => {

	if (piece.type !== TYPES.pawn) return true //if not pawn
	if (cell && piece.colour === cell.colour) return false //if cell has same colour as piece
	if (isDiagonal && !cell) return false //pawn cant move diagonally if it does not contain oponent piece
	if (!isDiagonal && cell) return false //pawn cant move forward if there is a piece there

	return true
}

/**
 * @param {ChessPiece} piece 
 * @return {{fw: boolean, bw: boolean, horisontal: boolean, diagonal: boolean, knight: boolean, oneStep: boolean}}
 */
const getPieceProps = (piece) => {
	const propArr = {
		fw: false,
		bw: false,
		horisontal: false,
		diagonal: false,
		knight: false,
		oneStep: false
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
			propArr.knight = true
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
