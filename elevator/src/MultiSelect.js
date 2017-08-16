import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio, Col } from "react-bootstrap";
import "./App.css";

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn)
    {
      this.state = {
        dict: props.fillIn,
      }
    }
    else{
      this.state = {
        dict: [{ "fieldContents": {},
                 "isPrimary": false,
               }],
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{"fieldContents": {}, "isPrimary": false,}])
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  getCategory(i, data, k, fieldContents) {
    var category = Object.keys(data)[0];
    var object = data;
    for(var j=0; j<k; j++)
    {
      if(fieldContents[j] === "Choose")
      {
        return null;
      }
      object=object[category][fieldContents[j]];
      category=Object.keys(object)[0];
    }
    return (
      category
    );
  }

  getData(data, k, fieldContents) {
    var category = Object.keys(data)[0];
    var object = data;
    for(var j=0; j<k; j++)
    {
      if(fieldContents[j] === "Choose")
      {
        return null;
      }
      object=object[category][fieldContents[j]];
      category=Object.keys(object)[0];
    }
    return (
      object[category]
    );
  }

  render() {
    var handleChange = function(i) {
      var dict = this.state.dict;
      for(var j=0; j<dict.length; j++)
      {
        dict[j].isPrimary = false;
      }
      if(!this.state.dict[i].isPrimary)
      {
        dict[i].isPrimary = true;
      }
      this.setState ({
        dict: dict,
      });
      this.props.getState(this.props.data.fieldTitle, dict);
    }

    var selectHandleChange = function(i, j, category, event) {
      var dict = this.state.dict;
      var values = Object.values(dict[i].fieldContents);
      var categories = Object.keys(dict[i].fieldContents);
      if(event.target.value !== "Choose")
        {
        values[j] = event.target.value;
        values = values.slice(0, j+1);
      }
      else{
        values = values.slice(0, j)
      }
      var converter= {};
      for(var k = 0; k<values.length; k++)
      {
        converter[categories[k]] = values[k];
      }
      dict[i].fieldContents=converter;
      this.setState ({
        dict: dict,
      });
      this.props.getState(this.props.data.fieldTitle, dict);
    }

    var data=this.props.data.fieldData;
    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    var values = [];

    for(var i = 0; i < this.state.dict.length; i++)
    {
      values = values.concat([Object.values(this.state.dict[i].fieldContents)]);
    }

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.length)].map((x, i) =>
                <Col xsOffset={1} xs={11} className="elevatorElement" key={i} onChange={this.handleSubmit}>

                  {[...Array(values[i].length+1)].map((x, j) =>
                    ((this.getCategory(i, data, j, values[i])) &&
                      (<Form key={j} inline><FormGroup><ControlLabel>{this.getCategory(i, data, j, values[i])}</ControlLabel>
                        <FormControl className='formcontrol' type='select' componentClass='select' value={values[i][j] ? values[i][j] : "Choose"} onChange={selectHandleChange.bind(this, i, j, this.getCategory(i, data, j, values[i]))}>
                          <option>Choose</option>

                          {[...Array(Object.keys(this.getData(data, j, values[i])).length)].map((x, k) =>
                            <option key={k}>{Object.keys(this.getData(data, j, values[i]))[k]}</option>)}

                      </FormControl></FormGroup></Form>

                    ))

                  )}

                  {(this.state.dict.length > 1) &&
                  (<FormGroup>
                    <Radio inline onChange={handleChange.bind(this, i)} checked={this.state.dict[i].isPrimary}>
                      <p>Primary Entry</p></Radio>
                  </FormGroup>)}
                  </Col>)}
                {(this.props.allowMultiple) && <Button className="plusButton" onClick={this.handleClick}>+</Button>}
            </Panel>
    );
  }
}

export default MultiSelect;
