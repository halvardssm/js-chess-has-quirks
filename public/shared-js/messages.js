import { COLOUR } from './structs.js'
	
export const T_GAME_START = 'GAME-START'
export const O_GAME_START = {
	type: T_GAME_START,
	data: null
}

/*
   * Server to client: abort game (e.g. if second player exited the game)
   */
export const O_GAME_ABORTED = {
	type: 'GAME-ABORTED'
}
export const S_GAME_ABORTED = JSON.stringify(O_GAME_ABORTED)

/*
   * Server to client: set as player White
   */
export const T_PLAYER_TYPE = 'PLAYER-TYPE'
export const O_PLAYER_W = {
	type: T_PLAYER_TYPE,
	data: COLOUR.white
}
export const S_PLAYER_W = JSON.stringify(O_PLAYER_W)

/*
   * Server to client: set as player Black
   */
export const O_PLAYER_B = {
	type: T_PLAYER_TYPE,
	data: COLOUR.black
}
export const S_PLAYER_B = JSON.stringify(O_PLAYER_B)

/*
   * Server to Player A & B: game over with result won/loss
   */
export const T_GAME_OVER = 'GAME-OVER'
export const O_GAME_OVER = {
	type: T_GAME_OVER,
	data: null
}

export const T_MOVE_PIECE = 'MOVE-PIECE'
export const O_MOVE_PIECE = {
	type: T_MOVE_PIECE,
	data: null
}
