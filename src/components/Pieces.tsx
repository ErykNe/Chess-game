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
        const moves: React.JSX.Element[] = [];
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
        const moves: React.JSX.Element[] = [];
        let indexOnBoard = board.findIndex(elem => elem.key === this.pieceElement.parentElement?.id);
        try{
            if (this.pieceElement.id.includes("White")) {
                const frontSquare = board[indexOnBoard - 8];
                if (frontSquare.props.children?.props.id === 'none' || frontSquare.props.children?.props.id === undefined) {
                    moves.push(frontSquare);
                    const doubleFrontSquare = board[indexOnBoard - 16];
                    if (doubleFrontSquare && board[indexOnBoard].key?.includes("2")) {
                        moves.push(doubleFrontSquare);
                    }
                }
                const leftDiagonalSquare = board[indexOnBoard - 7];
                if (leftDiagonalSquare.props.children?.props.id.includes("Black")) {
                    moves.push(leftDiagonalSquare);
                }
                const rightDiagonalSquare = board[indexOnBoard - 9];
                if (rightDiagonalSquare.props.children?.props.id.includes("Black")) {
                    moves.push(rightDiagonalSquare);
                }
            } else if (this.pieceElement.id.includes("Black")){
                const frontSquare = board[indexOnBoard + 8];
                if (frontSquare.props.children?.props.id === 'none' || frontSquare.props.children?.props.id === undefined) {
                    moves.push(frontSquare);
                    const doubleFrontSquare = board[indexOnBoard + 16];
                    if (doubleFrontSquare && board[indexOnBoard].key?.includes("7")) {
                        moves.push(doubleFrontSquare);
                    }
                }
                const leftDiagonalSquare = board[indexOnBoard + 7];
                if (leftDiagonalSquare.props.children?.props.id.includes("White")) {
                    moves.push(leftDiagonalSquare);
                }
                const rightDiagonalSquare = board[indexOnBoard + 9];
                if (rightDiagonalSquare.props.children?.props.id.includes("White")) {
                    moves.push(rightDiagonalSquare);
                }
            }
        } catch {
            if (indexOnBoard !== -1 && this.pieceElement.id.includes("White")) {
                const frontSquare = board[indexOnBoard - 8];
                if (frontSquare.props.children?.props.id === undefined) {
                    moves.push(frontSquare);
                }
            } else if (indexOnBoard !== -1 && this.pieceElement.id.includes("Black")){
                const frontSquare = board[indexOnBoard + 8];
                if (frontSquare.props.children?.props.id === undefined) {
                    moves.push(frontSquare);
                }
            }
        }
        return moves;
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
        const moves: React.JSX.Element[] = [];
        let tem = board.find(elem => elem.key === this.pieceElement.parentElement?.id);
        console.log(tem);
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        let color: string;
        if (this.pieceElement.id.includes('White')){
            color = "White";
        } else {
            color = "Black";
        }
        const checkAndPushMove = (deltaCol: number, deltaRow: number) => {
            try {
                const nextSquare = this.board2D[indexInCol + deltaCol][indexInRow + deltaRow];
                const nextSquareId = nextSquare.props.children?.props.id;
                if (nextSquareId === 'none' || nextSquareId === undefined || !nextSquareId.includes(color)) {
                    moves.push(nextSquare);
                }
            } catch (error) {
                // Ignore out-of-bounds errors
            }
        };
    
        for (let deltaCol of [-2, -1, 1, 2]) {
            for (let deltaRow of [-2, -1, 1, 2]) {
                if (Math.abs(deltaCol) !== Math.abs(deltaRow)) { 
                    checkAndPushMove(deltaCol, deltaRow);
                }
            }
        }
    
        return moves;
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