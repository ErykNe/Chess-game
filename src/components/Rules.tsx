import React from "react";
import ChessBoard from "./ChessBoard";
import { board, turn, previousMovement, horizontalAxis } from "./ChessBoard.tsx";
import { ChessPiece, PieceMove } from "./Pieces.tsx";
import { BlackKingMoved, BlackRook1Moved, BlackRook2Moved, WhiteKingMoved, WhiteRook1Moved, WhiteRook2Moved } from "./Essentials.tsx";

export default class Rules {
   private Turn: string = turn
   private previousMovement: PieceMove = previousMovement
   private movement: PieceMove
   private board: React.JSX.Element[][] = board

   public isKingUnderAttack: boolean
   public isCheckmate: boolean
   public isPawnPromoting: boolean
   public EnPassant: boolean
   public ShortCastle: boolean
   public LongCastle: boolean
   public WhiteCanCastle: boolean
   public BlackCanCastle: boolean
   public TurnDoesntMatchPieceType: boolean

   constructor(movement: PieceMove){
        this.movement = movement
        this.isKingUnderAttack = this.CheckKingUnderAttack()
        this.isCheckmate = this.CheckCheckmate()
        this.isPawnPromoting = this.CheckPawnPromoting()
        this.EnPassant = this.CheckEnPassant()
        this.CheckCastle()
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
                if(this.movement.move[0].piece.pieceElement.id.includes("White") && !WhiteKingMoved){
                    if(this.movement.piecePreviousPosition.id.includes("1")){
                        console.log(board[7][0].props.children?.props.id)
                        if(!WhiteRook1Moved){
                            console.log("We gettin theere")
                            if((board[7][1].props.children.props.id.includes("none") || board[7][1].props.children.props.id == undefined) && 
                            (board[7][2].props.children.props.id.includes("none") || board[7][2].props.children.props.id == undefined) && 
                            (board[7][3].props.children.props.id.includes("none") || board[7][3].props.children.props.id == undefined)){
                                console.log("LONG CASTLE AVAILABLE")
                                this.LongCastle = true
                                this.WhiteCanCastle = true
                            }
                        }
                        if(!WhiteRook2Moved){
                            console.log("We gettin theere")
                            if((board[7][5].props.children.props.id.includes("none") || board[7][5].props.children.props.id == undefined)
                            && (board[7][6].props.children.props.id.includes("none") || board[7][6].props.children.props.id == undefined)){
                                console.log("SHORT CASTLE AVAILABLE")
                                this.ShortCastle = true
                                this.WhiteCanCastle = true
                            }
                        }
                    }
                } else if (this.movement.move[0].piece.pieceElement.id.includes("Black") && !BlackKingMoved) {
                    if(this.movement.piecePreviousPosition.id.includes("8")){
                        console.log(board[0][0].props.children?.props.id)
                        if(!BlackRook1Moved){
                            console.log("We gettin theere")
                            console.log(board[0][1].props.children?.props.id)
                            console.log(board[0][2].props.children?.props.id)
                            console.log(board[0][3].props.children?.props.id)
                            if((board[0][1].props.children.props.id.includes("none") || board[0][1].props.children.props.id == undefined) &&
                            (board[0][2].props.children.props.id.includes("none") || board[0][2].props.children.props.id == undefined) && 
                            (board[0][3].props.children.props.id.includes("none") || board[0][3].props.children.props.id == undefined)){
                                console.log("LONG CASTLE AVAILABLE")
                                this.LongCastle = true
                                this.BlackCanCastle = true
                            }
                        }
                        if(!BlackRook2Moved){
                            console.log("We gettin theere")
                            console.log(board[0][5].props.children?.props.id)
                            console.log(board[0][6].props.children?.props.id)
                            if((board[0][5].props.children.props.id.includes("none") || board[0][5].props.children.props.id == undefined) && 
                            (board[0][6].props.children.props.id.includes("none") || board[0][6].props.children.props.id == undefined)){
                                console.log("SHORT CASTLE AVAILABLE")
                                this.ShortCastle = true
                                this.BlackCanCastle = true
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
   public EnPassantExecute(){
            let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.movement.piecePreviousPosition.id) !== -1);
            let indexInRow = board[indexInCol].findIndex(square => square.key === this.movement.piecePreviousPosition.id);
            let lit =  this.movement.move[0].piece.pieceElement.id.includes("White") ? -1 : 1;
            const leftDiagonalSquare = board[indexInCol + lit][indexInRow - lit];
            console.log(board[indexInCol][indexInRow - lit].key)
            console.log(previousMovement.move[0].gridElement.id)
            
            if (board[indexInCol][indexInRow - lit].key?.at(4) === previousMovement.move[0].gridElement.id[4]) {
                this.movement.move[0].legalMoves.push(leftDiagonalSquare);
                this.movement.move[0].piece.EnPassantMove = (leftDiagonalSquare)
            }
            const rightDiagonalSquare = board[indexInCol + lit][indexInRow + lit];
            if (board[indexInCol][indexInRow + lit].key?.at(4) === previousMovement.move[0].gridElement.id[4]) {
                this.movement.move[0].legalMoves.push(rightDiagonalSquare);
                this.movement.move[0].piece.EnPassantMove = (rightDiagonalSquare)
            }
            this.movement.isEnPassant = true;
   }
   public BlackCastleExecute(CastleType: string){
        console.log("RRRRRRRRRAAAAAAAAAAAAHHHHHHHHHHHH")
        if(CastleType == "short")
            this.movement.move[0].legalMoves.push(board[0][6])
            this.movement.move[0].piece.castleMove.push(board[0][6])
        if (CastleType == "long")
            this.movement.move[0].legalMoves.push(board[0][2])
            this.movement.move[0].piece.castleMove.push(board[0][2])
        console.log(this.movement.move[0].piece.castleMove)    
        this.movement.isCastle = true
   }
   public WhiteCastleExecute(CastleType: string){
        console.log("RRRRRRRRRAAAAAAAAAAAAHHHHHHHHHHHH")
        if(CastleType == "short")
            this.movement.move[0].legalMoves.push(board[7][6])
            this.movement.move[0].piece.castleMove.push(board[7][6])
        if (CastleType == "long")
            this.movement.move[0].legalMoves.push(board[7][2])
            this.movement.move[0].piece.castleMove.push(board[7][2])
        console.log(this.movement.move[0].piece.castleMove)       
        this.movement.isCastle = true
   }
}