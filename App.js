import React, { useState } from 'react';
import './App.css';

function App() {
    const [board, setBoard ] = useState(Array(9).fill(null));
    const [isXnext, setIsXNext]= useState(true);
    const [Winner, setWinner] = useState(null);
    const handleClick = (index) => {
        if(board[index] || winner) return;
        const newBoard = board.slice();
        newBoard[index] = isNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXnext);
        checkWinner(newBoard);
    };
    const checkWinner = (board) => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        for(let line of lines){
            const [a,b,c]= line;
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                setWinner(board[a]);
                return;
            }
        }
        if(!board.includes(null)){
            setWinner('Tie');
        }
    };
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };
    return(
        <div className = "game">
        <h1>TIC-TAC-TOE</h1>
        {winner ? <h2>{winner === 'Tie' ? 'It is a Tie' : `Player ${winner}Won!`}</h2> : <h2>Next Player: {isXnext ? 'X' : 'O'}</h2>}
        <Board board={board} onClick={handleClick} />
        <button onClick={resetGame}>RESET</button>
        </div>
    );
 }

 function Board({ board, onClick}){
    return(
        <div className="board">
            {board.map((value, index) =>(
                <Square key={index} value={value} onClick={() => onClick(index)} />
            ))}
        </div>
    );
 }

 function Square({value,onclick}) {
    return (
        <button className="square" onclick={onclick}>{value}</button>
    );
 }

 export default App;