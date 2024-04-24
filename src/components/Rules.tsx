import React from "react";
import { Pawn, Piece } from "./Pieces.tsx";
import { LoadGrids, LoadPieces, board, gridsBoard, piecesBoard, horizontalAxis } from "./ChessBoard.tsx";
import Essentials, { previousMovement, turn } from "./Essentials.tsx";
import Prediction from "./Prediction.tsx";
import Utils from "./Utils.tsx";

export default class Referee {
    public movement: [Piece, any, any, any, any] 
    public passedTheMove: boolean
    public boardAfterMove: any[]
    public gridBoardPrediction: any[] 
    public piecesBoardPrediction: any[] 
    constructor (movement:[Piece, any, any, any, any]) {
        this.movement = movement
        this.passedTheMove = true
        this.boardAfterMove = Prediction.getBoardPrediction(this.movement)
        this.gridBoardPrediction = Prediction.getGridsPrediction(this.boardAfterMove)
        this.piecesBoardPrediction = Prediction.getPiecesPrediction(this.boardAfterMove, this.gridBoardPrediction)
    }

    public checkMove() {
        if (!this.movement[1].id.includes(turn)) {
            this.passedTheMove = false;
        }
        console.log(this.piecesBoardPrediction)
        //checking if king is under attack
        let kingWhiteIndex = this.boardAfterMove.findIndex(elem => elem.props?.children?.key.includes("WhiteKing"));
        let kingBlackIndex = this.boardAfterMove.findIndex(elem => elem.props?.children?.key.includes("BlackKing"));
        if (kingBlackIndex && kingWhiteIndex) {
            for (let i = 0; i < this.boardAfterMove.length; i++) {
                if (this.piecesBoardPrediction[i].piece?.legalMoves?.find(elem => elem.key == this.gridBoardPrediction[kingBlackIndex].key) && turn == "Black") {
                    this.passedTheMove = false;
                }
                if (this.piecesBoardPrediction[i].piece?.legalMoves?.find(elem => elem.key == this.gridBoardPrediction[kingWhiteIndex].key) && turn == "White") {
                    this.passedTheMove = false;
                }
            }
        }
    }
    public adjustPiecesOnBoardAccordingly(rules: Rules, childElement:HTMLElement, secondChildElement:HTMLElement, oldDiv:HTMLElement, newDiv:HTMLElement, e: React.MouseEvent){
        if(this.movement[4] == "EnPassantMovement"){
            Utils.takePiece(previousMovement[1], previousMovement[3])
            secondChildElement = newDiv.firstChild as HTMLElement
        }
        if(this.movement[4] == "CastleMovement"){
            if(rules.ShortCastle){
            const rookElements = document.elementsFromPoint(e.clientX + 100, e.clientY)
            const freeElements = document.elementsFromPoint(e.clientX - 100, e.clientY)
            const rookChildElement = rookElements[0] as HTMLElement
            const freeChildElement = freeElements[0].firstChild as HTMLElement
            const freeDivElement = freeElements[0] as HTMLElement
            const rookDivElement = rookElements[1] as HTMLElement    
            let index1 = board.findIndex(elem => elem.key === newDiv.id) + 1
            let index2 = board.findIndex(elem => elem.key === newDiv.id) - 1
            if (index1 !== -1 && index2 !== -1) {
                const temp = board[index1].props.children
                board[index1] = React.cloneElement(board[index1], { children: board[index2].props.children })
                board[index2] = React.cloneElement(board[index2], { children: temp })
            }    
            Utils.alignPiece(rookChildElement, freeChildElement, freeDivElement)
            Utils.replacePieces(rookChildElement, freeChildElement, rookDivElement, freeDivElement)
            } else {
                const rookElements = document.elementsFromPoint(e.clientX - 200, e.clientY)
                const freeElements = document.elementsFromPoint(e.clientX + 100, e.clientY)
                const rookChildElement = rookElements[0] as HTMLElement
                const freeChildElement = freeElements[0].firstChild as HTMLElement
                const freeDivElement = freeElements[0] as HTMLElement
                const rookDivElement = rookElements[1] as HTMLElement    
                let index1 = board.findIndex(elem => elem.key === newDiv.id) - 2
                let index2 = board.findIndex(elem => elem.key === newDiv.id) + 1
                if (index1 !== -1 && index2 !== -1) {
                    const temp = board[index1].props.children
                    board[index1] = React.cloneElement(board[index1], { children: board[index2].props.children })
                    board[index2] = React.cloneElement(board[index2], { children: temp })
                }    
                Utils.alignPiece(rookChildElement, freeChildElement, freeDivElement)
                Utils.replacePieces(rookChildElement, freeChildElement, rookDivElement, freeDivElement)
            }
            console.log(board)
        }
    }
}
export class Rules {
    public movement: any
    public EnPassantExecuted: boolean = false
    public CastleExecuted: boolean = false
    public ShortCastle:boolean
    public CastleType:string[] = []

    constructor(movement:any){
        this.movement = movement
    }
    public adjustMoves(rules, newDiv){
        if(rules.EnPassantAvailable()){
            if (previousMovement[3].id.charAt(5) == '5') {
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(board.findIndex(elem => elem.key == previousMovement[3].id)) - 8])
                if(newDiv.id == board[(board.findIndex(elem => elem.key == previousMovement[3].id)) - 8].key){
                    rules.EnPassantExecuted = true;
                }
            }
            if (previousMovement[3].id.charAt(5) == '4') {
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(board.findIndex(elem => elem.key == previousMovement[3].id)) + 8])
                if(newDiv.id == board[(board.findIndex(elem => elem.key == previousMovement[3].id)) + 8].key){
                    rules.EnPassantExecuted = true;
                }
            }
        }
        if(rules.CastleAvailable()){
            console.log(rules.CastleType)
            let kingWhiteIndex = board.findIndex(elem => elem.props?.children?.key.includes("WhiteKing"));
            let kingBlackIndex = board.findIndex(elem => elem.props?.children?.key.includes("BlackKing"));
            if(rules.CastleType.find(elem => elem.includes('LongBlack')) && !Essentials.Read()[0] && !Essentials.Read()[3]){
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(kingBlackIndex) - 2])
                if (newDiv.id === board[(kingBlackIndex) - 2].key) {
                    rules.CastleExecuted = true;
                    rules.ShortCastle = false;
                }
            }
            if (rules.CastleType.find(elem => elem.includes('ShortBlack')) && !Essentials.Read()[0] && !Essentials.Read()[2]){
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(kingBlackIndex) + 2])
                if (newDiv.id === board[(kingBlackIndex) + 2].key) {
                    rules.CastleExecuted = true;
                    rules.ShortCastle = true;
                }
            }
            if(rules.CastleType.find(elem => elem.includes('ShortWhite')) && !Essentials.Read()[1] && !Essentials.Read()[5]){
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(kingWhiteIndex) + 2])
                if (newDiv.id === board[(kingWhiteIndex) + 2].key) {
                    rules.CastleExecuted = true;
                    rules.ShortCastle = true;
                }
            }
            if (rules.CastleType.find(elem => elem.includes('LongWhite')) && !Essentials.Read()[1] && !Essentials.Read()[4]){
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(kingWhiteIndex) - 2])
                if (newDiv.id === board[(kingWhiteIndex) - 2].key) {
                    rules.CastleExecuted = true;
                    rules.ShortCastle = false;
                }
            }
        }
    }
    public EnPassantAvailable(){
        console.log(previousMovement)
        console.log(this.movement)
        try {
            if (previousMovement[4] === "DoubleSquarePawnMovement") {
                if (previousMovement[3].id.charAt(5) == this.movement[2].id.charAt(5)) {
                    return true; 
                }
            }
        } catch (error) {
            console.error("Error in isEnPassant:", error);
        }
        return false;
    }
    public CastleAvailable(){  
        let bul = false
        try {
            if(this.movement[1].id == "WhiteKing" && !Essentials.Read[1]){
                if((board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 1].props?.children?.key.includes("none")
                || board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 2].props?.children?.key.includes("none")
                || board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 3].props?.children?.key.includes("none"))
                && !Essentials.Read[4]){
                    this.CastleType.push("LongWhite")
                    bul = true
                }
                if((board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 1].props?.children?.key.includes("none")
                    || board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 2].props?.children?.key.includes("none")) && !Essentials.Read[5]){
                    this.CastleType.push("ShortWhite")
                    bul = true                    
                }
            }
            if(this.movement[1].id == "BlackKing" && !Essentials.Read[0]){
                if((board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 1].props?.children?.key.includes("none")
                    || board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 2].props?.children?.key.includes("none")
                    )
                    && !Essentials.Read[2]){
                        this.CastleType.push("ShortBlack")
                        bul = true
                    }
                    if(((board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 1].props?.children?.key.includes("none")
                        || board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 2].props?.children?.key.includes("none"))
                    || board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 3].props?.children?.key.includes("none")) && !Essentials.Read[3]){
                        this.CastleType.push("LongBlack")
                        bul = true                    
                    }
            }
        } catch (error) {
            console.error("Error in CastleAvailable:", error);
        }
        return bul
    }
}