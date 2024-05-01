import React, { useRef, useState } from 'react';
import ChessBoard from './ChessBoard.tsx';
import './ChessBoard.css';
import './StartApp.css';

const StartApp = () => {
  const [showChessBoard, setShowChessBoard] = useState(false);
  const [boardKey, setBoardKey] = useState(0);
  const handleStartUpClick = () => {
    setShowChessBoard(true);
  };

  const resetChessBoard = () => {
    setBoardKey(prevKey => prevKey - 1);
  };

  return (
    <div>
      {!showChessBoard && (
        <div>
          <img
            src={require('../assets/logo512.png')}
            alt="Chess Logo"
          /> <br></br>
          <a id="btn" onClick={handleStartUpClick}>Get started</a>
        </div>
      )}
      {showChessBoard && <ChessBoard key={boardKey} resetChessBoard={resetChessBoard} />}
    </div>
  );
};

export default StartApp;