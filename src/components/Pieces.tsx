import React from "react"
import ChessBoard from "./ChessBoard"
import { board }  from "./ChessBoard.tsx";

export class Pawn {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
    
        let indexOnBoard = board.findIndex(elem => elem.props.firstChild === this.pieceElement);
    
        if (indexOnBoard !== -1) {
            // Ensure the element at indexOnBoard + 8 exists
            if (board[indexOnBoard + 8] && board[indexOnBoard + 8].props.firstChild?.key === "none") {
                moves.push(board[indexOnBoard + 8]);
            }
    
            // Ensure the element at indexOnBoard + 7 exists
            if (board[indexOnBoard + 7] && board[indexOnBoard + 7].props.firstChild?.key !== "none") {
                moves.push(board[indexOnBoard + 7]);
            }
    
            // Ensure the element at indexOnBoard + 9 exists
            if (board[indexOnBoard + 9] && board[indexOnBoard + 9].props.firstChild?.key !== "none") {
                moves.push(board[indexOnBoard + 9]);
            }
        }
        console.log(moves)
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
    public passedTheMove: Boolean;
    private Piece: any;
  
    constructor() {
      this.passedTheMove = this.passedTheMove
    }
    public getPiece(piece: HTMLElement){
        if(piece.id.includes("Pawn")){
            this.Piece = new Pawn
        }
        else if (piece.id.includes("Knight")){
            this.Piece = new Knight
        }
        else if (piece.id.includes("Bishop")){
            this.Piece = new Bishop
        }
        else if (piece.id.includes("Rock")){
            this.Piece = new Rock
        }
        else if (piece.id.includes("Queen")){
            this.Piece = new Queen
        }
        else {
            this.Piece = new King
        }
        this.Piece.pieceElement = piece
    }
    public checkMove(field: HTMLElement) {
      let finder = this.Piece.legalMoves.findIndex(elem => elem == field)
      if(finder == undefined){
        this.passedTheMove = false
      } else {
        this.passedTheMove = true
      }
    }

  }
  //this a prototype for now