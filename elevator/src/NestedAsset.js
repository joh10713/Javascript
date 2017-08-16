import React, { Component } from "react";
import { Col, Panel } from "react-bootstrap";
import Text from "./Text";
import CheckboxWidget from "./Checkbox";
import DateWidget from "./Date";
import TagList from "./TagList";
import Location from "./Location";
import Select from "./Select";
import TextArea from "./TextArea";
import RelatedAsset from "./RelatedAsset";
import MultiSelect from "./MultiSelect";
import Upload from './Upload';
//import axios from 'axios';
import "./App.css";

class NestedAsset extends Component {

  render() {

    var getState = function() {

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

    return (<Panel>
                <Col xs={12} className="elevatorElement" >

                {[...Array(entries)].map((x, i) => (
                <div id={this.props.data.widgetArray[i].label} key={i}>
                  {element(this.props.data.widgetArray[i], this.props.fillIn[this.props.data.widgetArray[i].fieldTitle], getState.bind(this))}
                </div>))}

                </Col>

            </Panel>
    );
  }
}

export default NestedAsset;
