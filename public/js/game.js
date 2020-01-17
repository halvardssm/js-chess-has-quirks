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
		this.boardArray = boardArray
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
				
				if(el !== null){
					cell.className = cell.className + ' piece'
					cell.addEventListener('click', () => {
						console.log(arr, y, el, x)
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
		// function AlphabetBoard(gs) {
		// 	//only initialize for player that should actually be able to use the board
		// 	this.initialize = function() {
		// 		var elements = document.querySelectorAll('.alphabet')
		// 		Array.from(elements).forEach(function(el) {
		// 			el.addEventListener('click', function singleClick(e) {
		// 				var clickedLetter = e.target.id
		// 				new Audio('../data/click.wav').play()
		// 				gs.updateGame(clickedLetter)
		
		// 				/*
		//          * every letter can only be selected once; handling this within
		//          * JS is one option, here simply remove the event listener when a click happened
		//          */
		// 				el.removeEventListener('click', singleClick, false)
		// 			})
		// 		})
		// 	}
		// }
	}
}
