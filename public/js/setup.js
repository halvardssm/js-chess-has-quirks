// @ts-nocheck

(() => {
	console.log('setup initiated')
	const socket = new WebSocket(Config.WEB_SOCKET_URL)
	const game = new Game(socket)

	socket.onmessage = (incomingMsg) => {
		const message = JSON.parse(incomingMsg.data)
		console.log(message)
		//set player type
		switch (message.type) {
			case Messages.T_MOVE_PIECE:
				console.log('2')

				game.generateBoard()

				break

			case Messages.T_GAME_START:
				console.log('3')

				console.log('testing', message)
				game.setBoardArray(message.data)
				
				game.generateBoard()

				if(game.getPlayerType() === Structs.COLOUR.white){
					game.enableBoard()
				}
				break
			case Messages.T_PLAYER_TYPE:
				console.log('4')

				game.setPlayerType(message.data)
				return
		}
		console.log('5')

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
})()
