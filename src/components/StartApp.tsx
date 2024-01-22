import React, { useState } from 'react';
import ChessBoard from './ChessBoard.tsx';
import './ChessBoard.css';
import './StartApp.css';

const StartApp = () => {
  const [showChessBoard, setShowChessBoard] = useState(false);

  const handleStartUpClick = () => {
    setShowChessBoard(true);
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
      {showChessBoard && <ChessBoard/>}
    </div>
  );
};

export default StartApp;