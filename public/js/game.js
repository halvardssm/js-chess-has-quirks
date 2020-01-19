import { Position, O_MOVE_PIECE, COLOUR, modifyClassName } from '../lib/index.js'

const ID_BOARD = 'board'
const ID_CELL = 'cell'

const CLASS_AVAILABLE_MOVE = 'available-move'
const CLASS_PIECE = 'piece'
const CLASS_ROW = 'row'
const CLASS_COL = 'col'
const CLASS_ENABLED = 'enabled'

const EL_DIV = 'div'
const EL_IMG = 'img'

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
		this.boardArray = boardArray
	}

	getPlayerType(){
		return this.playerType
	}

	getWinner(){
		return this.winner
	}

	generateBoard(ws) {
		console.log('generating board')

		let counter = 0

		const board = document.getElementById(ID_BOARD)

		while (board.firstChild) {
			board.removeChild(board.firstChild)
		}

		this.boardArray.forEach((arr, x) => {

			const row = document.createElement(EL_DIV)
			modifyClassName(row, CLASS_ROW)
			
			arr.forEach((el, y) => {
				const cell = document.createElement(EL_DIV)
				modifyClassName(cell, `${CLASS_COL} ${counter++ % 2 ? COLOUR.white.toLowerCase() : COLOUR.black.toLowerCase()}`)
				cell.id = `${ID_CELL}-${x}${y}`
				if (el){
					modifyClassName(cell, CLASS_PIECE)

					if (this.isActivePlayer && el.colour === this.playerType){
						modifyClassName(cell, CLASS_ENABLED)

						cell.addEventListener('click', (e) => {
							console.log('yey')
							el.availableMoves.forEach(pos => {
								const availableCell = document.getElementById(`cell-${pos.x}${pos.y}`)

								modifyClassName(availableCell, CLASS_AVAILABLE_MOVE, availableCell.className.includes(CLASS_AVAILABLE_MOVE))

								availableCell.addEventListener('click', (ev) => {
									this.changeActivePlayer()

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

					const svg = document.createElement(EL_IMG)
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
