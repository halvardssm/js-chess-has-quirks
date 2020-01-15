// @ts-nocheck
/* global Structs */
((exports) => {
	const { COLOUR } = typeof exports === 'undefined' ? Structs : require('./structs')

	exports.T_GAME_START = 'GAME-START'
	exports.O_GAME_START = {
		type: exports.T_GAME_START,
		data: null
	}

	/*
   * Server to client: abort game (e.g. if second player exited the game)
   */
	exports.O_GAME_ABORTED = {
		type: 'GAME-ABORTED'
	}
	exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED)

	/*
   * Server to client: set as player White
   */
	exports.T_PLAYER_TYPE = 'PLAYER-TYPE'
	exports.O_PLAYER_W = {
		type: exports.T_PLAYER_TYPE,
		data: COLOUR.white
	}
	exports.S_PLAYER_W = JSON.stringify(exports.O_PLAYER_W)

	/*
   * Server to client: set as player Black
   */
	exports.O_PLAYER_B = {
		type: exports.T_PLAYER_TYPE,
		data: COLOUR.black
	}
	exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B)

	/*
   * Server to Player A & B: game over with result won/loss
   */
	exports.T_GAME_OVER = 'GAME-OVER'
	exports.O_GAME_OVER = {
		type: exports.T_GAME_OVER,
		data: null
	}

	exports.T_MOVE_PIECE = 'MOVE-PIECE'
	exports.O_MOVE_PIECE = {
		type: exports.T_MOVE_PIECE,
		data: null
	}
})(typeof exports === 'undefined' ? (this.Messages = {}) : exports)
//if exports is undefined, we are on the client; else the server
