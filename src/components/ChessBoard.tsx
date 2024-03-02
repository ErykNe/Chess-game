import React, { Component } from 'react';
import './ChessBoard.css';
import Utils from './Utils.tsx';
import Event from './Event.tsx';
import Rules from './Rules.tsx';
import { ChessPiece, PieceMove } from './Pieces.tsx';
import Essentials from './Essentials.tsx';

export const verticalAxis = [1,2,3,4,5,6,7,8]
export const horizontalAxis = ['a','b','c','d','e','f','g','h']

export let board : React.JSX.Element [][] = ChessGrids()
LoadPiecesOnBoard(board)
Essentials.Initialize()
export let previousMovement: PieceMove;
export let turn: string = "White";
export default function ChessBoard(){
    return <div id="chessBoard">{board}</div>
}
export function ChessGrids(){
    let board: React.JSX.Element[][] = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        let row: React.JSX.Element[] = [];
        for (let i = 0; i < horizontalAxis.length; i++) {
            const divId = `grid${horizontalAxis[i]}${verticalAxis[j]}`;
            row.push(
                <div 
                    className="pushedGrids" 
                    id={divId} 
                    key={divId} 
                    style={{ backgroundColor: i % 2 !== 0 && j % 2 === 0 || i % 2 === 0 && j % 2 !== 0 ? 'white' : 'initial' }} 
                    onMouseDown={e => Event.grabPiece(e)} 
                    onMouseMove={e => Event.movePiece(e)}
                    onMouseUp={(e) => Event.dropPiece(e)}
                ></div>
            );
        }
        board.push(row);
    }
    return board;
}
export function LoadPiecesOnBoard(board: React.JSX.Element[][]) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let PieceName = "none";
            let sauce = "";

            if (board[i][j].key === `grid${horizontalAxis[j]}7`) {
                PieceName = "BlackPawn";
                sauce = require('../assets/Chess_pdt45.svg.png');
            } else if (board[i][j].key === `grid${horizontalAxis[j]}2`) {
                PieceName = "WhitePawn";
                sauce = require('../assets/Chess_plt45.svg.png');
            } else if (board[i][j].key === 'gridh1' || board[i][j].key === 'grida1') {
                PieceName = "WhiteRook";
                sauce = require('../assets/Chess_rlt45.svg.png');
            } else if (board[i][j].key === 'gridh8' || board[i][j].key === 'grida8') {
                PieceName = "BlackRook";
                sauce = require('../assets/Chess_rdt45.svg.png');
            } else if (board[i][j].key === 'gridb1' || board[i][j].key === 'gridg1') {
                PieceName = "WhiteKnight";
                sauce = require('../assets/Chess_nlt45.svg.png');
            } else if (board[i][j].key === 'gridb8' || board[i][j].key === 'gridg8') {
                PieceName = "BlackKnight";
                sauce = require('../assets/Chess_ndt45.svg.png');
            } else if (board[i][j].key === 'gridc1' || board[i][j].key === 'gridf1') {
                PieceName = "WhiteBishop";
                sauce = require('../assets/Chess_blt45.svg.png')
            } else if (board[i][j].key === 'gridc8' || board[i][j].key === 'gridf8') {
                PieceName = "BlackBishop";
                sauce = require('../assets/Chess_bdt45.svg.png')
            } else if (board[i][j].key === 'gridd1') {
                PieceName = "WhiteQueen"
                sauce = require('../assets/Chess_qlt45.svg.png')
            } else if (board[i][j].key === 'gridd8') {
                PieceName = "BlackQueen"
                sauce = require('../assets/Chess_qdt45.svg.png')
            } else if(board[i][j].key === 'gride1'){
                PieceName = "WhiteKing"
                sauce = require('../assets/Chess_klt45.svg.png')
            } else if(board[i][j].key === 'gride8'){
                PieceName = "BlackKing"
                sauce = require('../assets/Chess_kdt45.svg.png')
            }
            let ChessImg = <img className="chessPiece" id={PieceName} key={PieceName} src={sauce} style={{ display: sauce === "" ? 'none' : '' }}></img>;

            board[i][j] = React.cloneElement(board[i][j], board[i][j].props.children, ChessImg);
        }
    }
}

export function changePiecePosition(e: React.MouseEvent) {

    
    const pushedGridsElements = document.elementsFromPoint(e.clientX, e.clientY)
    const chessPieceElements = pushedGridsElements.filter(element => element.classList.contains("chessPiece"))
    let newDiv = pushedGridsElements[1] as HTMLElement
    const childElement = pushedGridsElements[0] as HTMLElement
    let secondChildElement = pushedGridsElements[1].firstChild as HTMLElement
    let oldDiv = pushedGridsElements[0].parentElement as HTMLElement
    if (chessPieceElements.length > 1) {
        secondChildElement = pushedGridsElements[1] as HTMLElement
        newDiv = pushedGridsElements[2] as HTMLElement
        oldDiv = pushedGridsElements[0].parentElement as HTMLElement
    } 


    
    let Piece = new ChessPiece(childElement, oldDiv)
    Piece.Movement = new PieceMove(Piece, newDiv, oldDiv)

    if(!Piece.Movement.MoveIsIllegal()){
        Utils.movePieceBack(Piece.piece.pieceElement)
        return
    } 
    const referee = new Rules(Piece.Movement)
    referee.CheckCompatibilityWithTurn(childElement)
    if(referee.TurnDoesntMatchPieceType){
        Utils.movePieceBack(Piece.piece.pieceElement)
        return
    }
    if(chessPieceElements.length > 1){
        Utils.takePiece(secondChildElement, newDiv)
        secondChildElement = newDiv.firstChild as HTMLElement
    }
    if(Piece.Movement.isEnPassant && Piece.piece.EnPassantMove.key?.at(4) == newDiv.id.at(4)){
        Utils.takePiece(previousMovement.move[0].piece.pieceElement, document.getElementById(previousMovement.move[1].id) as HTMLElement)
        secondChildElement = newDiv.firstChild as HTMLElement
    }

    if(Piece.Movement.isCastle && Piece.piece.castleMove[0].key == newDiv.id){
        console.log("Castle")
        
    }
    if(Piece.Movement.isCastle && Piece.piece.castleMove[1].key == newDiv.id){
        console.log("Castle")

    }
    
 
    Utils.alignPiece(childElement, secondChildElement, newDiv)
    Utils.replacePieces(childElement, secondChildElement, oldDiv, newDiv)

    let indexInCol1 = board.findIndex(row => row.findIndex(square => square.key === newDiv.id) !== -1);
    let indexInRow1 = board[indexInCol1].findIndex(square => square.key === newDiv.id);

    let indexInCol2 = board.findIndex(row => row.findIndex(square => square.key === oldDiv.id) !== -1);
    let indexInRow2 = board[indexInCol2].findIndex(square => square.key === oldDiv.id);

    if (indexInCol1 !== -1 && indexInRow1 !== -1 && indexInCol2 !== -1 && indexInRow2 !== -1) {
        const temp = board[indexInCol1][indexInRow1].props.children
        board[indexInCol1][indexInRow1] = React.cloneElement(board[indexInCol1][indexInRow1], { children: board[indexInCol2][indexInRow2].props.children })
        board[indexInCol2][indexInRow2] = React.cloneElement(board[indexInCol2][indexInRow2], { children: temp })
    }  

    turn = turn === "White" ? "Black" : "White"
    previousMovement = Piece.Movement
    Essentials.Update()

}