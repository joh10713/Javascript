import React from 'react';
import './index.css';
import BigBoard from './BigBoard'

function calculateWinner(squares) {
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
  return null;
}

class Game extends React.Component {
	constructor () {
		super();
		this.state = {
			squares: Array(81).fill(null),
			games: Array(9).fill(null),
			xIsNext: true,
			legalSquares: [0,1,2,3,4,5,6,7,8,
			               9,10,11,12,13,14,15,16,17,
						   18,19,20,21,22,23,24,25,26,
						   27,28,29,30,31,32,33,34,35,
						   36,37,38,39,40,41,42,43,44,
						   45,46,47,48,49,50,51,52,53,
						   54,55,56,57,58,59,60,61,62,
						   63,64,65,66,67,68,69,70,71,
						   72,73,74,75,76,77,78,79,80],
			legalGames: [0,1,2,3,4,5,6,7,8],
			nextLegalGame: null,
			twoPlayer: true,
		};
	}
	newOnePlayerGame () {
		this.setState ({
			twoPlayer: false,
		});
		this.handleReset();
	}
	newTwoPlayerGame () {
		this.setState ({
			twoPlayer: true,
		});
		this.handleReset();
	}
	isLegalMove (legalSquares, i, legalGames, nextLegalGame, game, games) {
		if(games[nextLegalGame] || this.state.nextLegalGame === null)
		{
			return (!legalSquares.some(function(val) {return val === i}) ||
		            calculateWinner(games) ||
					!legalGames.some(function(val) {return val === game}))
		}
		return (!legalSquares.some(function(val) {return val === i}) ||
				calculateWinner(games) ||
				!legalGames.some(function(val) {return val === game}) ||
				(game !== this.state.nextLegalGame))
	}
	handleReset () {
		this.setState ({
			squares: Array(81).fill(null),
			games: Array(9).fill(null),
			xIsNext: true,
			legalSquares: [0,1,2,3,4,5,6,7,8,
			               9,10,11,12,13,14,15,16,17,
						   18,19,20,21,22,23,24,25,26,
						   27,28,29,30,31,32,33,34,35,
						   36,37,38,39,40,41,42,43,44,
						   45,46,47,48,49,50,51,52,53,
						   54,55,56,57,58,59,60,61,62,
						   63,64,65,66,67,68,69,70,71,
						   72,73,74,75,76,77,78,79,80],
			legalGames: [0,1,2,3,4,5,6,7,8],
			nextLegalGame: null,
		});
	}
	handleClick (i) {
		var squares = this.state.squares.slice();
		var legalSquares = this.state.legalSquares.slice();
		var legalGames = this.state.legalGames.slice();
		var game = Math.floor(i/9);
		var games = this.state.games.slice();
		if(this.isLegalMove(legalSquares, i, legalGames, this.state.nextLegalGame, game, games))
		{
			return;
		}
		legalSquares = legalSquares.filter((x) => x !== i);
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
		  legalSquares: legalSquares,
		  squares: squares,
		});
		if(this.state.twoPlayer)
		{
			this.setState ({
				xIsNext: !this.state.xIsNext,
			})
		}
		var nextLegalGame = i%9;
		var min = 9*game;
		var max = (9*Math.floor(i/9))+8;
		var gameWinner = calculateWinner(squares.slice(min,max+1));
		games[game] = gameWinner;
		this.setState({
			games: games,
			nextLegalGame: nextLegalGame,
		})
		//console.log(nextLegalGame)
		if(gameWinner)
		{
			legalGames = legalGames.filter((x) => x !== game);
			//legalSquares = legalSquares.filter((x) => x < min || x > max);
			this.setState({
				legalGames: legalGames,
				//legalSquares: legalSquares,
			})
		}
		var winner = calculateWinner(games)
		if(winner)
		{
			this.setState({
				games: Array(9).fill(winner)
			})
		}
		if(!this.state.twoPlayer)
		{
			var computerMove;
			var nextBoard = nextLegalGame;
			if(games[nextBoard])
			{
				nextBoard=legalGames[Math.floor(legalGames.length*Math.random())];
			}
			min = 9*nextBoard;
			max = (9*nextBoard)+8;
			var potentialSquares = legalSquares.filter((x) => x>=min && x<=max);
			computerMove = potentialSquares[Math.floor(potentialSquares.length*Math.random())];
			legalSquares = legalSquares.filter((x) => x !== computerMove);
			squares[computerMove] = 'O';
			this.setState({
			  legalSquares: legalSquares,
			  squares: squares,
			});
			nextLegalGame = computerMove%9;
			gameWinner = calculateWinner(squares.slice(min,max+1));
			games[nextBoard] = gameWinner;
			this.setState({
				games: games,
				nextLegalGame: nextLegalGame,
			})
			if(gameWinner)
			{
				legalGames = legalGames.filter((x) => x !== nextBoard);
				//legalSquares = legalSquares.filter((x) => x < min || x > max);
				this.setState({
					legalGames: legalGames,
					//legalSquares: legalSquares,
				})
			}
			winner = calculateWinner(games)
			if(winner)
			{
				this.setState({
					games: Array(9).fill(winner)
				})
			}
		}
	}

	render () {
		const winner = calculateWinner(this.state.games);
		let status;
		if (winner) {
		status = 'Winner: ' + winner;
		} else {
		status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		var legalGames;
		if(this.state.games[this.state.nextLegalGame] || this.state.nextLegalGame === null)
		{
			legalGames = this.state.legalGames;
		}
		else
		{
			legalGames = [this.state.nextLegalGame];
		}

		return (

			<div className="test">
				<button className="reset" onClick={(i) => this.newOnePlayerGame(i)}>New 1-Player Game</button>
				<button className="reset" onClick={(i) => this.newTwoPlayerGame(i)}>New 2-Player Game</button>
				<BigBoard
					legalGames={legalGames}
					squares={this.state.squares}
					games={this.state.games}
					onClick={(i) => this.handleClick(i)}
				/>
				<div className='status' >{status}</div>
			</div>
		);
	}
}

export default Game
