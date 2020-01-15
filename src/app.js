import express from 'express'
import http from 'http'
import path from 'path'
import websocket from 'ws'
import { PORT } from '../public/shared-js/consts.js'
import * as messages from '../public/shared-js/messages.js'
import { COLOUR } from '../public/shared-js/structs.js'
import Game from './logic/GameState.js'
import { playerTurn } from './logic/logic.js'
import { gameStatus } from './logic/statTracker.js'

const router = express.Router()
const app = express()

app.set('views', path.join(path.resolve(), '/public/views'))

app.set('view engine', 'ejs')
app.use(express.static(path.join(path.resolve(), '/public')))

router.get('/play', function(req, res) {
	res.render('game.ejs')
})

router.get('/', (req, res) => {
	res.render('splash.ejs', {
		gamesInitialized: gameStatus.gamesInitialized,
		gamesCompleted: gameStatus.gamesCompleted
	})
})

app.use(router)
const server = http.createServer(app)
const wss = new websocket.Server({ server })

let websockets = {} //property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(function() {
	for (let i in websockets) {
		if (Object.prototype.hasOwnProperty.call(websockets, i)) {
			let gameObj = websockets[i]
			//if the gameObj has a final status, the game is complete/aborted
			if (gameObj.finalStatus != null) {
				delete websockets[i]
			}
		}
	}
}, 50000)

let currentGame = new Game(gameStatus.gamesInitialized++)
let connectionID = 0 //each websocket receives a unique ID

wss.on('connection', function connection(ws) {
	/*
   * two-player game: every two players are added to the same game
   */
	let con = ws
	con.id = connectionID++
	let playerType = currentGame.addPlayer(con) // Returns W or B
	websockets[con.id] = currentGame

	console.log(
		'Player %s placed in game %s as %s',
		con.id,
		currentGame.id,
		playerType
	)

	/*
   * inform the client about its assigned player type
   */
	con.send(playerType === COLOUR.black ? messages.S_PLAYER_W : messages.S_PLAYER_B)

	/*
   * once we have two players, there is no way back;
   * a new game object is created;
   * if a player now leaves, the game is aborted (player is not preplaced)
   */
	if (currentGame.hasTwoConnectedPlayers()) {
		let outgoingMessage = messages.O_GAME_START
		outgoingMessage.data = currentGame.getBoard()
		// console.log(outgoingMessage)
		con.send(JSON.stringify(outgoingMessage))
		currentGame = new Game(gameStatus.gamesInitialized++)
	}

	/*
   * message coming in from a player:
   *  1. determine the game object
   *  2. determine the opposing player OP
   *  3. send the message to OP
   */
	con.on('message', function incoming(message) {
		let oMsg = JSON.parse(message)

		let gameObj = websockets[con.id]

		playerTurn(gameObj, oMsg, con)
	})

	con.on('close', function(code) {
		/*
     * code 1001 means almost always closing initiated by the client;
     * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
     */
		console.log(con.id + ' disconnected ...')

		if (code == '1001') {
			/*
       * if possible, abort the game; if not, the game is already completed
       */
			let gameObj = websockets[con.id]

			try {
				gameObj.playerW.close()
				gameObj.playerW = null
			} catch (e) {
				console.log('Player W closing: ' + e)
			}

			try {
				gameObj.playerB.close()
				gameObj.playerB = null
			} catch (e) {
				console.log('Player B closing: ' + e)
			}
		}
		currentGame = new Game(gameStatus.gamesInitialized++)
	})
})

server.listen(PORT, () => {
	console.log(`connect to http://localhost:${PORT}`)
})
