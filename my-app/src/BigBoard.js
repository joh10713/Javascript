import React from 'react';
import './index.css'
import Board from './Board'

class BigBoard extends React.Component {
	renderBoard(j) {
		//console.log(this.props.games[j])
		var className = 'board-n';
		if(this.props.games[j] === 'X')
		{
			className='board-x';
		}
		else if(this.props.games[j] === 'O')
		{
			className='board-o';
		}	
		else if(this.props.legalGames.some(function(val) {return val === j}))
		{
			className='board-l';
		}
		return (
		  <Board
			className={className}
			squares={this.props.squares}
			board={j}
			onClick={(i) => this.props.onClick(i)}
		  />
		);
    }
	render () {
		return (
		  <div className='test2'>
			<div className="bigboard-row">
			  {this.renderBoard(0)}
			  {this.renderBoard(1)}
			  {this.renderBoard(2)}
			</div>
			<div className="bigboard-row">
			  {this.renderBoard(3)}
			  {this.renderBoard(4)}
			  {this.renderBoard(5)}
			</div>
			<div className="bigboard-row">
			  {this.renderBoard(6)}
			  {this.renderBoard(7)}
			  {this.renderBoard(8)}
			</div>
		  </div>
		);
	}
}

export default BigBoard