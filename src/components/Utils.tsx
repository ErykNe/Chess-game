import React from "react";
import ReactDOM from "react-dom";
import { board }  from "./ChessBoard.tsx";
import './ChessBoard.css';

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
        let index = board.findIndex((elem) => elem.key === newDiv.id);
        const clonedHiddenPiece = cloneEmptyField(hiddenPiece);
        const domNode = convertJsxToDomNode(clonedHiddenPiece);
        let domElement = domNode as HTMLElement;
        domElement.style.display = 'none';
        domElement.id = 'none';
        board[index] = React.cloneElement(board[index], { children: domNode, taken });
        newDiv.removeChild(taken);
        newDiv.appendChild(domNode);
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