import React, { Component }  from "react"
import ChessBoard from "./ChessBoard"
import { board }  from "./ChessBoard.tsx";


export class Pawn {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;

    constructor(piece) {
        this.pieceElement = piece
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
        //console.log(board)

        let indexOnBoard = board.findIndex(elem => elem.key === this.pieceElement.parentElement?.id);
        //console.log(indexOnBoard)
        //console.log(indexOnBoard - 8)
        //console.log(indexOnBoard - 7)
        //console.log(indexOnBoard - 9)
        //console.log(board[indexOnBoard - 8])
        //console.log(board[indexOnBoard - 7])
        //console.log(board[indexOnBoard - 9])
        //console.log(board[indexOnBoard - 8].props.children)
        //console.log(board[indexOnBoard - 7].props.children)
        //console.log(board[indexOnBoard - 9].props.children)
        //FIX CAPTURING - PROBABLY THE PROBLEM WITH UPDATING THE BOARD
        if (indexOnBoard !== -1 && this.pieceElement.id.includes("White")) {
            const frontSquare = board[indexOnBoard - 8];
            if (frontSquare.props.children?.props.id === "none") {
                moves.push(frontSquare);
                const doubleFrontSquare = board[indexOnBoard - 16];
                if (doubleFrontSquare && board[indexOnBoard].key?.includes("2")) {
                    moves.push(doubleFrontSquare);
                }
            }
            const leftDiagonalSquare = board[indexOnBoard - 7];
            if (leftDiagonalSquare.props.children?.props.id.includes("Black")) {
                moves.push(leftDiagonalSquare);
            }
            const rightDiagonalSquare = board[indexOnBoard - 9];
            if (rightDiagonalSquare.props.children?.props.id.includes("Black")) {
                moves.push(rightDiagonalSquare);
            }
        } else if (indexOnBoard !== -1 && this.pieceElement.id.includes("Black")){
            const frontSquare = board[indexOnBoard + 8];
            if (frontSquare.props.children?.props.id === "none") {
                moves.push(frontSquare);
                const doubleFrontSquare = board[indexOnBoard + 16];
                if (doubleFrontSquare && board[indexOnBoard].key?.includes("7")) {
                    moves.push(doubleFrontSquare);
                }
            }

            // Check for capturing moves diagonally
            const leftDiagonalSquare = board[indexOnBoard + 7];
            if (leftDiagonalSquare.props.children?.props.id !== "none") {
                moves.push(leftDiagonalSquare);
            }

            const rightDiagonalSquare = board[indexOnBoard + 9];
            if (rightDiagonalSquare.props.children?.props.id !== "none") {
                moves.push(rightDiagonalSquare);
            }
        }

        return moves;
    }
}
export class Knight {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class Bishop {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class Rock {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class Queen {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class King {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class MoveLegalityTest {
    public passedTheMove: boolean;
    public piece: any; // Change 'Piece' to 'piece'

    constructor() {
        this.passedTheMove = false; // Initialize to false by default
    }

    public getPiece(piece: any) {
        if (piece.id.includes("Pawn")) {
            this.piece = new Pawn(piece);
        } else if (piece.id.includes("Knight")) {
            this.piece = new Knight();
        } else if (piece.id.includes("Bishop")) {
            this.piece = new Bishop();
        } else if (piece.id.includes("Rock")) {
            this.piece = new Rock();
        } else if (piece.id.includes("Queen")) {
            this.piece = new Queen();
        } else {
            this.piece = new King();
        }
    }

    public checkMove(field: HTMLElement) {
        const finder = this.piece.legalMoves
            .flat()
            .some((parentElement: React.JSX.Element) => {
                const parentId = parentElement.props.id;
                return parentId === field.id;
            });
    
        this.passedTheMove = finder;
    }
}
  //this a prototype for now