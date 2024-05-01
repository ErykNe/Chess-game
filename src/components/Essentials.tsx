import React from "react";
import { board } from "./ChessBoard.tsx";
import Utils from "./Utils";
import { Piece } from "./Pieces.tsx";

export let BlackKingMoved: boolean, WhiteKingMoved: boolean, BlackRook1Moved: boolean, BlackRook2Moved: boolean, WhiteRook1Moved: boolean, WhiteRook2Moved: boolean
export let turn: string = "White";
export let previousMovement: [Piece, any, any, any, string];
export let KingUnderCheckKey: string

export function setKingUnderCheckKey(str:string){
    KingUnderCheckKey = str
}

export default {
    Initialize: function Initialize(): void {
        BlackKingMoved = WhiteKingMoved = BlackRook1Moved = BlackRook2Moved = WhiteRook1Moved = WhiteRook2Moved = false;
        turn = "White"
        KingUnderCheckKey = ''
    },
    Read: function Read(): boolean[] {
        let arr: boolean[] = [];
        arr.push(BlackKingMoved, WhiteKingMoved, BlackRook1Moved, BlackRook2Moved, WhiteRook1Moved, WhiteRook2Moved)
        return arr
    },
    UpdateAccordingly: function Update(childElement:HTMLElement, secondChildElement:HTMLElement, oldDiv:HTMLElement, newDiv:HTMLElement, piece:Piece): void {
        previousMovement = (newDiv.id.includes("5") || newDiv.id.includes("4")) ? [piece, childElement, oldDiv, newDiv, "DoubleSquarePawnMovement"] : [piece, childElement, oldDiv, newDiv, ""];
        turn = childElement.id.includes("White") ? "Black" : "White";
        switch(previousMovement[1].id){
            case "WhiteKing":
                WhiteKingMoved = true
                break;
            case "BlackKing":
                BlackKingMoved = true
                break;              
        }
        if(previousMovement[2].id.includes("h1"))
            WhiteRook2Moved = true;   
        if(previousMovement[2].id.includes("a1"))
            WhiteRook1Moved = true 
        if(previousMovement[2].id.includes("h8"))
            BlackRook1Moved = true    
        if(previousMovement[2].id.includes("a8"))
            BlackRook2Moved = true 
    }
}