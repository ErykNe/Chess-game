import React from "react";
import { Pawn, Piece } from "./Pieces.tsx";
import { LoadGrids, LoadPieces, board, gridsBoard, piecesBoard, previousMovement, turn, horizontalAxis } from "./ChessBoard.tsx";
import Essentials from "./Essentials.tsx";

export default {
    getBoardPrediction: function getBoardPrediction(movement: any) {
        let boardPrediction: any[] = board.map(item => ({ ...item })); // Deep copy of board
        let index1 = board.findIndex(elem => elem.key === movement[3].id);
        let index2 = board.findIndex(elem => elem.key === movement[2].id);
        if (index1 !== -1 && index2 !== -1) {
            const temp = boardPrediction[index1].props?.children;
            boardPrediction[index1] = React.cloneElement(boardPrediction[index1], { children: boardPrediction[index2].props?.children });
            boardPrediction[index2] = React.cloneElement(boardPrediction[index2], { children: temp });
        }
        return boardPrediction;
    },
    
    getPiecesPrediction: function getPiecesPrediction(boardS: any[], gridsBoard:any[]) {
        let piecesPrediction: any[] = boardS.map(item => {
            let piece = item.props?.children as unknown as HTMLElement;
            if (piece !== undefined) {
                let pieceElem = new Piece(boardS,gridsBoard);
                pieceElem.getPieceType(piece);
                return pieceElem;
            }
            return null;
        });
        return piecesPrediction;
    },
    
    getGridsPrediction: function getGridsPrediction(boardS: any[]) {
        let gridsPrediction: any[] = boardS.map(item => ({ ...item })); 
        return gridsPrediction;
    }
    
}