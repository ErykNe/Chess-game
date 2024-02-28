import React from "react";
import ChessBoard from "./ChessBoard";
import { MoveLegalityTest } from './Pieces.tsx';
import { board, move } from "./ChessBoard.tsx";

function convertTo2DArray<T>(boardArray: T[]): T[][] {
    const size = 8; // Assuming it's always an 8x8 board
    const result: T[][] = [];
    for (let i = 0; i < boardArray.length; i += size) {
        result.push(boardArray.slice(i, i + size));
    }
    return result;
}

export class Move {
    Turn: string = "White";
    previous: [HTMLElement, string | undefined];
    wasDoubleSquare: boolean;
}

export default class Rules {
    pieceElement: HTMLElement;
    board2D: JSX.Element[][];
    
    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = convertTo2DArray(board);
    }
    public EnPassant() {
        if(move.previous[1]?.includes("5") && move.previous[0].id.includes("Black") && move.wasDoubleSquare && move.Turn == "White"){
            return true;
        }
        return false;
    }
    public Check() {
        /*const currentPosition = this.pieceElement.parentElement?.id;

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
        }*/
        return false;
    }
}