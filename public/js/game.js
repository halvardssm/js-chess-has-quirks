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
		const canvas = document.getElementById('game-board')
		const ctx = canvas.getContext('2d')
		let height = canvas.style.height

		this.boardArray.forEach((y, i) => y.forEach((x, j) => {
			ctx.fillStyle = ((i + j) % 2 == 0) ? 'white' : 'black'
			const squareSize = 30
			let xOffset = squareSize + j * squareSize
			let yOffset = squareSize + i * squareSize
			ctx.fillRect(xOffset, yOffset, squareSize, squareSize)
		}))
		// https://codepen.io/wafs/pen/iJjsd?editors=1010
		// https://www.quickprogrammingtips.com/javascript/how-to-draw-a-chessboard-in-html-canvas-using-javascript.html
		// https://github.com/moroshko/chessboard/blob/master/chessboard.js
		// https://stackoverflow.com/questions/26432492/chessboard-html5-only
		// https://www.w3schools.com/graphics/game_controllers.asp
		// function drawChessboard() {
		// 	// size of each chess square
		// 	const squareSize = 50;
		// 	// position of board's top left
		// 	const boardTopx = 50;
		// 	const boardTopy = 50;
		// 	let canvas = document.getElementById("canvasChessboard");
		// 	context = canvas.getContext("2d");
		// 	for(let i=0; i<8; i++) {
		// 	  for(let j=0; j<8; j++) {
		// 		context.fillStyle = ((i+j)%2==0) ? "white":"black";
		// 		let xOffset = boardTopx + j*squareSize;
		// 		let yOffset = boardTopy + i*squareSize;
		// 		context.fillRect(xOffset, yOffset, squareSize, squareSize);
		// 	  }
		// 	}
		// 	// draw the border around the chessboard
		// 	context.strokeStyle = "black";
		// 	context.strokeRect(boardTopx, boardTopy, squareSize*8, squareSize*8)
		//   }
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
