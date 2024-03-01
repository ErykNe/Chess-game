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
          let indexInCol = board.findIndex(row => row.findIndex(square => square.key === newDiv.id) !== -1);
          let indexInRow = board[indexInCol].findIndex(square => square.key === newDiv.id);
  
          // Clone the hidden piece and convert it to a DOM node
          const clonedHiddenPiece = cloneEmptyField(hiddenPiece);
          const domNode = convertJsxToDomNode(clonedHiddenPiece);
  
          // Set styles and properties for the hidden piece
          const domElement = domNode as HTMLElement;
          domElement.style.display = 'none';
          domElement.id = "none";
  
          // Remove the taken piece from newDiv and add the hidden piece to newDiv
          newDiv.innerHTML = '';
          newDiv.appendChild(domNode);
  
          // Update the board array to reflect the changes
          const updatedElement = React.cloneElement(board[indexInCol][indexInRow], { children: clonedHiddenPiece });
          board[indexInCol][indexInRow] = updatedElement;
  
          // Find the index of the square where the taken piece was located
          let indexInCol2 = board.findIndex(row => row.findIndex(square => square.key === taken.parentElement?.id) !== -1);
          let indexInRow2 = board[indexInCol].findIndex(square => square.key === taken.parentElement?.id);
  
          // If found, update the corresponding element in the board array
          if (indexInCol2 !== -1 && indexInRow2 !== -1) {
              const updatedTakenElement = React.cloneElement(board[indexInCol2][indexInRow2], { children: clonedHiddenPiece });
              board[indexInCol2][indexInRow2] = updatedTakenElement;
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
    replacePieces: function replacePieces(x: HTMLElement, y: HTMLElement, divx: HTMLElement, divy: HTMLElement){
      if (divx && divy) {
          divy.removeChild(y)
          divx.appendChild(y)
          divx.removeChild(x)
          divy.appendChild(x)
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