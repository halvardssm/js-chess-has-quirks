export const COOKIE_SECRET = 'cIsForCookie'
export const COOKIE_VISITED = 'timesVisited'

export let gameStatus = {
	since:       Date.now() /* since we keep it simple and in-memory, keep track of when this object was created */,
	gamesPlayed: 0 /* number of games initialized */,
	gamesWon:    0 /* number of games successfully completed */
}
