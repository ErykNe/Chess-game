import React from "react";
import { board, previousMovement, turn } from "./ChessBoard.tsx";
import Utils from "./Utils";

export let BlackKingMoved: boolean, WhiteKingMoved: boolean, BlackRook1Moved: boolean, BlackRook2Moved: boolean, WhiteRook1Moved: boolean, WhiteRook2Moved: boolean



export default {
    Initialize: function Initialize(): void {
        BlackKingMoved = false
        WhiteKingMoved = false
        BlackRook1Moved = false
        BlackRook2Moved = false
        WhiteRook1Moved = false
        WhiteRook2Moved = false
    },
    Read: function Read(): boolean[] {
        let arr: boolean[] = [];
        arr.push(BlackKingMoved, WhiteKingMoved, BlackRook1Moved, BlackRook2Moved, WhiteRook1Moved, WhiteRook2Moved)
        return arr
    },
    Update: function Update(): void {
        if(previousMovement.move[0].pieceType == "King" && previousMovement.piecePreviousPosition.id.includes("e1")){
            WhiteKingMoved = true
        }
        if(previousMovement.move[0].pieceType == "King" && previousMovement.piecePreviousPosition.id.includes("e8")){
            BlackKingMoved = true
        }

        if(previousMovement.move[0].pieceType == "Rook" && previousMovement.piecePreviousPosition.id.includes("a1")){
            WhiteRook1Moved = true
        }
        if(previousMovement.move[0].pieceType == "Rook" && previousMovement.piecePreviousPosition.id.includes("h1")){
            WhiteRook2Moved = true
        }
        if(previousMovement.move[0].pieceType == "Rook" && previousMovement.piecePreviousPosition.id.includes("a8")){
           BlackRook1Moved = true
        }
        if(previousMovement.move[0].pieceType == "Rook" && previousMovement.piecePreviousPosition.id.includes("h8")){
            BlackRook2Moved = true
        }

        console.log(WhiteKingMoved, BlackKingMoved, WhiteRook1Moved, WhiteRook2Moved, BlackRook1Moved, BlackRook2Moved)
    }
}