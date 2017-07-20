import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import Popular from './Popular'
import Nav from './Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'

class App extends Component {
  render() {
    return (
		<BrowserRouter>
			<div className='container'>
				<Nav />
				<Switch>
					<Route path='/popular' component={Popular} />
					<Route exact path='/battle' component={Battle} />
					<Route exact path='/' component={Home} />
					<Route path='/battle/results' component={Results} />
					<Route render={function () {
						return <p>Not Found</p>
					}} />
				</Switch>
			</div>
		</BrowserRouter>
    );
  }
}

export default App;
