const { T_GAME_START, T_MOVE_PIECE } = require('../javascripts/messages')
const Game = require('./Game')
const messages = require('./../javascripts/messages')
const { TYPES, Position, ChessPiece } = require('./structs').default

const pawnLogic = (start, end) => { }

const rookLogic = (start, end) => { }

const knightLogic = (start, end) => { }

const bishopLogic = (start, end) => Math.abs(start.x - end.x) !== Math.abs(start.y - end.y) ? false : bishopHelper(start, end)

const bishopHelper = (curr, end) => {

}

const queenLogic = (start, end) => { }

const kingLogic = (start, end) => { }

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

const playerTurn = (gameObject, message, connection) => {

	/** @type Game */
	let game = gameObject

	let isCurrentPlayer = game.playerW == connection ? true : false
	
	message

	switch(message.type){
	case T_GAME_START:
		if(!isPlayerW) break



		break
	case T_MOVE_PIECE:
			
	}
}

module.exports = { playerTurn, validateMove }
	
// 	if (isPlayerW) {
// 		/*
//    * player W cannot do a lot, just send the target word;
//    * if player B is already available, send message to B
//    */
// 		if (message.type == messages.T_TARGET_WORD) {

// 			if (game.hasTwoConnectedPlayers()) {
// 				game.playerB.send(message)
// 			}
// 		}
// 	} else {
// 		/*
//    * player B can make a guess;
//    * this guess is forwarded to W
//    */
// 		if (message.type == messages.T_MAKE_A_GUESS) {
// 			game.playerW.send(message)
// 			game.setStatus('CHAR GUESSED')
// 		}

// 		/*
//    * player B can state who won/lost
//    */
// 		if (message.type == messages.T_GAME_WON_BY) {
// 			game.setStatus(oMsg.data)
// 			//game was won by somebody, update statistics
// 			game.gamesCompleted++
// 		}
// 	}

