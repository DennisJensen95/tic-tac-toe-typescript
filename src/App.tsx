import React from 'react';
import './App.css';

type SquareProperties = {
  value: string;
  onClick: () => void;
};

function Square(props: SquareProperties) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button >
  );
}

type BoardProperties = {};

type BoardState = {
  player: string;
  squares: Array<string>;
}

class Board extends React.Component<BoardProperties, BoardState> {
  state: BoardState = {
    player: 'X',
    squares: Array(9).fill(''),
  };

  handleClick(i: number) {
    if (this.state.squares[i] !== '') {
      return;
    }
    const squares = this.state.squares.slice();
    squares[i] = this.state.player;
    this.setState({
      squares: squares,
      player: this.state.player === 'X' ? 'O' : 'X',
    });
  }

  renderSquare(i: number) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status = '';
    if (winner != '') {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.player;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function allEqual(array: Array<string>) {
  return array.every(function (element, index) {
    return element != '';
  });
}

function calculateWinner(squares: Array<string>): string {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (allEqual(squares)) {
    return "Tie";
  }

  return '';
}

// ========================================

export default Game;
