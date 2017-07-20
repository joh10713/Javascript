import React, { Component } from 'react';
import Page from './Page'
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="App" style={{height: "100%"}}>
        <Page />
      </div>
    );
  }
}

export default App;


/*
The radio buttons work right now, if they break again I'm not crazy and magic is happening.

Additionally, when text inputs are submitted the page DOES NOT refresh as of right now, it they start refreshing again I'm not crazy and magic is happening.

attemptAutocomplete? readyForDisplay? availableAfter? etc

Need to make RelatedAsset work with a given input, and figure out what do even do with it.

Loading JSONs instead of a presaved JSON.

Upload.
*/
