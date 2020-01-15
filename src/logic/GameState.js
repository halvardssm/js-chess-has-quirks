const { COLOUR } = require('../../public/shared-js/structs')

class GameState {
	constructor(gameId) {
		this.id = gameId
		this.playerW = null
		this.playerB = null
		this.gameBoard = null
		this.winner = null
	}

	hasTwoConnectedPlayers() {
		return this.playerB != null
	}

	addPlayer(player) {
		if (this.playerW && this.playerB) {
			return new Error('Invalid call to addPlayer, Game full')
		}
	
		if (this.playerW == null) {
			this.playerW = player
			return COLOUR.white
		} else {
			this.black = player
			return COLOUR.black
		}
	}

	getWinner(){
		return this.winner
	}
}

module.exports = GameState
