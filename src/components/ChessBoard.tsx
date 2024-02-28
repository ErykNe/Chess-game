import React, { Component } from 'react';
import './ChessBoard.css';
import Utils from './Utils.tsx';
import Event from './Event.tsx';
import { MoveLegalityTest } from './Pieces.tsx';
import Rules, { Move } from './Rules.tsx';

const verticalAxis = [1,2,3,4,5,6,7,8]
const horizontalAxis = ['a','b','c','d','e','f','g','h']

export let board : React.JSX.Element [] = ChessGrids()
    LoadPieces(board)
export default function ChessBoard(){
    return <div id="chessBoard">{board}</div>
}
export let move = new Move()
export function ChessGrids(){
    let board : React.JSX.Element [] = []
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++){
            const divId = `grid${horizontalAxis[i]}${verticalAxis[j]}`
            board.push(
                <div 
                className ="pushedGrids" 
                id={divId} 
                key={divId} 
                style={{ backgroundColor: i%2!=0 && j%2===0 || i%2===0 && j%2!=0 ? 'white' : 'initial' }} 
                onMouseDown={e => Event.grabPiece(e)} 
                onMouseMove={e => Event.movePiece(e)}
                onMouseUp={(e) => Event.dropPiece(e)}>
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
            if(i % 8 === 0){
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
            let ChessPiece = <img className="chessPiece" id={PieceName}key={PieceName} src={sauce} style={{display: sauce === "" ? 'none' : ''}}></img>
            board[i] = React.cloneElement(board[i], board[i].props.children, ChessPiece)
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
    const referee = new MoveLegalityTest
    referee.getPiece(childElement)
    //console.log(newDiv)
    referee.checkMove(newDiv)
    if(referee.passedTheMove){
        if(childElement.id.includes("White")){
            if(move.Turn != "White"){
                Utils.movePieceBack(childElement)
                return
            }
            move.Turn = "Black";
        } else {
            if(move.Turn == "White"){
                Utils.movePieceBack(childElement)
                return
            }
            move.Turn = "White";
        }
        //here second referee - double check if move is coherent with chess rules
        const anotherReferee = new Rules(childElement);
        //here if statements
        if(chessPieceElements.length > 1){
            Utils.takePiece(secondChildElement, newDiv)
            secondChildElement = newDiv.firstChild as HTMLElement
        }
    } else {
        Utils.movePieceBack(childElement)
        return
    }
    Utils.alignPiece(childElement, secondChildElement, newDiv)
    replacePieces(childElement, secondChildElement, oldDiv, newDiv)
    let index1 = board.findIndex(elem => elem.key === newDiv.id)
    let index2 = board.findIndex(elem => elem.key === oldDiv.id)
    if (index1 !== -1 && index2 !== -1) {
        const temp = board[index1].props.children
        board[index1] = React.cloneElement(board[index1], { children: board[index2].props.children })
        board[index2] = React.cloneElement(board[index2], { children: temp })
    }  
    move.previous = [childElement, childElement.parentElement?.id]
    move.wasDoubleSquare = false;
    console.log(move.previous)
}
function replacePieces(x: HTMLElement, y: HTMLElement, divx: HTMLElement, divy: HTMLElement){
    if (divx && divy) {
        divy.removeChild(y)
        divx.appendChild(y)
        divx.removeChild(x)
        divy.appendChild(x)
    }
}