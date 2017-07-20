import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import FrontPage from './FrontPage'
import Competency from './Competency';
import axios from 'axios';
import Scrollspy from 'react-scrollspy';

class App extends Component {
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
		})
	}

  render() {
      if(this.state.data)
      {
        var entries=this.state.data.length;
        var items = ['Home'];
        for(var i=0; i<entries; i++)
        {
          items.push(this.state.data[i].attributes.competency);
        }
        return (
          <div>
            <div>
              <section id='Home' className='page'>
                <FrontPage data={this.state.data}/>
              </section>
              {[...Array(entries)].map((x, i) =>
                  <section id={this.state.data[i].attributes.competency} key={i} className='page'>
                    <Competency index={i+1} data={this.state.data[i]}/>
                  </section>
              )}
            </div>
            <Scrollspy className="sidebar" items={items} currentClassName="activelink">
              <li>
                <a className='listitem' href="#Home">Home</a>
              </li>
              {[...Array(entries)].map((x, i) =>
                  <li key={i}>
                    <a className='listitem' href={"#" + this.state.data[i].attributes.competency}>{this.state.data[i].attributes.competency}</a>
                  </li>
              )}
            </Scrollspy>
          </div>
        );
      }
      else
      {
        return (<div></div>);
      }
    }
}

export default App;
