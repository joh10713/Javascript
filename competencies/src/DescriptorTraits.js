import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class DescriptorTraits extends Component {
	render () {
		return (
			<div className='section'>
				{[...Array(this.props.descriptorTraits.data.length)].map((x, i) =>
					<p key={i}>{this.props.descriptorTraits.data[i].attributes["trait-title"]}</p>
				)}
			</div>);
	}
}

DescriptorTraits.propTypes = 
{
	descriptorTraits: PropTypes.object.isRequired,
}

export default DescriptorTraits;