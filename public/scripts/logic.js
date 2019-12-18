const validateMove = (piece, end) => {
    let start = new Position(piece.position.x, piece.position.y);

    switch (piece.type) {
        case TYPES.pawn:
            pawnLogic(start, end) ? piece.move(end) : alert("Invalid move!")
            break

        case TYPES.rook:
            rookLogic(start, end) ? piece.move(end) : alert("Invalid Move!")
            break

        case TYPES.knight:
            knightLogic(start, end) ? piece.move(end) : alert("Invalid move!")
            break

        case TYPES.bishop:
            bishopLogic(start, end) ? piece.move(end) : alert("Invalid move!")
            break

        case TYPES.queen:
            queenLogic(start, end) ? piece.move(end) : alert("Invalid move!")
            break

        case TYPES.king:
            kingLogic(start, end) ? piece.move(end) : alert("Invalid move!")
            break

        default:
            alert("Invalid piece given")
            break
    }
}

const pawnLogic = (start, end) => { }

const rookLogic = (start, end) => { }

const knightLogic = (start, end) => { }

const bishopLogic = (start, end) => Math.abs(start.x - end.x) !== Math.abs(start.y - end.y) ? false : (curr, end) => {

}

const queenLogic = (start, end) => { }

const kingLogic = (start, end) => { }