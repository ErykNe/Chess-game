import React from 'react';
import './ChessBoard.css';

const verticalAxis = ["1","2","3","4","5","6","7","8"]
const horizontalAxis = ["a","b","c","d","e","f","g","h"]

export default function ChessBoard(){
    let board : React.JSX.Element [] = ChessGrids()
    return <div id="chessBoard">{board}</div>
}
export function ChessGrids(){
    console.log("ChessGrids function called");
    let board : React.JSX.Element [] = []
    for(let j = verticalAxis.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++){
            board.push(
                <div id="pushedGrids" style={{ backgroundColor: i%2!=0 && j%2==0 || i%2==0 && j%2!=0 ? 'white' : 'initial' }}>
                    [{horizontalAxis[i]}{verticalAxis[j]}]
                </div>
            )
        }
    }
    return board;
}