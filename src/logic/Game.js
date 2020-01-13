const { ChessPiece, TYPES, COLOUR, Position, piecesOrder } = require('../../public/shared/structs')

class Game {
	constructor(gameId) {
		this.id = gameId
		this.playerW = null
		this.playerB = null
		this.gameBoard = null
		this.gameState = '0 JOINT'
		this.transitionStates = {
			'0 JOINT': 0,
			'1 JOINT': 1,
			'2 JOINT': 2,
			'W TURN': 3,
			'B TURN': 4,
			'W': 5,
			'B': 6,
			'ABORTED': 7
		}
		this.transitionMatrix = [
			[0, 1, 0, 0, 0, 0, 0], //0 JOINT
			[1, 0, 1, 0, 0, 0, 0], //1 JOINT
			[0, 0, 0, 1, 0, 0, 1], //2 JOINT (note: once we have two players, there is no way back!)
			[0, 0, 0, 1, 1, 1, 1], //CHAR GUESSED
			[0, 0, 0, 0, 0, 0, 0], //W WON
			[0, 0, 0, 0, 0, 0, 0], //B WON
			[0, 0, 0, 0, 0, 0, 0] //ABORTED
		]
	}

	/**
	 * @param {any} playerB
	 */
	setPlayerB(playerB) {
		this.playerB = playerB
	}

	isValidTransition(from, to) {
	
		let i, j
		if (!(from in this.transitionStates)) {
			return false
		} else {
			i = this.transitionStates[from]
		}
	
		if (!(to in this.transitionStates)) {
			return false
		} else {
			j = this.transitionStates[to]
		}
	
		return this.transitionMatrix[i][j] > 0
	}

	isValidState(s) {
		return s in this.transitionStates
	}

	pieceMapper(i, j) {
		if(i === 7){
			return new ChessPiece(piecesOrder[j], COLOUR.black, new Position(i, j))
		} else if(i === 6){
			return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(i, j))
		} else if(i === 1){
			return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(i, j))
		} else if(i === 0){
			return new ChessPiece(piecesOrder[j], COLOUR.white, new Position(i, j))
		}
	}

	setStatus(w) {
	
		if (
			this.isValidState(w) &&
		this.isValidTransition(this.gameState, w)
		) {
			this.gameState = w
			console.log('[STATUS] %s', this.gameState)
		} else {
			return new Error(`Impossible status change from ${this.gameState} to ${w}`)
		}
	}

	hasTwoConnectedPlayers() {
		return this.gameState == '2 JOINT'
	}

	addPlayer(p) {

		if (this.gameState != '0 JOINT' && this.gameState != '1 JOINT') {
			return new Error(`Invalid call to addPlayer, current state is ${this.gameState}`)
		}
	
		/*
	   * revise the game state
	   */
	
		var error = this.setStatus('1 JOINT')
		if (error instanceof Error) {
			this.setStatus('2 JOINT')
		}
	
		if (this.white == null) {
			this.white = p
			return 'W'
		} else {
			this.black = p
			return 'B'
		}
	}
}

module.exports = Game
