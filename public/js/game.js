import { Position } from '../lib/index.js'
import { modifyClassName } from '../lib/index.js'

const CLASS_AVAILABLE_MOVE = 'available-move'
export default class Game {
	constructor(socket){
		this.socket = socket
		this.playerType = null
		this.boardArray = null
		this.winner = null
	}

	setPlayerType(playerType){
		this.playerType = playerType
	}

	setBoardArray(boardArray){
		console.log('setting board array')
		console.log(boardArray)
		let counter = 0
		this.boardArray = boardArray.map(arr => arr.map(el => {if(el !== null){el.availableMoves.push(new Position(counter++ % 2 ? 5 : 4, 3))}return el}))
	}

	getPlayerType(){
		return this.playerType
	}

	getWinner(){
		return this.winner
	}

	// only enable if it is the right player
	enableBoard(){

	}



	generateBoard() {
		console.log('generating board')

		let counter = 0

		const board = document.getElementById('board')
		this.boardArray.forEach((arr, y) => {

			const row = document.createElement('div')
			row.className = 'row'
			
			arr.forEach((el, x) => {
				const cell = document.createElement('div')
				cell.className = `col ${counter++ % 2 ? 'white' : 'black'}`
				cell.id = `cell-${x}${y}`
				if(el){
					cell.className += ' piece'
					cell.addEventListener('click', (e) => {
						
						el.availableMoves.forEach(pos => {
							const availableCell = document.getElementById(`cell-${pos.x}${pos.y}`)

							modifyClassName(availableCell, CLASS_AVAILABLE_MOVE, availableCell.className.includes(CLASS_AVAILABLE_MOVE))
						})

						const availableCells = document.getElementsByClassName(CLASS_AVAILABLE_MOVE)
						console.log(availableCells)
						
						// for (let availableCell of availableCells) {
						// 	console.log(el.availableMoves.includes(new Position(parseInt(availableCell.id.split('-').pop()[0]), parseInt(availableCell.id.split('-').pop()[1]))))
						// 	if(!el.availableMoves.includes(new Position(parseInt(availableCell.id.split('-').pop()[0]), parseInt(availableCell.id.split('-').pop()[1])))){
						// 		modifyClassName(availableCell, CLASS_AVAILABLE_MOVE, true)
						// 	}
						// }
						//TODO: add logic for showing available moves
					})

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
