import './App.css';
import StartApp from './components/StartApp.tsx';

function App() {
  return (
    <div className="ChessApp">
      <div className="board">
        <StartApp></StartApp>
      </div>
    </div>
  );
}

export default App;
