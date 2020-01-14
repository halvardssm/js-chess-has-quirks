const config = require('../../src/config')
const ui = require('./ui')

(function setup() {
	var socket = new WebSocket(config.WEB_SOCKET_URL)
	var gs = new GameState(vw, sb, socket)
	
	ui()

	socket.onmessage = function(message) {
		let incomingMsg = JSON.parse(message.data)

		//set player type
		if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
			gs.setPlayerType(incomingMsg.data) //should be "A" or "B"

			//if player type is A, (1) pick a word, and (2) sent it to the server
			if (gs.getPlayerType() == 'A') {
			
				socket.send(JSON.stringify(outgoingMsg))
			} else {

			}
		}
	}

	socket.onopen = function() {
		socket.send('{}')
	}

	//server sends a close event only if the game was aborted from some side
	socket.onclose = function() {
		if (gs.whoWon() == null) {
			sb.setStatus(Status['aborted'])
		}
	}

	socket.onerror = function() {}
})()
