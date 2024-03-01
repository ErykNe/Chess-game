import React from "react";
import ChessBoard from "./ChessBoard";
import { board, turn, previousMovement, horizontalAxis } from "./ChessBoard.tsx";
import { ChessPiece, PieceMove } from "./Pieces.tsx";

function convertTo2DArray<T>(boardArray: T[]): T[][] {
    const size = 8; // Assuming it's always an 8x8 board
    const result: T[][] = [];
    for (let i = 0; i < boardArray.length; i += size) {
        result.push(boardArray.slice(i, i + size));
    }
    return result;
}


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