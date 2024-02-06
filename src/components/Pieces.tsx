import React, { Component }  from "react"
import ChessBoard from "./ChessBoard"
import { board }  from "./ChessBoard.tsx";


export class Pawn {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;

    constructor(piece: any) {
        this.pieceElement = piece
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
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
                console.log(frontSquare.props.children?.props.id)
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
                console.log(frontSquare.props.children?.props.id)
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
export class Knight {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor(piece: any) {
        this.pieceElement = piece
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
        let indexOnBoard = board.findIndex(elem => elem.key === this.pieceElement.parentElement?.id);
    
        try {
            if (this.pieceElement.parentElement && (this.pieceElement.id.includes("White") || this.pieceElement.id.includes("Black"))) {
                const Squares = [
                    board[indexOnBoard - 6], board[indexOnBoard - 15], board[indexOnBoard - 17], board[indexOnBoard - 10],
                    board[indexOnBoard + 6], board[indexOnBoard + 15], board[indexOnBoard + 17], board[indexOnBoard + 10]
                ] as unknown as JSX.Element[];
                for (let i = 0; i < 8; i++) {
                    try {
                        let Square = Squares[i];
                        if (Square.props.children?.props.id === 'none' || Squares[i].props.children?.props.id === undefined || 
                            (this.pieceElement.id.includes("White") && Squares[i].props.children?.props.id.includes("Black")) ||
                            (this.pieceElement.id.includes("Black") && Squares[i].props.children?.props.id.includes("White"))) {
                            moves.push(Square);
                        } 
                    } catch {
                        continue
                    }
                }
            }
        } catch {

        }
    
        return moves;
    }
}
export class Bishop {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;

    constructor(piece: any) {
        this.pieceElement = piece
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
        let indexOnBoard = board.findIndex(elem => elem.key === this.pieceElement.parentElement?.id);
    
        try {
            if (this.pieceElement.parentElement && this.pieceElement.id.includes("Black")) {
                for(let i = 0; i <= 3; i++){
                    for(let j = 1; j <= 9; j++){
                        try{
                            const Squares = [
                                board[indexOnBoard - 7 * j], board[indexOnBoard - 9 * j], board[indexOnBoard + 7 * j], board[indexOnBoard + 9 * j],
                            ] as unknown as JSX.Element[];
                            if (Squares[i].props.children?.props.id === 'none' || Squares[i].props.children?.props.id === undefined) {
                                moves.push(Squares[i]);
                            } else if(Squares[i].props.children?.props.id.includes("White")){
                                moves.push(Squares[i]);
                                break;
                            } else if (Squares[i].key?.includes('h') || Squares[i].key?.includes('a')){
                                break;
                            } else {
                                break;
                            }
                        } catch {
                            continue;
                        }
                    }
                }
            }    
            if (this.pieceElement.parentElement && this.pieceElement.id.includes("White")) {
                for(let i = 0; i <= 3; i++){
                    for(let j = 1; j <= 9; j++){
                        try{
                            const Squares = [
                                board[indexOnBoard - 7 * j], board[indexOnBoard - 9 * j], board[indexOnBoard + 7 * j], board[indexOnBoard + 9 * j],
                            ] as unknown as JSX.Element[];
                            if (Squares[i].props.children?.props.id === 'none' || Squares[i].props.children?.props.id === undefined) {
                                moves.push(Squares[i]);
                            } else if(Squares[i].props.children?.props.id.includes("Black")){
                                moves.push(Squares[i]);
                                break;
                            } else if (Squares[i].key?.includes('h') || Squares[i].key?.includes('a')){
                                break;
                            } else {
                                break;
                            }
                        } catch {
                            continue;
                        }
                    }
                }
            }    
        } catch {

        }
    
        return moves;
    }
}
export class Rock {
    public legalMoves: React.JSX.Element[];
    public pieceElement: HTMLElement;

    constructor(piece: any) {
        this.pieceElement = piece
        this.legalMoves = this.findLegalMoves();
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = [];
        let indexOnBoard = board.findIndex(elem => elem.key === this.pieceElement.parentElement?.id);
    
        try {
            if (this.pieceElement.parentElement && (this.pieceElement.id.includes("White") || this.pieceElement.id.includes("Black"))) {
                for(let i = 0; i <= 3; i++){
                    for(let j = 1; j <= 9; j++){
                        try{
                            const Squares = [
                                board[indexOnBoard - (8 * j)], board[indexOnBoard - (1 * j)], board[indexOnBoard + (8 * j)], board[indexOnBoard + (1 * j)],
                            ] as unknown as JSX.Element[];
                            if (Squares[i].props.children?.props.id === 'none' || Squares[i].props.children?.props.id === undefined) {
                                moves.push(Squares[i]);
                            } else {
                                moves.push(Squares[i]);
                                break;
                            }
                        } catch {
                            continue;
                        }
                    }
                }
            }    
        } catch {

        }
    
        return moves;
    }
}
export class Queen {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class King {
    public legalMoves: React.JSX.Element[]
    public pieceElement: HTMLElement

    constructor() {
        this.legalMoves = this.findLegalMoves()
    }

    public findLegalMoves(): React.JSX.Element[] {
        let moves: React.JSX.Element[] = []

        // Now you can use mdf without any issue

        return moves;
    }
}
export class MoveLegalityTest {
    public passedTheMove: boolean;
    public piece: any; // Change 'Piece' to 'piece'

    constructor() {
        this.passedTheMove = false; // Initialize to false by default
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
            this.piece = new Queen();
        } else {
            this.piece = new King();
        }
    }

    public checkMove(field: HTMLElement) {
        console.log(this.piece.legalMoves)
        const finder = this.piece.legalMoves
            .flat()
            .some((parentElement: React.JSX.Element) => {
                const parentId = parentElement.props.id;
                console.log(parentId)
                console.log(field.id)
                return parentId === field.id;
            });
    
        this.passedTheMove = finder;
    }
}
  //this a prototype for now