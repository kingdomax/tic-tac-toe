import { useState } from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        const description =
            move > 0 ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={currentMove % 2 === 0}
                    squares={history[currentMove]}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (squares[i] || calculateWinnerLocations(squares)) {
            return;
        }

        const nextSquares = squares.slice(); // copy new array (immutable data)
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares);
    }

    let status;
    const winnerLocations = calculateWinnerLocations(squares);
    if (winnerLocations) {
        status = "Winner: " + winnerLocations[0];
    } else if (!squares.includes(null)) {
        status = "Draw";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    isHighlight={winnerLocations?.includes(0) ?? false}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    isHighlight={winnerLocations?.includes(1) ?? false}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    isHighlight={winnerLocations?.includes(2) ?? false}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[3]}
                    isHighlight={winnerLocations?.includes(3) ?? false}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    isHighlight={winnerLocations?.includes(4) ?? false}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    isHighlight={winnerLocations?.includes(5) ?? false}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[6]}
                    isHighlight={winnerLocations?.includes(6) ?? false}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    isHighlight={winnerLocations?.includes(7) ?? false}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    isHighlight={winnerLocations?.includes(8) ?? false}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    );
}

function Square({ value, isHighlight, onSquareClick }) {
    const className = isHighlight ? "square highlight" : "square";
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinnerLocations(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return [a, b, c];
        }
    }
    return null;
}
