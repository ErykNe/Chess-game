import { changePiecePosition, chessboardGridModel, endGameGridModel, gameWinner } from "./ChessBoard.tsx"
import Utils from "./Utils.tsx"
import React from "react"
import './ChessBoard.css';
import { KingsCheckmated, KingsUnderCheck } from "./Rules.tsx";
import { KingUnderCheckKey } from "./Essentials.tsx";

let PieceActive: HTMLElement | null = null
export default{
    grabPiece: function grabPiece(e: React.MouseEvent) {
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
    },
    movePiece: function movePiece(e: React.MouseEvent) {
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
    },
    dropPiece: function dropPiece(e: React.MouseEvent) {
        if (PieceActive = e.target as HTMLElement) {
          const pushedGridsElements = document.elementsFromPoint(e.clientX, e.clientY);
          const piece = e.target as HTMLElement
          if (pushedGridsElements.some(element => element.className == "pushedGrids") && piece.className == "chessPiece") {
            changePiecePosition(e)
            PieceActive = null;
            
          }  else if (piece.className == "chessPiece") {
            Utils.movePieceBack(piece)
          }
        }
      }
}
