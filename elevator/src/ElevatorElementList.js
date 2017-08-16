// This component imports all of the widgets, organizes the widgets and passes the widgets the data they need.

import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";//documentation can be found here https://react-bootstrap.github.io/
import Scrollspy from "react-scrollspy"; //Scrollspy enabled the sidebar to work. Documentation can be found here https://github.com/makotot/react-scrollspy
import Text from "./Text";
import CheckboxWidget from "./Checkbox";
import DateWidget from "./Date";
import TagList from "./TagList";
import Location from "./Location";
import Select from "./Select";
import TextArea from "./TextArea";
import RelatedAsset from "./RelatedAsset";
import MultiSelect from "./MultiSelect";
import General from './General';
import Upload from './Upload';
//import axios from 'axios';
import "./App.css";

class ElevatorElementList extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn)
    {
      this.state = {
        dict: props.fillIn,
        data: null,
      }
    }
    else {
      this.state = {
        dict: {},
        data: null,
      }
    }
  }//dict is the JSON object that will be sent back to the server when saved

  buttonHandleClick() {
    var time = new Date();
    var dict = this.state.dict;
    dict.modified.date = time;
    this.setState ({
      dict: dict,
    });
    console.log(JSON.stringify(this.state, null, 2));
    console.log(window);
  }//This is the save buttons event handler. Right now it just outputs the JSON that would be sent to the server to the console.

  handleWindowClose(){
    alert(window);
  }

  listener(event) {
    console.log(event);
    console.log("message recieved");
  }

  componentDidMount() {
      window.parent.postMessage("hello", "*");
      window.addEventListener('onbeforeunload', this.handleWindowClose);
      window.addEventListener("message", this.listener, false);
      console.log("listener added");
  }

  componentWillUnmount() {
      window.removeEventListener('onbeforeunload', this.handleWindowClose);
  }/*The last four functions are the start of interwindow communication that is needed for the nested asset widget.
    Hosting this locally I was never able to make the parent/child relationship to work correctly since I could only host one asset at
    and as a result I cannot communicate between two different(a parent and a child) assets.*/

  render() {

    var getState = function(state, value) {
      var dict = this.state.dict;
      dict[state] = value;
      this.setState ({
        dict: dict,
      });
    }//This function is passed as a prop to child components and it allows them to pass information to this components to update the JSON information

    var element = function(data, fillIn, getState) {
      switch(data.type) {
        case "text" :
          return <Text getState={getState} data={data} fillIn={fillIn}/>;
        case "checkbox" :
          return <CheckboxWidget getState={getState} data={data} fillIn={fillIn}/>;
        case "date" :
          return <DateWidget getState={getState} data={data} fillIn={fillIn}/>;
        case "location" :
          return <Location getState={getState} data={data} fillIn={fillIn}/>;
        case "multiselect" :
          return <MultiSelect getState={getState} data={data} fillIn={fillIn}/>;
        case "related asset" :
          return <RelatedAsset getState={getState} data={data} fillIn={fillIn} options={["option1", "option2"]}/>;
        case "select" :
          return <Select getState={getState} data={data} fillIn={fillIn}/>;
        case "tag list" :
          return <TagList getState={getState} data={data} fillIn={fillIn}/>;
        case "text area" :
          return <TextArea getState={getState} data={data} fillIn={fillIn}/>;
        case "upload" :
          return <Upload getState={getState} data={data} fillIn={fillIn}/>;
        default:
          return <h1>This should not happen</h1>;
      }
    }//This function tells the render which widget to render and then passes the child component the data it needs.

    var entries = this.props.data.widgetArray.length;
    var items=["General"].concat([...Array(entries)].map((x, i)=>this.props.data.widgetArray[i].label));
    return (<div className="App">

                <Col lg={2} md={1} smHidden xsHidden />{/*space on the left*/}

                <Col lg={8} md={10} sm={12} xs={12}>{/*column that contains the sidebar and the widget list.*/}
                  <div >

                    <Col lg={2} md={2} sm={2} xs={2}>
                      <div className="sidePanel">
                      {[...Array(this.props.example.entries.length)].map((x, i) => (
                        <div key={i} className="previewSummary"><h7><b>{this.props.example.entries[i].label}: </b>{this.props.example.entries[i].entries}</h7></div>
                      ))}{/*This map lists the information that is supposed to be dislplayed in the preview of the elevator element.*/}

                      <Button onClick={this.buttonHandleClick.bind(this)} className="button" bsStyle="primary">Save</Button>
                      <Button className="button" bsStyle="info">View</Button>

                      <Scrollspy items={items} currentClassName="activelink">
                        <li key="General"><a className='listitem' href={'#General'}>General</a></li>
                        {[...Array(entries)].map((x, i) => (
                          <li key={i}>
                            <a className="listitem" href={"#" + encodeURI(this.props.data.widgetArray[i].label)}>{this.props.data.widgetArray[i].label}</a>
                          </li>))}
                      </Scrollspy>{/*This is the sidebar.*/}

                      </div>
                    </Col>

                    <Col lg={2} md={1} sm={1} xs={1}><div className='scrollingItems'></div></Col>{/*space in between the sidebar and the widget list*/}

                    <Col lg={8} md={9} sm={9} xs={10} className='scrollingItems'>
                      <section id='General'><General getState={getState.bind(this)} collectionId={this.props.fillIn.collectionId} templateId={this.props.fillIn.templateId} readyForDisplay={this.props.fillIn.readyForDisplay} availableAfter={this.props.fillIn.availableAfter ? this.props.fillIn.availableAfter : ""} allowedCollections={this.props.data.allowedCollections} collections={this.props.data.collections} templates={this.props.data.templates ? this.props.data.templates : []}/></section>
                      {[...Array(entries)].map((x, i) => (
                      <section id={this.props.data.widgetArray[i].label} key={i}>
                        {element(this.props.data.widgetArray[i], this.props.fillIn[this.props.data.widgetArray[i].fieldTitle], getState.bind(this))}
                      </section>))}
                    </Col>{/*The list of widgets.*/}

                  </div>
                </Col>

                <Col lg={2} md={1} smHidden xsHidden />{/*space on the right*/}

            </div>
    );
  }
}

export default ElevatorElementList;
