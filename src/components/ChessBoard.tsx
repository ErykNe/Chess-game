import React, { Component } from 'react';
import './ChessBoard.css';

const verticalAxis = [1,2,3,4,5,6,7,8]
const horizontalAxis = ['a','b','c','d','e','f','g','h']
let board : React.JSX.Element [] = ChessGrids()
    LoadPieces(board)
let PieceActive: HTMLElement | null = null
function grabPiece(e: React.MouseEvent) {
    const piece = e.target as HTMLElement
    console.log(piece)
    const chessBoard = document.getElementById('chessBoard')
    console.log(chessBoard)
    if (piece.tagName.toLowerCase() === 'img' && PieceActive == null) {
        PieceActive = piece
        if (chessBoard) {
            const boardRect = chessBoard.getBoundingClientRect();
            const xPercentage = ((e.clientX - boardRect.left - 56.25) / boardRect.width) * 100
            const yPercentage = ((e.clientY - boardRect.top - 56.25) / boardRect.height) * 100
            piece.style.position = 'absolute'
            piece.style.left = `${xPercentage}%`
            piece.style.top = `${yPercentage}%`
        }
    }
}
function movePiece(e: React.MouseEvent) {
    const piece = e.target as HTMLElement
    const chessBoard = document.getElementById('chessBoard')
    if (piece.tagName.toLowerCase() === 'img' && PieceActive == piece) {
        if (chessBoard) {
          const boardRect = chessBoard.getBoundingClientRect();
          const xPercentage = ((e.clientX - boardRect.left - 56.25) / boardRect.width) * 100
          const yPercentage = ((e.clientY - boardRect.top - 56.25) / boardRect.height) * 100
          piece.style.position = 'absolute'
          piece.style.left = `${xPercentage}%`
          piece.style.top = `${yPercentage}%`
        }
    } 
}
function dropPiece(e: React.MouseEvent) {
    if (PieceActive = e.target as HTMLElement) {
      const pushedGridsElements = document.elementsFromPoint(e.clientX, e.clientY);
      const piece = e.target as HTMLElement
      if (pushedGridsElements.some(element => element.className == "pushedGrids") && piece.className == "chessPiece") {
        console.log("Position changed!");
        changePiecePosition(e);
      }
      PieceActive = null;
    }
  }
export default function ChessBoard(){
    return <div id="chessBoard">{board}</div>
}
export function ChessGrids(){
    console.log("ChessGrids function called");
    let board : React.JSX.Element [] = []
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++){
            const divId = `grid${horizontalAxis[i]}${verticalAxis[j]}`;
            board.push(
                <div 
                className ="pushedGrids" 
                id={divId} 
                key={divId} 
                style={{ backgroundColor: i%2!=0 && j%2===0 || i%2===0 && j%2!=0 ? 'white' : 'initial' }} 
                onMouseDown={e => grabPiece(e)} 
                onMouseMove={e => movePiece(e)}
                onMouseUp={(e) => dropPiece(e)}>
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

    if (chessPieceElements.length > 1) {
        //find free field, clode the img thing and replace it with piece that is taken  
        console.log("There are at least two pieces!")
    }
    const childElement = pushedGridsElements[0] as HTMLElement
    const secondChildElement = pushedGridsElements[1].firstChild as HTMLElement
    const newDiv = pushedGridsElements[1] as HTMLElement
    const oldDiv = pushedGridsElements[0].parentElement as HTMLElement
    console.log(newDiv)
    console.log(oldDiv)

    // Ustawia nowe pozycje dla childElement
    childElement.style.width = `${newDiv.clientWidth}px`
    childElement.style.height = `${newDiv.clientHeight}px`
    childElement.style.top = `${newDiv.offsetTop}px`
    childElement.style.left = `${newDiv.offsetLeft}px`
    secondChildElement.style.animation = 'none'
    childElement.style.animation = 'none'
    childElement.style.position = ''

    // Przenieś childElement pod newDiv
    if (oldDiv && newDiv) {
        oldDiv.removeChild(childElement)
        newDiv.appendChild(childElement)
        newDiv.removeChild(secondChildElement)
        oldDiv.appendChild(secondChildElement)
    }

    let index1 = board.findIndex(elem => elem.key === newDiv.id)
    let index2 = board.findIndex(elem => elem.key === oldDiv.id)
    console.log(index1)
    console.log(index2)
    if (index1 !== -1 && index2 !== -1) {
        const temp = board[index1].props.children
        board[index1] = React.cloneElement(board[index1], { children: board[index2].props.children })
        board[index2] = React.cloneElement(board[index2], { children: temp })
    }    
}