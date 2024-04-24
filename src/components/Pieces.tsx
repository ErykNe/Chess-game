import React from "react";
import ChessBoard, { piecesBoard } from "./ChessBoard.tsx";
import Utils from "./Utils.tsx";

interface ChessPiece {
    legalMoves: React.JSX.Element[];
    pieceElement: HTMLElement;
    board2D: JSX.Element[][];
}

export class Bishop implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: any;
    public gridsBoard: any[]
    public board2D: any[][]
    public board: any []

    constructor(piece: HTMLElement, board: any[], gridsBoard:any[]) {
        this.pieceElement = piece;
        this.board = board
        this.gridsBoard = gridsBoard;
        this.board2D = Utils.convertTo2DArray(gridsBoard)
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let tem = this.gridsBoard[this.board.findIndex(elem => elem.props?.children == this.pieceElement)];
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.key.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < this.gridsBoard.length; i++) {
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
    public pieceElement: any;
    public gridsBoard: any[]
    public board2D: any[][]
    public board: any []

    constructor(piece: HTMLElement, board: any[], gridsBoard:any[]) {
        this.pieceElement = piece;
        this.board = board
        this.gridsBoard = gridsBoard;
        this.board2D = Utils.convertTo2DArray(gridsBoard)
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let tem = this.gridsBoard[this.board.findIndex(elem => elem.props?.children == this.pieceElement)];
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.key.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < this.gridsBoard.length; i++) {
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
        return moves;
    }
}

export class Queen implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: any;
    public gridsBoard: any[]
    public board2D: any[][]
    public board: any []

    constructor(piece: HTMLElement, board: any[], gridsBoard:any[]) {
        this.pieceElement = piece;
        this.board = board
        this.gridsBoard = gridsBoard;
        this.board2D = Utils.convertTo2DArray(gridsBoard)
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let tem = this.gridsBoard[this.board.findIndex(elem => elem.props?.children == this.pieceElement)];
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.key.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < this.gridsBoard.length; i++) {
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
    public pieceElement: any;
    public gridsBoard: any[]
    public board2D: any[][]
    public board: any []

    constructor(piece: HTMLElement, board: any[], gridsBoard:any[]) {
        this.pieceElement = piece;
        this.board = board
        this.gridsBoard = gridsBoard;
        this.board2D = Utils.convertTo2DArray(gridsBoard)
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let tem = this.gridsBoard[this.board.findIndex(elem => elem.props?.children == this.pieceElement)];
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.key.includes('White') ? 'White' : 'Black';

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

export class Pawn implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: any;
    public gridsBoard: any[]
    public board2D: any[][]
    public board: any []

    constructor(piece: HTMLElement, board: any[], gridsBoard:any[]) {
        this.pieceElement = piece;
        this.board = board
        this.gridsBoard = gridsBoard;
        this.board2D = Utils.convertTo2DArray(gridsBoard)
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let tem = this.gridsBoard[this.board.findIndex(elem => elem.props?.children == this.pieceElement)];
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        let color: string;
        let lit = -1;
        if (this.pieceElement.key.includes("White")){
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
        return moves;
    }
}

export class Knight implements ChessPiece {
    public legalMoves: React.JSX.Element[];
    public pieceElement: any;
    public gridsBoard: any[]
    public board2D: any[][]
    public board: any []

    constructor(piece: HTMLElement, board: any[], gridsBoard:any[]) {
        this.pieceElement = piece;
        this.board = board
        this.gridsBoard = gridsBoard;
        this.board2D = Utils.convertTo2DArray(gridsBoard)
        this.board2D = this.board2D;
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let tem = this.gridsBoard[this.board.findIndex(elem => elem.props?.children == this.pieceElement)];
        let indexInCol = this.board2D.findIndex(row => row.findIndex(square => square === tem) !== -1);
        let indexInRow = this.board2D[indexInCol].findIndex(square => square === tem);
        const color = this.pieceElement.key.includes('White') ? 'White' : 'Black';
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

export class Piece {
    public passedTheMove: boolean;
    public piece: any;
    public board:any[];
    public gridsBoard:any[]

    constructor(board:any[], gridsBoard:any[]) {
        this.passedTheMove = false;
        this.piece = null;
        this.board = board.map(item => ({ ...item }))
        this.gridsBoard = gridsBoard.map(item => ({ ...item }))
    }

    public getPieceType(piece: any) {
        if (piece.key.includes("Pawn")) {
            this.piece = new Pawn(piece, this.board, this.gridsBoard);
        } else if (piece.key.includes("Knight")) {
            this.piece = new Knight(piece, this.board, this.gridsBoard);
        } else if (piece.key.includes("Bishop")) {
            this.piece = new Bishop(piece, this.board, this.gridsBoard);
        } else if (piece.key.includes("Rock")) {
            this.piece = new Rock(piece, this.board, this.gridsBoard);
        } else if (piece.key.includes("Queen")) {
            this.piece = new Queen(piece, this.board, this.gridsBoard);
        } else if (piece.key.includes("King")) {
            this.piece = new King(piece, this.board, this.gridsBoard);
        }
    }

    public checkMove(field: HTMLElement) {
        if (this.piece) {
            const finder = this.piece.legalMoves
                .flat()
                .some((parentElement: any) => {
                    const parentId = parentElement.key;
                    return parentId === field.id;
                });
            this.passedTheMove = finder;
        }
    }
}