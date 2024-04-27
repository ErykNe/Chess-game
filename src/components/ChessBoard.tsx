import React, { useRef } from 'react';
import './ChessBoard.css';
import Utils from './Utils.tsx';
import Event from './Event.tsx';
import { Piece } from './Pieces.tsx';
import Referee, { KingsCheckmated, KingsUnderCheck, Rules } from './Rules.tsx';
import Essentials, { KingUnderCheckKey, previousMovement, turn } from './Essentials.tsx';

export const verticalAxis = [1,2,3,4,5,6,7,8]
export const horizontalAxis = ['a','b','c','d','e','f','g','h']
export let promotionGridModel: any;
export let chessboardGridModel: any;
export let endGameGridModel: any;
export let gameWinner: any;

export let board : React.JSX.Element [] = ChessGrids()
    LoadBoard(board)
export let gridsBoard: any [] = []
    LoadGrids(gridsBoard)     
export let piecesBoard: Piece [] = []
    LoadPieces(piecesBoard)       
Essentials.Initialize()    

export default function ChessBoard(){
    promotionGridModel = useRef<HTMLDivElement>(null)
    chessboardGridModel = useRef<HTMLDivElement>(null)
    endGameGridModel = useRef<HTMLDivElement>(null)
    gameWinner = useRef<HTMLParagraphElement>(null)
    return (
    <>
    <div id="end-game-grid" className="hidden" ref={endGameGridModel}>
        <p ref={gameWinner}>Winner is</p>
        <a id="btn" onMouseDown={e=>newGame(e)}>New Game</a>
    </div>
    <div id="pawn-promotion-grid" className="hidden" ref={promotionGridModel}>
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Queen", e)}></img>     
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Rock",e)}></img>     
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Knight", e)}></img>     
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Bishop",e)}></img>     
    </div>    
    <div id="chessBoard" ref={chessboardGridModel}>
        {board}
    </div>
    </>
    )
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
                onMouseDown={e => Event.grabPiece(e)} 
                onMouseMove={e => Event.movePiece(e)}
                onMouseUp={(e) => Event.dropPiece(e)}>
                </div>
            )
        }
    }
    return board;
}
export function ChessPieces(){
    let temp : HTMLElement [] = []
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++){
            let piece = board[i][j] as HTMLElement
            if(piece != undefined)
                temp[i][j] = piece
        }
    }
    return temp;
}
export function LoadBoard(board: React.JSX.Element []){
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
export function LoadPieces(pieceboard: Piece []){
    for(let i = 0; i < board.length; i++) {
        let piece = board[i].props?.children as unknown as HTMLElement
        if(piece != undefined){
            let pieceElem = new Piece(board, gridsBoard)
            pieceElem.getPieceType(piece)
            pieceboard[i] = pieceElem
        }
    }
}
export function LoadGrids(gridsBoard : any []){
    for(let i = 0; i < board.length; i++) {
        let grid = board[i] as unknown as HTMLElement
        if(grid != undefined){
            gridsBoard[i] = grid
        }
    }
}

export let rules;
export let referee;
export function changePiecePosition(e: React.MouseEvent) {
    let { newDiv, oldDiv, childElement, secondChildElement, pieceCapture} = Utils.getElementsFromPoint(e);
    const piece : Piece = piecesBoard[board.findIndex(elem => elem.key == oldDiv.id)]
    rules = new Rules([piece, childElement, oldDiv, newDiv])
    rules.adjustMoves(rules, newDiv)
    piece.checkMove(newDiv)
    if(piece.passedTheMove){
        let prop = rules.EnPassantExecuted ? "EnPassantMovement" : rules.CastleExecuted ? "CastleMovement" : "";
        referee = new Referee([piece, childElement, oldDiv, newDiv, prop])
        referee.checkMove()
        if(referee.passedTheMove){
            if(pieceCapture){
                Utils.takePiece(secondChildElement, newDiv)
                secondChildElement = newDiv.firstChild as HTMLElement
            }
            if (rules.PawnPromotion()) {
                promotionGridModel.current?.classList.remove("hidden");
                chessboardGridModel.current?.classList.add("disabled");
            
                const pieces = rules.BlackPromotion
                    ? ['Chess_qdt45.svg.png', 'Chess_rdt45.svg.png', 'Chess_ndt45.svg.png', 'Chess_bdt45.svg.png']
                    : ['Chess_qlt45.svg.png', 'Chess_rlt45.svg.png', 'Chess_nlt45.svg.png', 'Chess_blt45.svg.png'];
            
                const childImg = Array.from(promotionGridModel.current?.children) as any[];
                childImg.forEach((img, index) => {
                    img.src = require(`../assets/${pieces[index]}`);
                });
            }
            referee.adjustPiecesOnBoardAccordingly(rules, childElement, secondChildElement, oldDiv, newDiv, e)
        } else {
            Utils.movePieceBack(childElement)
            return
        }
    } else {
        Utils.movePieceBack(childElement)
        return
    }
    Utils.alignPiece(childElement, secondChildElement, newDiv)
    Utils.replacePieces(childElement, secondChildElement, oldDiv, newDiv)
    Utils.replaceBoardElements(oldDiv, newDiv)
    Essentials.UpdateAccordingly(childElement, secondChildElement, oldDiv, newDiv, piece)
    LoadGrids(gridsBoard)
    LoadPieces(piecesBoard)
    const array = Array.from(chessboardGridModel.current?.children) as any[];
    const grid = array.filter(elem => elem.id == newDiv.id)
    for(let i = 0; i < array.length; i++){
        array[i].style.boxShadow = '';
        array[i].style.outline = '';
        array[i].style.outlineOffset = '';
    }
    grid[0].style.boxShadow = 'inset 0 0 50px rgba(255, 255, 0, 0.5)';
    grid[0].style.outline = '3px solid rgba(255, 255, 0, 0.5)';
    grid[0].style.outlineOffset = '-3px';
    if(KingsUnderCheck()){
        const kingDiv = array.find(elem => elem.children[0]?.id.includes(KingUnderCheckKey))
        kingDiv.style.boxShadow = 'inset 0 0 50px rgba(255, 0, 0, 0.45)';
        kingDiv.style.outline = '3px solid rgba(255, 0, 0, 0.35)';
        kingDiv.style.outlineOffset = '-3px';
        if(KingsCheckmated(array)){
            if(KingUnderCheckKey == "BlackKing"){
                gameWinner.current.innerText = "White wins!"
            } else {
                gameWinner.current.innerText = "Black wins!"
            }
            endGameGridModel.current?.classList.remove("hidden")
        }
    } 
}
function newGame(e: React.MouseEvent){
    
}