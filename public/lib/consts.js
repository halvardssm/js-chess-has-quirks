export const PORT = 2000
export const WEB_SOCKET_BASE_URL = 'ws://localhost:'
export const WEB_SOCKET_URL = `${WEB_SOCKET_BASE_URL}${PORT}`
export const STATUS = {
	gameWon: 'Congratulations! You won!',
	gameLost: 'Game over. You lost!',
	playAgain: ' <a href=\'/play\'>Play again!</a>'
}
STATUS.aborted = 'Your gaming partner is no longer available, game aborted. ' + STATUS['playAgain']
	