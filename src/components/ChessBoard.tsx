import React, { Component, useEffect } from 'react';
import './ChessBoard.css';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';

const verticalAxis = [1,2,3,4,5,6,7,8]
const horizontalAxis = ['a','b','c','d','e','f','g','h']
let board : React.JSX.Element [] = ChessGrids()
    LoadPieces(board)

    function ChessPiece({ id, sauce }: { id: string; sauce: string }): JSX.Element {
        const [animation, setAnimation] = useSpring(() => ({
          opacity: 0,
          transform: 'scale(1.4)',
        }));
      
        useEffect(() => {
          setAnimation({
            opacity: 1,
            transform: 'scale(1)',
            reset: true,
          });
        }, [setAnimation]);
      
        return (
          <animated.img
            className="chessPiece"
            id={id}
            key={id}
            src={sauce}
            style={{
              display: sauce === '' ? 'none' : '',
              ...animation,
            }}
          ></animated.img>
        );
      }    
let PieceActive: HTMLElement | null = null
function grabPiece(e: React.MouseEvent) {
    const piece = e.target as HTMLElement
    const chessBoard = document.getElementById('chessBoard')
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
        changePiecePosition(e)
      } else if (piece.className == "chessPiece") {
        movePieceBack(piece)
      }
      PieceActive = null;
    }
  }
export default function ChessBoard(){
    return <div id="chessBoard">{board}</div>
}
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
            let ChessPiece = (
                <img
                  className={`chessPiece ${PieceName} placepawn-animation`}
                  id={PieceName}
                  key={PieceName}
                  src={sauce}
                  style={{
                    display: sauce === '' ? 'none' : '',
                  }}
                />
              );
          
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
        if(secondChildElement.id.includes("White") && childElement.id.includes("White")
        || secondChildElement.id.includes("Black") && childElement.id.includes("Black")){
            movePieceBack(childElement)
            return
        } else {
            takePiece(secondChildElement, newDiv)
            secondChildElement = newDiv.firstChild as HTMLElement
        }
    } 
    alignPiece(childElement, secondChildElement, newDiv)
    if (oldDiv && newDiv) {
        console.log(newDiv)
        console.log(oldDiv)
        console.log(secondChildElement)
        console.log(childElement)
        newDiv.removeChild(secondChildElement)
        oldDiv.appendChild(secondChildElement)
        oldDiv.removeChild(childElement)
        newDiv.appendChild(childElement)
    }
    let index1 = board.findIndex(elem => elem.key === newDiv.id)
    let index2 = board.findIndex(elem => elem.key === oldDiv.id)
    if (index1 !== -1 && index2 !== -1) {
        const temp = board[index1].props.children
        board[index1] = React.cloneElement(board[index1], { children: board[index2].props.children })
        board[index2] = React.cloneElement(board[index2], { children: temp })
    }    
    console.log("Test")
}
export function movePieceBack(piece: HTMLElement){
    piece.style.width = `${piece.parentElement?.clientWidth}px`
    piece.style.height = `${piece.parentElement?.clientHeight}px`
    piece.style.top = `${piece.parentElement?.offsetTop}px`
    piece.style.left = `${piece.parentElement?.offsetLeft}px`
    piece.style.animation = 'none'
    piece.style.position = ''
}
export function takePiece(taken: HTMLElement, newDiv: HTMLElement) {
    const hiddenPiece = findEmptyField();
    if (hiddenPiece) {
        let index = board.findIndex(elem => elem.key === newDiv.id)
        const clonedHiddenPiece = cloneEmptyField(hiddenPiece);
        const domNode = convertJsxToDomNode(clonedHiddenPiece);
        let domElement = domNode as HTMLElement
        domElement.style.display = 'none'
        domElement.id = 'none'
        board[index] = React.cloneElement(board[index], { children: domNode, taken})
        newDiv.removeChild(taken);
        newDiv.appendChild(domNode);
    }
}

function findEmptyField(): HTMLElement | null {
    const hiddenPieces = document.querySelectorAll('.chessPiece[style*="display: none"]');
    const hiddenPiecesArray = Array.from(hiddenPieces);
    if (hiddenPiecesArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * hiddenPiecesArray.length);
        const hiddenPiece = hiddenPiecesArray[randomIndex] as HTMLElement;
        return hiddenPiece;
    }
    return null;
}

function cloneEmptyField(hiddenPiece: HTMLElement): JSX.Element {
    const clonedHiddenPiece = React.createElement(
        hiddenPiece.tagName.toLowerCase(),
        {
            key: hiddenPiece.id,
            className: 'chessPiece',
            style: { display: '' },
        },
    );

    return clonedHiddenPiece;
}

function convertJsxToDomNode(jsxElement: JSX.Element): Node {
    const container = document.createElement('div');
    ReactDOM.render(jsxElement, container);
    return container.firstChild as Node;
}
export function alignPiece(childElement: HTMLElement, secondChildElement: HTMLElement, newDiv: HTMLElement){
    childElement.style.width = `${newDiv.clientWidth}px`
    childElement.style.height = `${newDiv.clientHeight}px`
    childElement.style.top = `${newDiv.offsetTop}px`
    childElement.style.left = `${newDiv.offsetLeft}px`
    childElement.style.animation = 'none'
    childElement.style.position = ''
    secondChildElement.style.animation = 'none'
}