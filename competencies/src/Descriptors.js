import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Descriptors extends Component {
	render () {
		return (
			<div className='section'>
				{[...Array(this.props.descriptors.data.length)].map((x, i) =>
					<p key={i}>{this.props.descriptors.data[i].attributes["descriptor-text"]}</p>
				)}
			</div>);
	}
}

Descriptors.propTypes = 
{
	descriptors: PropTypes.object.isRequired,
}

export default Descriptors;