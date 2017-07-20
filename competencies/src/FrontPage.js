import React, { Component } from 'react';
import './App.css';
import CompetencySummary from './CompetencySummary';

class FrontPage extends Component {
	render () {
		if(this.props.data)
		{
			return (
				<div>
					<h1 id='frontpageheader'>Core Career Competencies</h1>
					{[...Array(this.props.data.length)].map((x, i) =>
						<CompetencySummary data={this.props.data[i]} key={i}/>
					)}
				</div>
			);
		}
		else{
			return <div></div>
		}
	}
}

export default FrontPage;
