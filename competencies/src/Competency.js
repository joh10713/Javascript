import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Levels from './Levels';
import Descriptors from './Descriptors';
import DescriptorTraits from './DescriptorTraits';
import axios from 'axios';

class Competency extends Component {
	constructor () {
		super();
		this.state = {
			levels: null,
			descriptors: null,
			descriptorTraits: null,
		}
	}
	componentDidMount() {
		var levelsurl = "http://competencies.lobstermonkey.com/api/v1/competency/" + this.props.index + "/levels";
		axios.get(levelsurl).then((response) => {
			this.setState({
				levels: response.data,
				})
		});
		var descriptorsurl = "http://competencies.lobstermonkey.com/api/v1/competency/" + this.props.index + "/descriptors";
		axios.get(descriptorsurl).then((response) => {
			this.setState({
				descriptors: response.data,
				})
		});
		var descriptorTraitsurl = "http://competencies.lobstermonkey.com/api/v1/competency/" + this.props.index + "/descriptor-traits";
		axios.get(descriptorTraitsurl).then((response) => {
			this.setState({
				descriptorTraits: response.data,
				})
		});
	}
	render () {
		if(this.state.levels && this.state.descriptorTraits && this.state.descriptors)
		{
			return (
				<div className='competency'>
					<div className='competencyheader'>
						<img src={this.props.data.attributes["icon-url"]} alt="competency icon" className="competencyicon"/>
						<h1 id='competencyheader'>{this.props.data.attributes.competency}</h1>
					</div>
					<p>{this.props.data.attributes.description}</p>
					<h2 className='header2'>{this.props.data.attributes.competency} Levels</h2>
					<Levels data={this.props.data} levels={this.state.levels} descriptors={this.state.descriptors} descriptorTraits={this.state.descriptorTraits}/>
					<h2 className='header2'>Descriptors for {this.props.data.attributes.competency}</h2>
					<Descriptors descriptors={this.state.descriptors}/>
					<h2 className='header2'>Descriptor-Traits for {this.props.data.attributes.competency}</h2>
					<DescriptorTraits descriptorTraits={this.state.descriptorTraits} />
				</div>)
		}
		else
		{
			return (<div></div>);
		}
	}
}

Competency.propTypes =
{
	index: PropTypes.number.isRequired,
	data: PropTypes.object.isRequired,
}

export default Competency;
