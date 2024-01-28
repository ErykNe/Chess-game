import React from "react"
import ChessBoard from "./ChessBoard"
import { board }  from "./ChessBoard.tsx";

export class Pawn {
    public legalMoves : React.JSX.Element []
}
export class Knight {
    public legalMoves : React.JSX.Element []
}
export class Bishop {
    public legalMoves : React.JSX.Element []
}
export class Rock {
    public legalMoves : React.JSX.Element []
}
export class Queen {
    public legalMoves : React.JSX.Element []
}
export class King {
    public legalMoves : React.JSX.Element []
}
export class MoveLegalityTest {
    public passedTheMove: Boolean;
    private Piece: any;
  
    constructor() {
      this.passedTheMove = this.passedTheMove
    }
    public getPieceType(pieceId: string){
        if(pieceId.includes("Pawn")){
            this.Piece = new Pawn
        }
        else if (pieceId.includes("Knight")){
            this.Piece = new Knight
        }
        else if (pieceId.includes("Bishop")){
            this.Piece = new Bishop
        }
        else if (pieceId.includes("Rock")){
            this.Piece = new Rock
        }
        else if (pieceId.includes("Queen")){
            this.Piece = new Queen
        }
        else {
            this.Piece = new King
        }
    }
    public checkMove(field: HTMLElement) {
      let element = board.find(elem => elem.key == field.id)
      let finder = this.Piece.legalMoves.findIndex(elem => elem == element)
      if(finder == -1){
        this.passedTheMove = false
      } else {
        this.passedTheMove = true
      }
    }

  }
  //this a prototype for now