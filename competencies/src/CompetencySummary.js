import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class CompetencySummary extends Component {
	render() {
		return(
			<div>
				<div className="competencytitle">
					<div>
						<img src={this.props.data.attributes["icon-url"]} alt="competency icon" className="competencysummaryicon"/>
						<div className='test'>
							{this.props.data.attributes.competency}
						</div>
					</div>
				</div>
				<p>{this.props.data.attributes.description}</p>
			</div>)
	}
}

CompetencySummary.propTypes =
{
	data: PropTypes.object.isRequired,
}

export default CompetencySummary;
