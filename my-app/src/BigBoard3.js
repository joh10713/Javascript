import React from 'react';
import './index.css';
import Game from './Game'

function calculateWinner(games) {
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
    if (games[a].winner && games[a].winner === games[b].winner && games[a].winner === games[c].winner) {
      return games[a].winner;
    }
  }
  return null;
}

class BigBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      games: Array(9).fill(Game),
	  stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
   /* const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';*/
	
    this.setState({
      /*history: history.concat([{
        square: squares
      }]),
	  stepNumber: history.length,*/
      xIsNext: !this.state.xIsNext,
    });
  }
  
  renderGame(i) {
    return (
	  <button className='game-button' onClick={() => this.handleClick(i)} >
		  <Game
				xIsNext={this.state.xIsNext}
				//games={this.current.games}
		  />
	  </button>
    );
  }

  render() {
	/*const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.games);
	console.log(winner)*/
	console.log(this.state.games.stepNumber)
	/*
	let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
	*/
	
    return (
      <div>
        <div className="game-row">
          {this.renderGame(0)}
          {this.renderGame(1)}
          {this.renderGame(2)}
        </div>
        <div className="game-row">
          {this.renderGame(3)}
          {this.renderGame(4)}
          {this.renderGame(5)}
        </div>
        <div className="game-row">
          {this.renderGame(6)}
          {this.renderGame(7)}
          {this.renderGame(8)}
        </div>
		<div>
			{status}
		</div>
      </div>
    );
  }
}

export default BigBoard