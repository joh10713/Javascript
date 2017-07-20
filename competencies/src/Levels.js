import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import LevelDescriptors from './LevelDescriptors';

class Levels extends Component {
	render () {
		const entries = this.props.levels.data.length;
		const levelLengths = Array(entries).fill(null);
		for(var i = 0; i<entries; i++)
		{
			levelLengths[i]=this.props.levels.data[i].relationships.descriptor.data.length;
		}
		return (
			<div className='section'>
				{[...Array(entries)].map((x, i) =>
					<div key={i}>
						<h3 className='header3'>Level {i+1}</h3>
						<p>{this.props.levels.data[i].attributes["level-description"]}</p>
						<h4 className='header4'>Level {i+1} Descriptors</h4>
						<LevelDescriptors levelLength={levelLengths[i]} levels={this.props.levels} level={i} descriptors={this.props.descriptors} descriptorTraits={this.props.descriptorTraits}/>
					</div>
				)}
			</div>);
	}
}

Levels.propTypes =
{
	levels: PropTypes.object.isRequired,
	descriptors: PropTypes.object.isRequired,
	descriptorTraits: PropTypes.object.isRequired,
}

export default Levels;
