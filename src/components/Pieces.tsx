import React from "react";
import ChessBoard from "./ChessBoard";
import { board } from "./ChessBoard.tsx";


function convertTo2DArray<T>(boardArray: T[]): T[][] {
    const size = 8; // Assuming it's always an 8x8 board
    const result: T[][] = [];
    for (let i = 0; i < boardArray.length; i += size) {
        result.push(boardArray.slice(i, i + size));
    }
    return result;
}

interface ChessPiece {
    legalMoves: React.JSX.Element[];
    pieceElement: HTMLElement;
    board2D: JSX.Element[][];
    
}

export class Bishop implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;
    public board2D = convertTo2DArray(board);

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
        let row, col;

        return moves;
    }
}

export class Rock implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;
    public board2D = convertTo2DArray(board);

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];

        return moves;
    }
}

// Implement classes for Queen, King similarly

export class Queen implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;
    public board2D = convertTo2DArray(board);

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {

        return [];
    }
}

export class King implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;
    public board2D = convertTo2DArray(board);

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        // Implement legal moves for the king
        return [];
    }
}

// Implement Pawn and Knight classes similarly

export class Pawn implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;
    public board2D: JSX.Element[][];

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = convertTo2DArray(board);
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const legalMoves: React.JSX.Element[] = [];

        return legalMoves;
    }
}

export class Knight implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;
    public board2D = convertTo2DArray(board);

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        // Implement legal moves for the knight
        return [];
    }
}
// Implement classes for other chess pieces similarly

export class MoveLegalityTest {
    public passedTheMove: boolean;
    public piece: ChessPiece | null;

    constructor() {
        this.passedTheMove = false;
        this.piece = null;
    }

    public getPiece(piece: any) {
        if (piece.id.includes("Pawn")) {
            this.piece = new Pawn(piece);
        } else if (piece.id.includes("Knight")) {
            this.piece = new Knight(piece);
        } else if (piece.id.includes("Bishop")) {
            this.piece = new Bishop(piece);
        } else if (piece.id.includes("Rock")) {
            this.piece = new Rock(piece);
        } else if (piece.id.includes("Queen")) {
            this.piece = new Queen(piece);
        } else {
            this.piece = new King(piece);
        }
    }

    public checkMove(field: HTMLElement) {
        if (this.piece) {
            const finder = this.piece.legalMoves
                .flat()
                .some((parentElement: React.JSX.Element) => {
                    const parentId = parentElement.props.id;
                    return parentId === field.id;
                });
            this.passedTheMove = finder;
        }
    }
}
  //this a prototype for now