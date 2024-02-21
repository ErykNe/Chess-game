import React from "react";
import ChessBoard from "./ChessBoard";
import { MoveLegalityTest } from './Pieces.tsx';
import { board } from "./ChessBoard.tsx";

function convertTo2DArray<T>(boardArray: T[]): T[][] {
    const size = 8; // Assuming it's always an 8x8 board
    const result: T[][] = [];
    for (let i = 0; i < boardArray.length; i += size) {
        result.push(boardArray.slice(i, i + size));
    }
    return result;
}

class Rules {
    pieceElement: HTMLElement;
    board2D: JSX.Element[][];
    
    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = convertTo2DArray(board);
    }

    public EnPassant() {

        const currentPosition = this.pieceElement.parentElement?.id;

        const isValidRow = currentPosition?.includes('5') || currentPosition?.includes('4');

        if (isValidRow) {
            const [currentColumn, currentRow] = currentPosition!.split('');
            const oppositeColor = this.pieceElement.id.includes('White') ? 'Black' : 'White';
        
            const adjacentColumns = ['a', 'h'].includes(currentColumn) ? 
                [(parseInt(currentColumn, 18) + 1).toString(), (parseInt(currentColumn, 18) - 1).toString()] :
                [String.fromCharCode(currentColumn.charCodeAt(0) - 1), String.fromCharCode(currentColumn.charCodeAt(0) + 1)];

                for (const col of adjacentColumns) {
                    const adjacentSquareId = `${col}${currentRow}`;
                    const adjacentSquare = document.getElementById(adjacentSquareId);
                    if (adjacentSquare && adjacentSquare.firstChild instanceof HTMLElement && adjacentSquare.firstChild.id.includes(oppositeColor) && adjacentSquare.firstChild.id.includes('Pawn')) {
                        return true;
                    }
                }
        }

        return false;
    }

    public PawnPromoting() {
        const currentPosition = this.pieceElement.parentElement?.id;

        const lastRow = this.pieceElement.id.includes('White') ? '8' : '1';
        return currentPosition?.includes(lastRow);
    }

    public Check() {
        const currentPosition = this.pieceElement.parentElement?.id;

        const opponentColor = this.pieceElement.id.includes('White') ? 'Black' : 'White';

        for (const row of this.board2D) {
            for (const square of row) {
                if (square.props.children && square.props.children.props.id.includes(opponentColor)) {
                    const opponentPiece = square.props.children;
                    const legalityTest = new MoveLegalityTest();
                    legalityTest.getPiece(opponentPiece);
                    legalityTest.checkMove(this.pieceElement.parentElement!);
                    if (legalityTest.passedTheMove) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    public Checkmate() {
        if (!this.Check()) {
            return false; 
        }
        const friendlyColor = this.pieceElement.id.includes('White') ? 'White' : 'Black';
        for (const row of this.board2D) {
            for (const square of row) {
                if (square.props.children && square.props.children.props.id.includes(friendlyColor)) {
                    const friendlyPiece = square.props.children;
                    const legalMoves = new MoveLegalityTest();
                    legalMoves.getPiece(friendlyPiece);
                    for (const move of legalMoves.piece!.legalMoves) {
                        const legalityTest = new MoveLegalityTest();
                        legalityTest.getPiece(move);
                        legalityTest.checkMove(this.pieceElement.parentElement!);
                        if (legalityTest.passedTheMove) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}