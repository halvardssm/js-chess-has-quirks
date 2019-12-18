const {ChessPiece, TYPES,COLOUR, Position, piecesOrder} = require('./structs')

class GameState {
	/**
	 * @param {any} player1 
	 */
	constructor(gameId, player1) {
		this.id = gameId
		this.player1 = player1
		this.player2 = null
		this.gameBoard = this.emptyGameBoard()
	}

	/**
	 * @param {any} player2
	 */
	set player2(player2) {
		this.player2 = player2
	}

	pieceMapper=(i,j)=>{
		if(i === 7){
			return new ChessPiece(piecesOrder[j], COLOUR.black, new Position(i,j))
		} else if(i===6){
			return new ChessPiece(TYPES.pawn, COLOUR.black, new Position(i,j))
		} else if(i===1){
			return new ChessPiece(TYPES.pawn, COLOUR.white, new Position(i,j))
		} else if(i===0){
			return new ChessPiece(piecesOrder[j], COLOUR.white, new Position(i,j))
		}
	}

	emptyGameBoard = () =>{
		const canvas = document.getElementById('game-board')
		const ctx = canvas.getContext('2d')
		let height = canvas.style.height
			
		const board = Array(8).map((el, i) => Array(8).map((square, j)=> {
			return this.pieceMapper(i,j)
		}))
	
		console.log('BOARD:' + board)
	}
}

module.exports = GameState
