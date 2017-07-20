import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import FrontPage from './FrontPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Competency from './Competency';
import axios from 'axios';
import NavBar from './NavBar';
import SideBar from './SideBar';

class AppNavBar extends Component {
  constructor () {
		super();
		this.state = {
			data: null,
		}
	}
	componentDidMount() {
		var url = "http://competencies.lobstermonkey.com/api/v1/competency";
		axios.get(url).then((response) => {
			this.setState({
				data: response.data.data,
				})
		});
	}
  render() {
	if(this.state.data)
	{
		const entries = this.state.data.length;
		const route = Array(entries).fill(null);
		for(var i = 0; i<entries; i++)
		{
			route[i] = '/' + this.state.data[i].attributes.competency;
		}
		return (
		<BrowserRouter>
			<div>
				<NavBar data={this.state.data} />
				<Switch>
					<Route exact path='/' component={(props) => <FrontPage {...props} data={this.state.data}/>}/>
					{[...Array(entries)].map((x, i) =>
						<Route exact path={route[i]} key={i} component={(props) => <Competency {...props} index={i+1} data={this.state.data[i]}/>}/>
					)}
					<Route render={function () {
						return <p>Not Found</p>
					}} />
				</Switch>
			</div>
		</BrowserRouter>
		);

	}
	else
	{
		return (<div></div>)
	}
  }
}

export default AppNavBar;
