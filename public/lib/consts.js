export const PORT = 2000
export const WEB_SOCKET_BASE_URL = 'ws://localhost:'
export const WEB_SOCKET_URL = `${WEB_SOCKET_BASE_URL}${PORT}`
export const STATUS = {
	gameWon  : 'Congratulations! You won!',
	gameLost : 'Game over. You lost!',
	aborted  : 'Your gaming partner is no longer available, game aborted.',
	onePlayer: 'Waiting for player 2',
	turn     : 'Your turn!',
	waiting  : 'Waiting for other player to make a move',
	playAgain: '<a href="/play>Play again?</a>'
}
export const COOKIE_SECRET = 'cIsForCookie'
export const COOKIE_VISITED = 'timesVisited'
