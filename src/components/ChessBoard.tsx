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
export let chessboardOriginModel: any;

export let board : React.JSX.Element [] = ChessGrids()
    LoadBoard(board)
export let gridsBoard: any [] = []
    LoadGrids(gridsBoard)     
export let piecesBoard: Piece [] = []
    LoadPieces(piecesBoard)       
Essentials.Initialize()    

export default function ChessBoard({ resetChessBoard }){
    promotionGridModel = useRef<HTMLDivElement>(null)
    chessboardGridModel = useRef<HTMLDivElement>(null)
    endGameGridModel = useRef<HTMLDivElement>(null)
    gameWinner = useRef<HTMLParagraphElement>(null)
    chessboardOriginModel = chessboardGridModel
    function newGame() {
        board = ChessGrids()
        gridsBoard = []
        piecesBoard = []
        LoadBoard(board)
        LoadGrids(gridsBoard)
        LoadPieces(piecesBoard)
        Essentials.Initialize()
        resetChessBoard(); 
        endGameGridModel.current?.classList.add("hidden");
    }
    return (
    <>
    <div id="end-game-grid" className="hidden" ref={endGameGridModel}>
        <p ref={gameWinner}>Winner is</p>
        <a id="btn" onMouseDown={e=>newGame()}>New Game</a>
    </div>
    <div id="pawn-promotion-grid" className="hidden" ref={promotionGridModel}>
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Queen", e)}></img>     
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Rock",e)}></img>     
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Knight", e)}></img>     
        <img className="chessPiece" id="test" key="test" onMouseDown={e=> Utils.promotePawn("Bishop",e)}></img>     
    </div>    
    <div id="chessBoard" ref={chessboardGridModel} onMouseOverCapture={e => checkGameRules(e)}>
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
export function LoadBoard(board: React.JSX.Element []){
    let indexHorizontal = 0
    for(let i = 0; i < board.length; i++){
        indexHorizontal++
        let PieceName = "none"
            if(i % 8 === 0){
                indexHorizontal = 0
            }
            let sauce = ""
            if(board[i].key == `grid${horizontalAxis[indexHorizontal]}7`){
                PieceName = "BlackPawn"
                sauce = require('../assets/Chess_pdt45.svg.png')
            }
            if(board[i].key == `grid${horizontalAxis[indexHorizontal]}2`){
                PieceName = "WhitePawn"
                sauce = require('../assets/Chess_plt45.svg.png')
            }
            if(board[i].key === 'gridh1' || board[i].key === 'grida1'){
                PieceName = "WhiteRock"
                sauce = require('../assets/Chess_rlt45.svg.png')
            }
            if(board[i].key === 'gridh8' || board[i].key === 'grida8'){
                PieceName = "BlackRock"
                sauce = require('../assets/Chess_rdt45.svg.png')
            }
            if(board[i].key === 'gridb1' || board[i].key === 'gridg1'){
                PieceName = "WhiteKnight"
                sauce = require('../assets/Chess_nlt45.svg.png')
            }
            if(board[i].key === 'gridb8' || board[i].key === 'gridg8'){
                PieceName = "BlackKnight"
                sauce = require('../assets/Chess_ndt45.svg.png')
            }
            if(board[i].key === 'gridc1' || board[i].key === 'gridf1'){
                PieceName = "WhiteBishop"
                sauce = require('../assets/Chess_blt45.svg.png')
            }
            if(board[i].key === 'gridc8' || board[i].key === 'gridf8'){
                PieceName = "BlackBishop"
                sauce = require('../assets/Chess_bdt45.svg.png')
            }
            if(board[i].key === 'gridd1'){
                PieceName = "WhiteQueen"
                sauce = require('../assets/Chess_qlt45.svg.png')
            }
            if(board[i].key === 'gridd8'){
                PieceName = "BlackQueen"
                sauce = require('../assets/Chess_qdt45.svg.png')
            }
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

export function changePiecePosition(e: React.MouseEvent) {
    console.log(Essentials.Read())
    let { newDiv, oldDiv, childElement, secondChildElement, pieceCapture } = Utils.getElementsFromPoint(e);
    const pieceIndex = board.findIndex(elem => elem.key === oldDiv.id);
    const piece = piecesBoard[pieceIndex];

    let rules = new Rules([piece, childElement, oldDiv, newDiv]);
    rules.adjustMoves(rules, newDiv);
    piece.checkMove(newDiv);

    if (!piece.passedTheMove) {
        Utils.movePieceBack(childElement);
        return;
    }

    let prop = '';
    if (rules.EnPassantExecuted) prop = 'EnPassantMovement';
    else if (rules.CastleExecuted) prop = 'CastleMovement';
    let referee = new Referee([piece, childElement, oldDiv, newDiv, prop]);
    referee.checkMove();

    if (!referee.passedTheMove) {
        Utils.movePieceBack(childElement);
        return;
    }

    if (pieceCapture) {
        Utils.takePiece(secondChildElement, newDiv);
        secondChildElement = newDiv.firstChild as HTMLElement;
    }

    if (rules.PawnPromotion()) {
        promotionGridModel.current?.classList.remove('hidden');
        chessboardGridModel.current?.classList.add('disabled');
        const pieces = rules.BlackPromotion
            ? ['Chess_qdt45.svg.png', 'Chess_rdt45.svg.png', 'Chess_ndt45.svg.png', 'Chess_bdt45.svg.png']
            : ['Chess_qlt45.svg.png', 'Chess_rlt45.svg.png', 'Chess_nlt45.svg.png', 'Chess_blt45.svg.png'];

        const childImg = Array.from(promotionGridModel.current?.children) as any[];
        childImg.forEach((img, index) => {
            img.src = require(`../assets/${pieces[index]}`);
        });
    }
    referee.adjustPiecesOnBoardAccordingly(rules, childElement, secondChildElement, oldDiv, newDiv, e);
    Utils.alignPiece(childElement, secondChildElement, newDiv);
    Utils.replacePieces(childElement, secondChildElement, oldDiv, newDiv);
    Utils.replaceBoardElements(oldDiv, newDiv);
    Essentials.UpdateAccordingly(childElement, secondChildElement, oldDiv, newDiv, piece);
    LoadGrids(gridsBoard);
    LoadPieces(piecesBoard);

    const array = Array.from(chessboardGridModel.current?.children) as any[];
    for (let i = 0; i < array.length; i++) {
        array[i].style.boxShadow = '';
        array[i].style.outline = '';
        array[i].style.outlineOffset = '';
    }

    const grid = array.find(elem => elem.id === newDiv.id);
    if (grid) {
        grid.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 0, 0.5)';
        grid.style.outline = '3px solid rgba(255, 255, 0, 0.5)';
        grid.style.outlineOffset = '-3px';
    }

    if (KingsUnderCheck()) {
        const kingDiv = array.find(elem => elem.children[0]?.id.includes(KingUnderCheckKey));
        if (kingDiv) {
            kingDiv.style.boxShadow = 'inset 0 0 50px rgba(255, 0, 0, 0.45)';
            kingDiv.style.outline = '3px solid rgba(255, 0, 0, 0.35)';
            kingDiv.style.outlineOffset = '-3px';
        }
    }
    const element = document.getElementById(newDiv.id); //prevents of losing locus and lagging
    if (element) {
        element.focus();
    } else {
        console.error("Element with id 'elementId' not found.");
    }
}
export function checkGameRules(e: any){
    const array = Array.from(chessboardGridModel.current?.children) as any[];
    if (KingsUnderCheck()) {
        if(KingsCheckmated(array)){
            gameWinner.current.innerText = KingUnderCheckKey == "BlackKing" ? "White wins!" : "Black wins!"
            endGameGridModel.current?.classList.remove("hidden")
        }
    } else {
        if(KingsCheckmated(array) && KingUnderCheckKey == turn + "King"){
            gameWinner.current.innerText = "Draw!"
            endGameGridModel.current?.classList.remove("hidden")
        }
    }
}