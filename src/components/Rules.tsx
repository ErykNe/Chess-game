import React from "react";
import ChessBoard from "./ChessBoard";
import { board, piecesArray } from "./ChessBoard.tsx";
import { ChessPiece, PieceMove } from "./Pieces.tsx";

function convertTo2DArray<T>(boardArray: T[]): T[][] {
    const size = 8; // Assuming it's always an 8x8 board
    const result: T[][] = [];
    for (let i = 0; i < boardArray.length; i += size) {
        result.push(boardArray.slice(i, i + size));
    }
    return result;
}


export default class Rules {
   public Turn: string
   public previousMovement: PieceMove
   public movement: PieceMove

   public otherPieces: ChessPiece[][] = piecesArray
   
   public isKingUnderAttack: boolean
   public isCheckmate: boolean
   public isPawnPromoting: boolean

   constructor(){

   } 
}