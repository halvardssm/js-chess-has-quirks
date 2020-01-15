class Game {
	constructor(socket){
		this.socket = socket
		this.playerType = null
		this.boardArray = null
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

	generateBoard() {
		const canvas = document.getElementById('game-board')
		const ctx = canvas.getContext('2d')
		let height = canvas.style.height

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
				
		this.boardArray.forEach((y, i) => y.forEach((x, j) => {
			ctx.fillStyle = ((i + j) % 2 == 0) ? 'white' : 'black'
			const squareSize = 50
			const boardTopx = 50
			const boardTopy = 50
			let xOffset = boardTopx + j * squareSize
			let yOffset = boardTopy + i * squareSize
			ctx.fillRect(xOffset, yOffset, squareSize, squareSize)
		}))
	}}
