import React, { Component } from 'react';
import PropTypes from 'prop-types';
var NavLink = require('react-router-dom').NavLink;

class NavBar extends Component {
	render () 
	{
		if(this.props.data) 
		{
			const entries = this.props.data.length;
			const routes = Array(entries).fill(null);
			for(var i = 0; i<entries; i++)
			{
				routes[i] = '/' + this.props.data[i].attributes.competency;
			}
			return (
				<ul className='nav'>
					<li>
						<NavLink exact activeClassName='active' to='/'>
							Home
						</NavLink>
					</li>
					{[...Array(entries)].map((x, i) =>
						<li key={i}>
						<NavLink activeClassName='active' to={routes[i]}>
							{this.props.data[i].attributes.competency}
						</NavLink>
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

NavBar.propTypes = 
{
	data: PropTypes.array.isRequired,
}

export default NavBar;