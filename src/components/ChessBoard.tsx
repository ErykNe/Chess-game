import React from 'react';
import './ChessBoard.css';

const verticalAxis = ["1","2","3","4","5","6","7","8"]
const horizontalAxis = ["a","b","c","d","e","f","g","h"]

export default function ChessBoard(){
    let board : React.JSX.Element [] = ChessGrids()
    LoadPieces(board)
    return <div id="chessBoard">{board}</div>
}
export function ChessGrids(){
    console.log("ChessGrids function called");
    let board : React.JSX.Element [] = []
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++){
            const divId = `grid${horizontalAxis[i]}${verticalAxis[j]}`;
            board.push(
                <div className ="pushedGrids" key={divId} style={{ backgroundColor: i%2!=0 && j%2==0 || i%2==0 && j%2!=0 ? 'white' : 'initial' }}>
                </div>
            )
        }
    }
    return board;
}
export function LoadPieces(board: React.JSX.Element []){
    let indexHorizontal = 0
    for(let i = 0; i < board.length; i++){
        indexHorizontal++
        let PieceName = "none"
            if(i % 8 == 0){
                indexHorizontal = 0
            }
            let sauce = ""
            //pawns
            if(board[i].key == `grid${horizontalAxis[indexHorizontal]}7`){
                PieceName = "BlackPawn"
                sauce = require('../assets/Chess_pdt45.svg.png')
            }
            if(board[i].key == `grid${horizontalAxis[indexHorizontal]}2`){
                PieceName = "WhitePawn"
                sauce = require('../assets/Chess_plt45.svg.png')
            }
            //rocks
            if(board[i].key === 'gridh1' || board[i].key === 'grida1'){
                PieceName = "WhiteRock"
                sauce = require('../assets/Chess_rlt45.svg.png')
            }
            if(board[i].key === 'gridh8' || board[i].key === 'grida8'){
                PieceName = "BlackRock"
                sauce = require('../assets/Chess_rdt45.svg.png')
            }
            //knights
            if(board[i].key === 'gridb1' || board[i].key === 'gridg1'){
                PieceName = "WhiteKnight"
                sauce = require('../assets/Chess_nlt45.svg.png')
            }
            if(board[i].key === 'gridb8' || board[i].key === 'gridg8'){
                PieceName = "BlackKnight"
                sauce = require('../assets/Chess_ndt45.svg.png')
            }
            //bishops
            if(board[i].key === 'gridc1' || board[i].key === 'gridf1'){
                PieceName = "WhiteBishop"
                sauce = require('../assets/Chess_blt45.svg.png')
            }
            if(board[i].key === 'gridc8' || board[i].key === 'gridf8'){
                PieceName = "BlackBishop"
                sauce = require('../assets/Chess_bdt45.svg.png')
            }
            //queens
            if(board[i].key === 'gridd1'){
                PieceName = "WhiteQueen"
                sauce = require('../assets/Chess_qlt45.svg.png')
            }
            if(board[i].key === 'gridd8'){
                PieceName = "BlackQueen"
                sauce = require('../assets/Chess_qdt45.svg.png')
            }
            //kings
            if(board[i].key === 'gride1'){
                PieceName = "WhiteKing"
                sauce = require('../assets/Chess_klt45.svg.png')
            }
            if(board[i].key === 'gride8'){
                PieceName = "BlackKing"
                sauce = require('../assets/Chess_kdt45.svg.png')
            }
            let ChessPiece = <img className="chessPiece" key = {PieceName} src={sauce} style={{display: sauce == "" ? 'none' : ''}}></img>
            board[i] = React.cloneElement(board[i], board[i].props.children, ChessPiece);
    }
}