import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game'

class Page extends React.Component {

	render () {
		return (
		<div className='page'>
		<center>
			<div className="navbar">Ultimate Tic-Tac-Toe</div>
			<Game />
		</center>
		</div>
		);
	}
}
// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);