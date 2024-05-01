import React from "react";
import { Pawn, Piece } from "./Pieces.tsx";
import { LoadGrids, LoadPieces, board, gridsBoard, piecesBoard, horizontalAxis } from "./ChessBoard.tsx";
import Essentials from "./Essentials.tsx";

export default {
    getBoardPrediction: function getBoardPrediction(movement: any) {
        let boardPrediction: any[] = board.map(item => ({ ...item })); 
        let index1 = board.findIndex(elem => elem.key === movement[2].id);//oldDiv
        let index2 = board.findIndex(elem => elem.key === movement[3].id);//newDiv
        
        if (index1 !== -1 && index2 !== -1) {
            const newElementId = boardPrediction[index2].props?.children?.props?.id;
            const temp = boardPrediction[index1].props?.children;
            
            if (newElementId !== 'none') {
                const emptyFieldIndex = board.find(elem => elem.props.children?.props?.id === 'none');
                if (emptyFieldIndex) {
                    boardPrediction[index1] = React.cloneElement(boardPrediction[index1], { children: emptyFieldIndex.props?.children });
                    boardPrediction[index2] = React.cloneElement(boardPrediction[index2], { children: temp });
                }
            } else {
                boardPrediction[index1] = React.cloneElement(boardPrediction[index1], { children: boardPrediction[index2].props?.children });
                boardPrediction[index2] = React.cloneElement(boardPrediction[index2], { children: temp });
            }
        }
        console.log(boardPrediction)
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
        console.log(piecesPrediction)
        return piecesPrediction;
    },
    
    getGridsPrediction: function getGridsPrediction(boardS: any[]) {
        let gridsPrediction: any[] = boardS.map(item => ({ ...item })); 
        return gridsPrediction;
    }
    
}