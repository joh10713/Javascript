import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideBar extends Component {
	render ()
	{
		if(this.props.data)
		{
			const entries = this.props.data.length;
			return (
				<ul className='sidebar'>
					<li>
							Home
					</li>
					{[...Array(entries)].map((x, i) =>
						<li key={i}>
							{this.props.data[i].attributes.competency}
						</li>
					)}
				</ul>
			)
		}
		else
		{
			return (<div></div>)
		}
	}
}

SideBar.propTypes =
{
	data: PropTypes.array.isRequired,
}

export default SideBar;
