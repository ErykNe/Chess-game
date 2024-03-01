import React from "react";
import ChessBoard, { previousMovement } from "./ChessBoard.tsx";
import { board } from "./ChessBoard.tsx";
import Rules from "./Rules.tsx";
import Utils from "./Utils.tsx";


export class ChessPiece {
    public piece: any;
    public pieceType: string;
    public gridElement: HTMLElement;
    public legalMoves: React.JSX.Element[];
    public Movement: PieceMove

    constructor(piece: HTMLElement, parent: HTMLElement){
        this.piece = piece;
        this.gridElement = parent;
        this.getType()
        this.legalMoves = this.piece.getLegalMoves()
    }

    private getType(){
        if (this.piece.id.includes("Pawn")) {
            this.piece = new Pawn(this.piece);
            this.pieceType = "Pawn";
        } else if (this.piece.id.includes("Knight")) {
            this.piece = new Knight(this.piece);
            this.pieceType = "Knight";
        } else if (this.piece.id.includes("Bishop")) {
            this.piece = new Bishop(this.piece);
            this.pieceType = "Bishop";
        } else if (this.piece.id.includes("Rook")) {
            this.piece = new Rook(this.piece);
            this.pieceType = "Rook";
        } else if (this.piece.id.includes("Queen")) {
            this.piece = new Queen(this.piece);
            this.pieceType = "Queen";
        } else {
            this.piece = new King(this.piece);
            this.pieceType = "King";
        }
    }
    
}
export class PieceMove {
    public move: [ChessPiece, HTMLElement];
    public piecePreviousPosition: HTMLElement;
    public isMovePawnDoubleSquare: boolean = false;
    public isEnPassant: boolean = false;
    constructor(piece: ChessPiece, grid: HTMLElement, pieceParentElement: HTMLElement){
        this.move = [piece, grid]
        this.piecePreviousPosition = pieceParentElement
        this.move[0].legalMoves = this.filterIllegalMoves(this.move[0].legalMoves)
        this.isMovePawnDoubleSquare = this.handleDoubleSquareMovement()
    }
    private filterIllegalMoves(Moves: React.JSX.Element[]){
        let referee = new Rules(this)
        if(referee.EnPassant){
            let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.piecePreviousPosition.id) !== -1);
            let indexInRow = board[indexInCol].findIndex(square => square.key === this.piecePreviousPosition.id);
            let color: string = this.move[0].piece.pieceElement.id.includes("White") ? "Black" : "White";
            let lit =  this.move[0].piece.pieceElement.id.includes("White") ? -1 : 1;
            const leftDiagonalSquare = board[indexInCol + lit][indexInRow - lit];
            console.log(board[indexInCol][indexInRow - lit].key)
            console.log(previousMovement.move[0].gridElement.id)
            
            if (board[indexInCol][indexInRow - lit].key?.at(4) === previousMovement.move[0].gridElement.id[4]) {
                this.move[0].legalMoves.push(leftDiagonalSquare);
                this.move[0].piece.EnPassantMove = (leftDiagonalSquare)
            }
            const rightDiagonalSquare = board[indexInCol + lit][indexInRow + lit];
            if (board[indexInCol][indexInRow + lit].key?.at(4) === previousMovement.move[0].gridElement.id[4]) {
                this.move[0].legalMoves.push(rightDiagonalSquare);
                this.move[0].piece.EnPassantMove = (rightDiagonalSquare)
            }
            this.isEnPassant = true;
        }
        console.log(Moves)
        return Moves;
    }
    public MoveIsIllegal(){
        const referee = this.move[0].legalMoves
            .flat()
            .some((parentElement: React.JSX.Element) => {
                const parentId = parentElement.props.id;
                return parentId === this.move[1].id;
            });
        return referee;
    }
    private handleDoubleSquareMovement() {
        if(this.piecePreviousPosition.id.includes("2") && this.move[1].id.includes("4") && 
        this.move[0].pieceType == "Pawn" && this.move[0].piece.pieceElement.id.includes("White")){
            return true;
        }
        if(this.piecePreviousPosition.id.includes("7") && this.move[1].id.includes("5") && 
        this.move[0].pieceType == "Pawn" && this.move[0].piece.pieceElement.id.includes("Black")){
            return true;
        }
        return false;
    }
}

export class Pawn {
    public pieceElement: HTMLElement;
    public EnPassantMove: React.JSX.Element;

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
    }


    public getLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.pieceElement.parentElement?.id) !== -1);
        let indexInRow = board[indexInCol].findIndex(square => square.key === this.pieceElement.parentElement?.id);
        let color: string = this.pieceElement.id.includes("White") ? "Black" : "White";
        let lit =  this.pieceElement.id.includes("White") ? -1 : 1;
        try{
                const frontSquare = board[indexInCol + lit][indexInRow];
                if (frontSquare.props.children?.props.id === 'none' || frontSquare.props.children?.props.id === undefined) {
                    moves.push(frontSquare);
                    const doubleFrontSquare = board[indexInCol + lit*2][indexInRow];
                    if ((doubleFrontSquare && board[indexInCol][indexInRow].key?.includes("2") || board[indexInCol][indexInRow].key?.includes("7")) && !doubleFrontSquare.props.children?.props.id.includes(color) || frontSquare.props.children?.props.id === undefined) {
                        moves.push(doubleFrontSquare);
                    }
                }
                const leftDiagonalSquare = board[indexInCol + lit][indexInRow + lit];
                if (leftDiagonalSquare.props.children?.props.id.includes(color)) {
                    moves.push(leftDiagonalSquare);
                }
                const rightDiagonalSquare = board[indexInCol + lit][indexInRow - lit];
                if (rightDiagonalSquare.props.children?.props.id.includes(color)) {
                    moves.push(rightDiagonalSquare);
                }
           
        } catch {

        }
        return moves;
    }
}

export class Bishop {
    public pieceElement: HTMLElement;

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
    }

    public getLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.pieceElement.parentElement?.id) !== -1);
        let indexInRow = board[indexInCol].findIndex(square => square.key === this.pieceElement.parentElement?.id);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < board.length; i++) {
                    const nextSquare = board[indexInCol + i * deltaCol][indexInRow + i * deltaRow];
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

export class Rook {
    public pieceElement: HTMLElement;

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
    }

    public getLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.pieceElement.parentElement?.id) !== -1);
        let indexInRow = board[indexInCol].findIndex(square => square.key === this.pieceElement.parentElement?.id);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < board.length; i++) {
                    const nextSquare = board[indexInCol + i * deltaCol][indexInRow + i * deltaRow];
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

export class Queen {
    public pieceElement: HTMLElement;

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
    }


    public getLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.pieceElement.parentElement?.id) !== -1);
        let indexInRow = board[indexInCol].findIndex(square => square.key === this.pieceElement.parentElement?.id);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                for (let i = 1; i < board.length; i++) {
                    const nextSquare = board[indexInCol + i * deltaCol][indexInRow + i * deltaRow];
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

export class King {
    public pieceElement: HTMLElement;

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
    }


    public getLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.pieceElement.parentElement?.id) !== -1);
        let indexInRow = board[indexInCol].findIndex(square => square.key === this.pieceElement.parentElement?.id);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';

        const checkAndPushMoves = (deltaCol: number, deltaRow: number) => {
            try {
                    const nextSquare = board[indexInCol + deltaCol][indexInRow + deltaRow];
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

export class Knight {
    public pieceElement: HTMLElement;

    constructor(piece: HTMLElement) {
        this.pieceElement = piece;
    }


    public getLegalMoves(): React.JSX.Element[] {
        const moves: React.JSX.Element[] = [];
        let indexInCol = board.findIndex(row => row.findIndex(square => square.key === this.pieceElement.parentElement?.id) !== -1);
        let indexInRow = board[indexInCol].findIndex(square => square.key === this.pieceElement.parentElement?.id);
        const color = this.pieceElement.id.includes('White') ? 'White' : 'Black';
        const checkAndPushMove = (deltaCol: number, deltaRow: number) => {
            try {
                const nextSquare = board[indexInCol + deltaCol][indexInRow + deltaRow];
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