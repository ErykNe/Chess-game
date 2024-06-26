import React from "react";
import { Pawn, Piece } from "./Pieces.tsx";
import { LoadGrids, LoadPieces, board, gridsBoard, piecesBoard, horizontalAxis, chessboardGridModel } from "./ChessBoard.tsx";
import Essentials, { KingUnderCheckKey, previousMovement, setKingUnderCheckKey, turn } from "./Essentials.tsx";
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
            return
        }
        //checking if king is under attack
        let kingWhiteIndex = this.boardAfterMove.findIndex(elem => elem.props?.children?.key.includes("WhiteKing"));
        let kingBlackIndex = this.boardAfterMove.findIndex(elem => elem.props?.children?.key.includes("BlackKing"));
        if (kingBlackIndex && kingWhiteIndex) {
            for (let i = 0; i < this.boardAfterMove.length; i++) {
                if (this.piecesBoardPrediction[i].piece?.legalMoves?.find(elem => elem.key == this.gridBoardPrediction[kingBlackIndex].key) && turn == "Black" &&
                this.piecesBoardPrediction[i].piece.pieceElement?.key.includes("White")
                    && !(this.boardAfterMove[i].key == this.movement[2].id)) {
                    this.passedTheMove = false;
                    return
                }
                if (this.piecesBoardPrediction[i].piece?.legalMoves?.find(elem => elem.key == this.gridBoardPrediction[kingWhiteIndex].key) && turn == "White"  &&
                this.piecesBoardPrediction[i].piece.pieceElement?.key.includes("Black")
                && !(this.boardAfterMove[i].key == this.movement[2].id)) {
                    this.passedTheMove = false;
                    return
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
                let rookElements = document.elementsFromPoint(e.clientX + 90, e.clientY)
                let freeElements = document.elementsFromPoint(e.clientX - 195, e.clientY)
                    let a = 0;
                    while(!rookElements[0].id.includes("Rock")){
                        rookElements = document.elementsFromPoint(e.clientX + a, e.clientY)
                        a+=5;
                    }
                    let freeChildElement = freeElements[0].firstChild as HTMLElement
                    let b = 0;
                    while(!freeChildElement.id.includes("none")){
                        freeElements = document.elementsFromPoint(e.clientX - 195 + b, e.clientY)
                        b+=5;
                        freeChildElement = freeElements[0].firstChild as HTMLElement
                    }
                  
            const rookChildElement = rookElements[0] as HTMLElement
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
                let rookElements = document.elementsFromPoint(e.clientX - 195, e.clientY)
                let freeElements = document.elementsFromPoint(e.clientX + 195, e.clientY)
                    let a = 0;
                    while(!rookElements[0].id.includes("Rock")){
                        rookElements = document.elementsFromPoint(e.clientX - a, e.clientY)
                        a+=5;
                    }
                    let freeChildElement = freeElements[0].firstChild as HTMLElement
                    let b = 0;
                    while(!freeChildElement.id.includes("none")){
                        freeElements = document.elementsFromPoint(e.clientX + 150 - b, e.clientY)
                        b+=5;
                        freeChildElement = freeElements[0].firstChild as HTMLElement
                    }
                  
                const rookChildElement = rookElements[0] as HTMLElement
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
        }
    }
}
export class Rules {
    public movement: any
    public EnPassantExecuted: boolean = false
    public CastleExecuted: boolean = false
    public ShortCastle:boolean
    public BlackPromotion:boolean
    public KingUnderCheckKey: string
    public CastleType:string[] = []

    constructor(movement:any){
        this.movement = movement
    }
    public adjustMoves(rules, newDiv){
        if(rules.EnPassantAvailable()){
            if (previousMovement[3].id.charAt(5) == '5' && this.movement[1].id.includes("Pawn")) {
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(board.findIndex(elem => elem.key == previousMovement[3].id)) - 8])
                if(newDiv.id == board[(board.findIndex(elem => elem.key == previousMovement[3].id)) - 8].key){
                    rules.EnPassantExecuted = true;
                }
            }
            if (previousMovement[3].id.charAt(5) == '4' && this.movement[1].id.includes("Pawn")) {
                piecesBoard[piecesBoard.findIndex(elem => elem == rules.movement[0])].piece.legalMoves.push(board[(board.findIndex(elem => elem.key == previousMovement[3].id)) + 8])
                if(newDiv.id == board[(board.findIndex(elem => elem.key == previousMovement[3].id)) + 8].key){
                    rules.EnPassantExecuted = true;
                }
            }
        }
        if(rules.CastleAvailable()){
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
        try {
            if (previousMovement[4] === "DoubleSquarePawnMovement") {
                if (previousMovement[3].id.charAt(5) == this.movement[2].id.charAt(5)) {
                    return true; 
                }
            }
        } catch (error) {
        }
        return false;
    }
    public CastleAvailable(){  
        let bul = false
        try {
            if(this.movement[1].id == "WhiteKing" && !Essentials.Read[1]){
                if(!Essentials.Read[4] && ((board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 1].props?.children?.key.includes("none")
                && board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 2].props?.children?.key.includes("none")
                && board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 3].props?.children?.key.includes("none"))) 
                && board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 4].props?.children?.key.includes("WhiteRock")){
                    this.CastleType.push("LongWhite")
                    bul = true
                }
                if(!Essentials.Read[5] && ((board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 1].props?.children?.key.includes("none")
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 2].props?.children?.key.includes("none")))
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 3].props?.children?.key.includes("WhiteRock")){
                    this.CastleType.push("ShortWhite")
                    bul = true                    
                }
            }
            if(this.movement[1].id == "BlackKing" && !Essentials.Read[0]){
                if(!Essentials.Read[2] && ((board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 1].props?.children?.key.includes("none")
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 2].props?.children?.key.includes("none")
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 3].props?.children?.key.includes("none")))
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) - 4].props?.children?.key.includes("BlackRock")){
                    this.CastleType.push("LongBlack")
                    bul = true                    
                }
                if(!Essentials.Read[3] && ((board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 1].props?.children?.key.includes("none")
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 2].props?.children?.key.includes("none")))
                    && board[(board.findIndex(elem => elem.key == this.movement[2].id)) + 3].props?.children?.key.includes("BlackRock")){
                    this.CastleType.push("ShortBlack")
                    bul = true
                }
            }
        } catch (error) {
        }
        return bul
    }
    public PawnPromotion(){
        if(this.movement[0].piece.pieceElement?.key.includes("BlackPawn") && this.movement[3].id.includes("1")){
            this.BlackPromotion = true
            return true
        }
        if(this.movement[0].piece.pieceElement?.key.includes("WhitePawn") && this.movement[3].id.includes("8")){
            this.BlackPromotion = false
            return true
        }
    }
}
export function KingsUnderCheck(){
    let kingWhiteIndex = board.findIndex(elem => elem.props?.children?.key.includes("WhiteKing"));
    let kingBlackIndex = board.findIndex(elem => elem.props?.children?.key.includes("BlackKing"));
    let pieceAttackingBlackKing = piecesBoard.find(elem => elem.piece?.legalMoves?.find(elem => elem.key == gridsBoard[kingBlackIndex].key))
    let pieceAttackingWhiteKing = piecesBoard.find(elem => elem.piece?.legalMoves?.find(elem => elem.key == gridsBoard[kingWhiteIndex].key))
    if(pieceAttackingBlackKing && turn == "Black" && pieceAttackingBlackKing.piece.pieceElement?.key.includes("White")){
        setKingUnderCheckKey("BlackKing");
        return true
    }
    if(pieceAttackingWhiteKing && turn == "White" && pieceAttackingWhiteKing.piece.pieceElement?.key.includes("Black")){
        setKingUnderCheckKey("WhiteKing");
        return true
    }
    return false
}
export function KingsCheckmated(chessBoardArray): boolean {
    const color = KingUnderCheckKey === "BlackKing" ? "Black" : KingUnderCheckKey === "WhiteKing" ? "White" : turn;
    for (let i = 0; i < piecesBoard.length; i++) {
        const piece = piecesBoard[i];
        const pieceGrid = chessBoardArray[i];
        const pieceGridChild = pieceGrid.children[0];
        if (pieceGridChild.id.includes(color)) {
            try{
            const moves = piece.piece.legalMoves;
            for (let j = 0; j < moves.length; j++) {
                const move = moves[j];
                const moveGrid = chessBoardArray.find(elem => elem.id === move.key);
                if (moveGrid && !moveGrid.children[0].id.includes(color)) {
                    const referee = new Referee([piece, pieceGridChild, pieceGrid, moveGrid, ""]);
                    referee.checkMove();
                    if (referee.passedTheMove) {
                        return false;
                    }
                }
            }
            } catch {continue}
        }
    }
    return true;
}