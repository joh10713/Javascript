import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class LevelDescriptors extends Component {
	render () {
		const entries = this.props.levelLength;
		const ids = Array(entries).fill(null);
		const traitids = Array(entries).fill(null);
		for(var i = 0; i<entries; i++)
		{
			ids[i]=(this.props.levels.data[this.props.level].relationships.descriptor.data[i].id-1)%10;
			traitids[i]=(this.props.descriptors.data[ids[i]].relationships["descriptor_trait"].data.id-1)%10;
		}
		return (
			<div>
				{[...Array(entries)].map((x, i) =>
					<div key={i}>
						<p>{this.props.descriptors.data[ids[i]].attributes["descriptor-text"]}</p>
						<p>{this.props.descriptorTraits.data[traitids[i]].attributes["trait-title"]}</p>
					</div>
				)}
			</div>);
	}
}

LevelDescriptors.propTypes = 
{
	descriptors: PropTypes.object.isRequired,
	descriptorTraits: PropTypes.object.isRequired,
	level: PropTypes.number.isRequired,
	levels: PropTypes.object.isRequired,
	levelLength: PropTypes.number.isRequired,
}

export default LevelDescriptors;