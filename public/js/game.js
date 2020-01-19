import { Position, O_MOVE_PIECE, COLOUR } from '../lib/index.js'
import { modifyClassName } from '../lib/index.js'

const CLASS_AVAILABLE_MOVE = 'available-move'
export default class Game {
	constructor(socket){
		this.socket = socket
		this.playerType = null
		this.boardArray = null
		this.winner = null
		this.isActivePlayer = false
	}

	changeActivePlayer(){
		this.isActivePlayer = !this.isActivePlayer
	}

	setPlayerType(playerType){
		this.playerType = playerType
	}

	setBoardArray(boardArray){
		console.log('setting board array')
		let counter = 0
		this.boardArray = boardArray
		// this.boardArray = boardArray.map(arr => arr.map(el => {if(el !== null){el.availableMoves.push(new Position(counter++ % 2 ? 5 : 4, 3))}return el}))
	}

	getPlayerType(){
		return this.playerType
	}

	getWinner(){
		return this.winner
	}

	// only enable if it is the right player
	enableBoard(){
		this.changeActivePlayer()
	}

	generateBoard(ws) {
		console.log('generating board')

		let counter = 0

		const board = document.getElementById('board')

		while (board.firstChild) {
			board.removeChild(board.firstChild)
		}

		this.boardArray.forEach((arr, x) => {

			const row = document.createElement('div')
			row.className = 'row'
			
			arr.forEach((el, y) => {
				const cell = document.createElement('div')
				cell.className = `col ${counter++ % 2 ? COLOUR.white.toLowerCase() : COLOUR.black.toLowerCase()}`
				cell.id = `cell-${x}${y}`
				if (el !== null && el !== undefined){
					cell.className += ' piece'

					if (this.isActivePlayer){
						cell.addEventListener('click', (e) => {
						
							el.availableMoves.forEach(pos => {
								const availableCell = document.getElementById(`cell-${pos.x}${pos.y}`)

								modifyClassName(availableCell, CLASS_AVAILABLE_MOVE, availableCell.className.includes(CLASS_AVAILABLE_MOVE))

								availableCell.addEventListener('click', (ev) => {
									const msg = O_MOVE_PIECE

									msg.data.from = el.position
									msg.data.to = new Position(pos.x, pos.y)
									ws.send(JSON.stringify(msg))
								})
							})

							const availableCells = document.getElementsByClassName(CLASS_AVAILABLE_MOVE)
						
							for (let availableCell of availableCells) {
								const pos = new Position(parseInt(availableCell.id.split('-').pop()[0]), parseInt(availableCell.id.split('-').pop()[1]))

								const exist = el.availableMoves.find(elPos => elPos.x === pos.x && elPos.y === pos.y)

								if (!exist){
									modifyClassName(availableCell, CLASS_AVAILABLE_MOVE, true)
								}
							}
						})
					}

					const svg = document.createElement('img')
					svg.src = `assets/${el.type}_${el.colour}.svg`
					cell.appendChild(svg)
				}
				row.appendChild(cell)
			})
			counter++

			board.appendChild(row)
		})
	}
}
