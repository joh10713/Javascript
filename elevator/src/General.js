import React, { Component } from "react";
import { Panel, Form, FormGroup, FormControl, Checkbox, ControlLabel } from "react-bootstrap"
import DatePicker from "react-bootstrap-date-picker"
import "./App.css";

class General extends Component{
  constructor(props) {
      super(props);
      this.state = {
        templateId: props.templateId,
        collectionId: props.collectionId,
        readyForDisplay: props.readyForDisplay,
        availableAfter: props.availableAfter,
      }

  }

  render () {
    var findOption = function(collections, allowedCollections, label, options) {
      var collection;
      for(var i=0; i<collections.length; i++)
      {
        if(typeof collections[i] === "string")
        {
          if(allowedCollections.indexOf(collections[i] !== -1))
          {
            collection = label + collections[i];
            options.push(collection);
          }
        }
        else {
          collection = label + Object.keys(collections[i])[0];
          options.push(collection);
          options = options.concat(findOption(Object.values(collections[i][collection]), allowedCollections, label + "-", []));
        }
      }
      return options;
    }

    var handleDateSubmit = function(event) {
      this.props.getState("availableAfter", event.target.value);
      this.setState ({
        readyForDisplay: event.target.value,
      });
    }

    var checkboxHandleChange = function(i) {
      var readyForDisplay = !this.state.readyForDisplay;
      this.props.getState("readyForDisplay", readyForDisplay);
      this.setState ({
        readyForDisplay: readyForDisplay,
      });
    }

    var handleSelectChange = function(name, values,  event) {
      var index = values.indexOf(event.target.value);
      var indexes;
      if(name === 'templateId') {
        indexes = Object.keys(this.props.templates);
      }
      else if (name === 'collectionId') {
        indexes = Object.keys(this.props.allowedCollections);
      }
      else {
        return;
      }
      this.props.getState(name, indexes[index]);
      this.setState ({
        name: indexes[index],
      });
    }

    var allowedCollections = Object.values(this.props.allowedCollections);
    var templates = Object.values(this.props.templates);
    var collections = Object.values(this.props.collections);
    var options = findOption(collections, allowedCollections, "", []);
  return (
    <Panel header=" " footer=" ">
      <div className="elevatorElement">
        <p>Object id: uhhhh</p><br/>

        <Form inline>

          <FormGroup>
            <ControlLabel>Template: </ControlLabel>
            <FormControl className='formcontrol' type='select' componentClass='select' value={this.state.templateId} onChange={handleSelectChange.bind(this, "templateId", templates)}>
              {[...Array(templates.length)].map((x, i) => <option key={i}>{templates[i]}</option>)}
            </FormControl>
          </FormGroup><br/>

          <FormGroup>
            <ControlLabel>Collection: </ControlLabel>
            <FormControl className='formcontrol' type='select' componentClass='select' value={this.state.collectionId} onChange={handleSelectChange.bind(this, 'collectionId', allowedCollections)}>
              {[...Array(options.length)].map((x, i) => <option key={options[i]}>{options[i]}</option>)}
            </FormControl>
          </FormGroup>
        </Form>

        <FormGroup>
          <Checkbox inline type="checkbox" onChange={checkboxHandleChange.bind(this)} checked={this.state.readyForDisplay}>Ready for Display</Checkbox>
        </FormGroup>

        <p>Available After: </p><DatePicker style={{width: '25%', display: 'inline-block'}} showClearButton={false} value={this.state.availableAfter} onChange={handleDateSubmit.bind(this)}/>
      </div>
    </Panel>
  );
  }
}

export default General;

/*

var Cars;

var values = Object.values(Cars); //list of value object.

var colors = Array(values.length).map((x,i) => values[i][color]);

*/
