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
        const moves: React.JSX.Element[] = [];
        let tem = board.find(elem => elem.key === this.pieceElement.parentElement?.id);
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < board.length; i++) {
                    const nextSquare = this.board2D[indexInCol + i * deltaCol][indexInRow + i * deltaRow];
                    const nextSquareId = nextSquare.props.children?.props.id;
                    if (nextSquareId === 'none' || nextSquareId === undefined) {
                        moves.push(nextSquare);
                    } else if (nextSquareId.includes(color)) {
                        break;
                    } else if (!nextSquareId.includes(color)) {
                        moves.push(nextSquare);
                        break;
                    }
                }
            } catch { }
        };
        for (let deltaCol of [1, -1]) {
            for (let deltaRow of [1, -1]) {
                checkAndPushMoves(deltaCol, deltaRow);
            }
        }
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
        const moves: React.JSX.Element[] = [];
        let tem = board.find(elem => elem.key === this.pieceElement.parentElement?.id);
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < board.length; i++) {
                    const nextSquare = this.board2D[indexInCol + i * deltaCol][indexInRow + i * deltaRow];
                    const nextSquareId = nextSquare.props.children?.props.id;
                    if (nextSquareId === 'none' || nextSquareId === undefined) {
                        moves.push(nextSquare);
                    } else if (nextSquareId.includes(color)) {
                        break;
                    } else if (!nextSquareId.includes(color)) {
                        moves.push(nextSquare);
                        break;
                    }
                }
            } catch { }
        };
        checkAndPushMoves(1, 0);
        checkAndPushMoves(0, 1);
        checkAndPushMoves(-1, 0);
        checkAndPushMoves(0, -1);
        console.log(moves)
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
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        const tem = board.find(elem => elem.key === this.pieceElement.parentElement?.id);
        const indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        const indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < board.length; i++) {
                    const nextSquare = this.board2D[indexInCol + i * deltaCol][indexInRow + i * deltaRow];
                    const nextSquareId = nextSquare.props.children?.props.id;
                    if (nextSquareId === 'none' || nextSquareId === undefined) {
                        moves.push(nextSquare);
                    } else if (nextSquareId.includes(color)) {
                        break;
                    } else if (!nextSquareId.includes(color)) {
                        moves.push(nextSquare);
                        break;
                    }
                }
            } catch { }
        };

        // Check diagonally in all four directions
        for (let deltaCol of [1, -1]) {
            for (let deltaRow of [1, -1]) {
                checkAndPushMoves(deltaCol, deltaRow);
            }
        }

        // Check horizontally and vertically
        for (let deltaCol of [1, 0, -1]) {
            for (let deltaRow of [1, 0, -1]) {
                if (deltaCol !== 0 || deltaRow !== 0) {
                    checkAndPushMoves(deltaCol, deltaRow);
                }
            }
        }

        return moves;
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
        const tem = board.find(elem => elem.key === this.pieceElement.parentElement?.id);
        const indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        const indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                    const nextSquare = this.board2D[indexInCol + deltaCol][indexInRow + deltaRow];
                    const nextSquareId = nextSquare.props.children?.props.id;
                    if (nextSquareId === 'none' || nextSquareId === undefined) {
                        moves.push(nextSquare);
                    } else if (nextSquareId.includes(color)) {
                   
                    } else if (!nextSquareId.includes(color)) {
                        moves.push(nextSquare);
                
                    }
                
            } catch { }
        };

        // Check diagonally in all four directions
        for (let deltaCol of [1, -1]) {
            for (let deltaRow of [1, -1]) {
                checkAndPushMoves(deltaCol, deltaRow);
            }
        }

        // Check horizontally and vertically
        for (let deltaCol of [1, 0, -1]) {
            for (let deltaRow of [1, 0, -1]) {
                if (deltaCol !== 0 || deltaRow !== 0) {
                    checkAndPushMoves(deltaCol, deltaRow);
                }
            }
        }

        return moves;
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
        let tem = board.find(elem => elem.key === this.pieceElement.parentElement?.id);
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        let color: string;
        let lit = -1;
        if (this.pieceElement.id.includes("White")){
            color = "Black";

        } else {
            color = "White";
            lit = 1;
        }
        try{
                const frontSquare = this.board2D[indexInCol + lit][indexInRow];
                if (frontSquare.props.children?.props.id === 'none' || frontSquare.props.children?.props.id === undefined) {
                    moves.push(frontSquare);
                    const doubleFrontSquare = this.board2D[indexInCol + lit*2][indexInRow];
                    if ((doubleFrontSquare && this.board2D[indexInCol][indexInRow].key?.includes("2") || this.board2D[indexInCol][indexInRow].key?.includes("7")) && !doubleFrontSquare.props.children?.props.id.includes(color)) {
                        moves.push(doubleFrontSquare);
                    }
                }
                const leftDiagonalSquare = this.board2D[indexInCol + lit][indexInRow + lit];
                if (leftDiagonalSquare.props.children?.props.id.includes(color)) {
                    moves.push(leftDiagonalSquare);
                }
                const rightDiagonalSquare = this.board2D[indexInCol + lit][indexInRow - lit];
                if (rightDiagonalSquare.props.children?.props.id.includes(color)) {
                    moves.push(rightDiagonalSquare);
                }
           
        } catch {

        }
        console.log(moves)
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
            this.piece.board2D = convertTo2DArray(board)
        } else if (piece.id.includes("Knight")) {
            this.piece = new Knight(piece);
            this.piece.board2D = convertTo2DArray(board)
        } else if (piece.id.includes("Bishop")) {
            this.piece = new Bishop(piece);
            this.piece.board2D = convertTo2DArray(board)
        } else if (piece.id.includes("Rock")) {
            this.piece = new Rock(piece);
            this.piece.board2D = convertTo2DArray(board)
        } else if (piece.id.includes("Queen")) {
            this.piece = new Queen(piece);
            this.piece.board2D = convertTo2DArray(board)
        } else {
            this.piece = new King(piece);
            this.piece.board2D = convertTo2DArray(board)
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