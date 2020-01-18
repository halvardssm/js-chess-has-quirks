import { T_MOVE_PIECE, T_GAME_START, T_PLAYER_TYPE, T_BOARD, WEB_SOCKET_URL, COLOUR } from '../lib/index.js'
import Game from './game.js'

console.log('setup initiated')
const socket = new WebSocket(WEB_SOCKET_URL)
const game = new Game(socket)

socket.onmessage = (incomingMsg) => {
	const message = JSON.parse(incomingMsg.data)
	//set player type
	console.log(message)
	switch (message.type) {
		case T_MOVE_PIECE:

			game.generateBoard(socket)

			break

		case T_GAME_START:

			if(game.getPlayerType() === COLOUR.white){
				game.enableBoard()
			}
			break

		case T_BOARD:
			game.setBoardArray(message.data)
			game.generateBoard(socket)
			
			break
		case T_PLAYER_TYPE:

			game.setPlayerType(message.data)
			return
	}

}

socket.onopen = function () {
	socket.send('{}')
}

//server sends a close event only if the game was aborted from some side
socket.onclose = function() {
	if (game.getWinner() === null) {
		// game.setStatus(Status['aborted'])
	}
}

socket.onerror = function () { }
