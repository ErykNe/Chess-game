import React from "react";
import ReactDOM from "react-dom";
import { board, chessboardGridModel, piecesBoard, promotionGridModel }  from "./ChessBoard.tsx";
import './ChessBoard.css';
import Prediction from "./Prediction.tsx";
import { turn } from "./Essentials.tsx";

export default {
    movePieceBack: function movePieceBack(piece: HTMLElement): void {
      piece.style.width = `${piece.parentElement?.clientWidth}px`;
      piece.style.height = `${piece.parentElement?.clientHeight}px`;
      piece.style.top = `${piece.parentElement?.offsetTop}px`;
      piece.style.left = `${piece.parentElement?.offsetLeft}px`;
      piece.style.animation = 'none';
      piece.style.position = '';
    },
  
    takePiece: function takePiece(taken: HTMLElement, newDiv: HTMLElement): void {
      const hiddenPiece = findEmptyField();
      if (hiddenPiece) {
          const index = board.findIndex((elem) => elem.key === newDiv.id);
          const clonedHiddenPiece = cloneEmptyField(hiddenPiece);
          const domNode = convertJsxToDomNode(clonedHiddenPiece);
          const domElement = domNode as HTMLElement;
          domElement.style.display = 'none';
          domElement.id = "none";
          newDiv.innerHTML = '';
          newDiv.appendChild(domNode);
          const updatedElement = React.cloneElement(board[index], { children: clonedHiddenPiece });
          board[index] = updatedElement;
          const takenIndex = board.findIndex((elem) => elem.key === taken.parentElement?.id);
          if (takenIndex !== -1) {
              const updatedTakenElement = React.cloneElement(board[takenIndex], { children: clonedHiddenPiece });
              board[takenIndex] = updatedTakenElement;
          }
      }
    },
  
    alignPiece: function alignPiece(childElement: HTMLElement, secondChildElement: HTMLElement, newDiv: HTMLElement): void {
      childElement.style.width = `${newDiv.clientWidth}px`;
      childElement.style.height = `${newDiv.clientHeight}px`;
      childElement.style.top = `${newDiv.offsetTop}px`;
      childElement.style.left = `${newDiv.offsetLeft}px`;
      childElement.style.animation = 'none';
      childElement.style.position = '';
      secondChildElement.style.animation = 'none';
    },
    getElementsFromPoint(e: React.MouseEvent) {
      const pushedGridsElements = document.elementsFromPoint(e.clientX, e.clientY);
      const chessPieceElements = pushedGridsElements.filter(element => element.classList.contains("chessPiece"));

      let newDiv: HTMLElement;
      let oldDiv: HTMLElement;
      let childElement: HTMLElement;
      let secondChildElement: HTMLElement;
      let pieceCapture:boolean;

      if (chessPieceElements.length > 1) {
        newDiv = pushedGridsElements[2] as HTMLElement;
        oldDiv = pushedGridsElements[0].parentElement as HTMLElement;
        childElement = pushedGridsElements[0] as HTMLElement;
        secondChildElement = pushedGridsElements[1] as HTMLElement;
        pieceCapture = true;
      } else {
        newDiv = pushedGridsElements[1] as HTMLElement;
        oldDiv = pushedGridsElements[0].parentElement as HTMLElement;
        childElement = pushedGridsElements[0] as HTMLElement;
        secondChildElement = pushedGridsElements[1].firstChild as HTMLElement;
        pieceCapture = false;
      }
      return { newDiv, oldDiv, childElement, secondChildElement, pieceCapture};
    },
    convertTo2DArray: function convertTo2DArray<T>(boardArray: T[]): T[][] {
      const size = 8;
      const result: T[][] = [];
      for (let i = 0; i < boardArray.length; i += size) {
          result.push(boardArray.slice(i, i + size));
      }
      return result;
    },
    replacePieces: function replacePieces(x: HTMLElement, y: HTMLElement, divx: HTMLElement, divy: HTMLElement){
      if (divx && divy) {
          divy.removeChild(y)
          divx.appendChild(y)
          divx.removeChild(x)
          divy.appendChild(x)
      }
    },
    replaceBoardElements(oldDiv:HTMLElement, newDiv:HTMLElement){
      let index1 = board.findIndex(elem => elem.key === newDiv.id)
      let index2 = board.findIndex(elem => elem.key === oldDiv.id)
      if (index1 !== -1 && index2 !== -1) {
        const temp = board[index1].props.children
        board[index1] = React.cloneElement(board[index1], { children: board[index2].props.children })
        board[index2] = React.cloneElement(board[index2], { children: temp })
      }    
    },
    promotePawn(promotionType:string){
      promotionGridModel.current?.classList.add("hidden")
      chessboardGridModel.current?.classList.remove("disabled")
      console.log(promotionType)
      for(let i = 0; i < piecesBoard.length; i++){
        if(board[i].props.children?.key.includes("WhitePawn") && board[i].key?.includes("8")){
          switch (promotionType) {
            case "Queen":
                updatePiece("WhiteQueen", require('../assets/Chess_qlt45.svg.png'), i);
                break;
            case "Rock":
                updatePiece("WhiteRock", require('../assets/Chess_rlt45.svg.png'), i);
                break;
            case "Knight":
                updatePiece("WhiteKnight", require('../assets/Chess_nlt45.svg.png'), i);
                break;
            case "Bishop":
                updatePiece("WhiteBishop", require('../assets/Chess_blt45.svg.png'), i);
                break;
          }
        }
        if(board[i].props.children?.key.includes("BlackPawn") && board[i].key?.includes("1")){
          switch(promotionType){
            case "Queen":
                updatePiece("BlackQueen", require('../assets/Chess_qdt45.svg.png'), i);
                break;
            case "Rock":
                updatePiece("BlackRock", require('../assets/Chess_rdt45.svg.png'), i);
                break;
            case "Knight":
                updatePiece("BlackKnight", require('../assets/Chess_ndt45.svg.png'), i);
                break;
            case "Bishop":
                updatePiece("BlackBishop", require('../assets/Chess_bdt45.svg.png'), i);
                break; 
          }
        }
      }
    }
};
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
    const clonedHiddenPiece = React.createElement(hiddenPiece.tagName.toLowerCase(), {
      key: hiddenPiece.id,
      className: 'chessPiece',
      style: { display: '' },
    });

    return clonedHiddenPiece;
}

function convertJsxToDomNode(jsxElement: JSX.Element): Node {
    const container = document.createElement('div');
    ReactDOM.render(jsxElement, container);
    return container.firstChild as Node;
}

function updatePiece(newKey, newSrc, i) {
  const updatedElement = React.cloneElement(board[i], { 
      children: React.cloneElement(board[i].props.children, { key: newKey, src: newSrc }) 
  });
  board[i] = updatedElement;

  const thisIsBs = Array.from(chessboardGridModel.current?.children) as any[];
  thisIsBs[i].children[0].id = newKey;
  thisIsBs[i].children[0].src = newSrc;
}