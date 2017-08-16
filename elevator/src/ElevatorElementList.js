import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import Scrollspy from "react-scrollspy";
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
  }

  buttonHandleClick() {
    var time = new Date();
    var dict = this.state.dict;
    dict.modified.date = time;
    this.setState ({
      dict: dict,
    });
    console.log(JSON.stringify(this.state, null, 2));
    console.log(window);
  }

  handleWindowClose(){
    alert(window);
  }

  listener(event) {
    console.log(event);
    console.log("message recieved");
  }

  componentDidMount() {
      window.parent.parent.postMessage("hello", "*");
      window.addEventListener('onbeforeunload', this.handleWindowClose);
      window.addEventListener("message", this.listener, false);
      console.log("listener added");
      /*var url = "http://dev.elevator.umn.edu/defaultinstance/assetManager/getTemplate/44";
  		axios.get(url).then((response) => {
        console.log(response);
  			this.setState({
  				dict: response,
        })
  		})*/
  }

  componentWillUnmount() {
      window.removeEventListener('onbeforeunload', this.handleWindowClose);
  }

  render() {

    var getState = function(state, value) {
      var dict = this.state.dict;
      dict[state] = value;
      this.setState ({
        dict: dict,
      });
    }

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
          return <Select getState={getState} data={data} fillIn={fillIn}/>;//options={data.fieldData.selectGroup} are the options for select always going to be given to me in selectGroup
        case "tag list" :
          return <TagList getState={getState} data={data} fillIn={fillIn}/>;
        case "text area" :
          return <TextArea getState={getState} data={data} fillIn={fillIn}/>;
        case "upload" :
          return <Upload getState={getState} data={data} fillIn={fillIn}/>;
        default:
          return <h1>This should not happen</h1>;
      }
    }

    var entries = this.props.data.widgetArray.length;
    var items=["General"].concat([...Array(entries)].map((x, i)=>this.props.data.widgetArray[i].label));
    return (<div className="elevatorElementList">

                <Col lg={2} md={1} smHidden xsHidden />

                <Col lg={8} md={10} sm={12} xs={12}>
                  <div className="panel-body main">
                    <Col lg={2} md={2} sm={2} xsHidden>
                      <div className="sidePanel">
                      {[...Array(this.props.example.entries.length)].map((x, i) => (
                        <div key={i} className="previewSummary"><h7><b>{this.props.example.entries[i].label}: </b>{this.props.example.entries[i].entries}</h7></div>
                        ))}
                      <Button onClick={this.buttonHandleClick.bind(this)} bsStyle="success">Save</Button>
                      <Scrollspy items={items} currentClassName="activelink">
                        <li key="General"><a className='listitem' href={'#General'}>General</a></li>
                        {[...Array(entries)].map((x, i) => (
                          <li key={i}>
                            <a className="listitem" href={"#" + encodeURI(this.props.data.widgetArray[i].label)}>{this.props.data.widgetArray[i].label}</a>
                          </li>))}
                      </Scrollspy>
                      </div>
                    </Col>
                    <Col lg={2} md={1} sm={1} xsHidden></Col>
                    <Col lg={8} md={9} sm={9} xs={12} className='scrollingItems'>
                      <section id='General'><General getState={getState.bind(this)} collectionId={this.props.fillIn.collectionId} templateId={this.props.fillIn.templateId} readyForDisplay={this.props.fillIn.readyForDisplay} availableAfter={this.props.fillIn.availableAfter ? this.props.fillIn.availableAfter : ""} allowedCollections={this.props.data.allowedCollections} collections={this.props.data.collections} templates={this.props.data.templates ? this.props.data.templates : []}/></section>
                      {[...Array(entries)].map((x, i) => (
                      <section id={this.props.data.widgetArray[i].label} key={i}>
                        {element(this.props.data.widgetArray[i], this.props.fillIn[this.props.data.widgetArray[i].fieldTitle], getState.bind(this))}
                      </section>))}
                    </Col>
                  </div>
                </Col>

                <Col lg={2} md={1} smHidden xsHidden />

            </div>
    );
  }
}

export default ElevatorElementList;
