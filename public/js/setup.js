// @ts-nocheck

(() => {
	console.log('setup initiated')
	const socket = new WebSocket(Config.WEB_SOCKET_URL)
	const game = new Game(socket)
	
	socket.onmessage = (incomingMsg) => {
		const message = JSON.parse(incomingMsg.data)

		//set player type
		switch (message.type) {
			case Messages.T_PLAYER_TYPE:
				game.setPlayerType(message.data)

				if (game.getPlayerType() === Structs.COLOR.white) {
			
					socket.send(JSON.stringify(outgoingMsg))
				} else {

				}

				break
			case Messages.T_MOVE_PIECE:

				break
		}

		game.generateBoard()
	}

	socket.onopen = function() {
		socket.send('{}')
	}

	//server sends a close event only if the game was aborted from some side
	socket.onclose = function() {
		if (game.whoWon() === null) {
			game.setStatus(Status['aborted'])
		}
	}

	socket.onerror = function() {}
})()
