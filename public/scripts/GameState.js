class GameState {
	/**
	 * 
	 * @param {any} player1 
	 */
	constructor(player1) {
		this.player1 = player1
		this.player2 = null
	}

	/**
	 * @param {any} player2
	 */
	set player2(player2) {
		this.player2 = player2
	}
}
