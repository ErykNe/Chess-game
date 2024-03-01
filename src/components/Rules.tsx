import React from "react";
import ChessBoard from "./ChessBoard";
import { board, turn, previousMovement, horizontalAxis } from "./ChessBoard.tsx";
import { ChessPiece, PieceMove } from "./Pieces.tsx";

export let hasKingMoved: [boolean, boolean] = [false, false];
export let hasRook1Moved: [boolean, boolean] = [false, false];
export let hasRook2Moved: [boolean, boolean] = [false, false];

export default class Rules {
   private Turn: string = turn
   private previousMovement: PieceMove = previousMovement
   private movement: PieceMove
   private board: React.JSX.Element[][] = board

   public isKingUnderAttack: boolean
   public isCheckmate: boolean
   public isPawnPromoting: boolean
   public EnPassant: boolean
   public Castle: boolean
   public TurnDoesntMatchPieceType: boolean

   constructor(movement: PieceMove){
        this.movement = movement
        this.isKingUnderAttack = this.CheckKingUnderAttack()
        this.isCheckmate = this.CheckCheckmate()
        this.isPawnPromoting = this.CheckPawnPromoting()
        this.EnPassant = this.CheckEnPassant()
        this.Castle = this.CheckCastle()
   } 
   private CheckKingUnderAttack() {
        return false;
   }
   private CheckCheckmate(){
        return false
   }
   private CheckPawnPromoting(){
        return false;
   }
   private CheckEnPassant(){
        try{
            if(previousMovement.isMovePawnDoubleSquare){
                if(this.movement.piecePreviousPosition.id.includes("5") && this.previousMovement.move[1].id.includes("5") || 
                this.movement.piecePreviousPosition.id.includes("4") && this.previousMovement.move[1].id.includes("4")){
                    let first = horizontalAxis.findIndex(elem => elem === this.movement.piecePreviousPosition.id[4])
                    let second = horizontalAxis.findIndex(elem => elem === this.previousMovement.move[1].id[4])
                    if(first > second){
                        if(first - second == 1){
                            return true;
                        }
                    } else {
                        if(second - first == 1){
                            return true;
                        }
                    }
                }
            }
        } catch { return false }
        return false;
   }
   private CheckCastle(){
        try {
            if(this.movement.move[0].piece.pieceElement.id.includes("King")){
                if(this.movement.move[0].piece.pieceElement.id.includes("White")){
                    if(this.movement.piecePreviousPosition.id.includes("1")){
                        console.log(board[7][0].props.children?.props.id)
                        if(board[7][0].props.children.props.id.includes("Rook")){
                            console.log(board[7][1].props.children.props.id)
                            console.log(board[7][2].props.children.props.id)
                            console.log(board[7][3].props.children.props.id)
                            if(board[7][1].props.children.props.id.includes("none") && 
                            board[7][2].props.children.props.id.includes("none") && 
                            board[7][3].props.children.props.id.includes("none") && hasKingMoved[0] == false && hasRook1Moved[0] == false && hasRook2Moved[0] == false){
                                console.log("CASTLE AVAILABLE")
                                return true
                            }
                        }
                        if(board[7][7].props.children.props.id.includes("Rook")){
                            console.log("We gettin theere")
                            if(board[7][5].props.children.props.id.includes("none") && board[7][6].props.children.props.id.includes("none") 
                            && hasKingMoved[0] == false && hasRook1Moved[0] == false && hasRook2Moved[0] == false){
                                console.log("CASTLE AVAILABLE")
                                return true
                            }
                        }
                    }
                } else {
                    if(this.movement.piecePreviousPosition.id.includes("8")){
                        console.log(board[0][0].props.children?.props.id)
                        if(board[0][0].props.children.props.id.includes("Rook")){
                            console.log(board[0][1].props.children.props.id)
                            console.log(board[0][2].props.children.props.id)
                            console.log(board[0][3].props.children.props.id)
                            if(board[0][1].props.children.props.id.includes("none") && 
                            board[0][2].props.children.props.id.includes("none") && 
                            board[0][3].props.children.props.id.includes("none")){
                                console.log("CASTLE AVAILABLE")
                                return true
                            }
                        }
                        if(board[0][7].props.children.props.id.includes("Rook")){
                            console.log("We gettin theere")
                            if(board[0][5].props.children.props.id.includes("none") && board[0][6].props.children.props.id.includes("none")){
                                console.log("CASTLE AVAILABLE")
                                return true
                            }
                        }
                    }
                }
            }
        } catch { return false }
        return false;
   }
   public CheckCompatibilityWithTurn(elem) {
        if(elem.id.includes("White")){
            this.TurnDoesntMatchPieceType = this.Turn === "Black"
        } else {
            this.TurnDoesntMatchPieceType =  this.Turn === "White"
        }
   }
}
export function setHasKingMoved(value: [boolean, boolean]): void {
    hasKingMoved = value;
}
export function setHasRook1Moved(value: [boolean, boolean]): void {
    hasRook1Moved = value;
}
export function setHasRook2Moved(value: [boolean, boolean]): void {
    hasRook2Moved = value;
}