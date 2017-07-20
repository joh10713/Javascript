import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio } from "react-bootstrap";
import "./App.css";

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dict: { relatedAsset: [{
                              assetType: this.props.options[0],
                              relatedAsset: "",
                              }],
               radio: [true],
               primaryEntry: 0,
             }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict;
    dict.relatedAsset= this.state.dict.relatedAsset.concat([{
                                                      assetType: this.props.options[0],
                                                      relatedAsset: "",
                                                      }]);
    dict.radio= this.state.dict.radio.concat([null]);
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
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

    var selectHandleChange = function(i, event) {
      var dict = this.state.dict;
      dict.relatedAsset[i].assetType=event.target.value;

      this.setState ({
        dict: dict,
      });
      this.props.getState(this.props.data.fieldTitle, dict);
    }

    var handleSubmit = function(i, event) {
      var dict= this.state.dict;
      dict.relatedAsset[i].relatedAsset=event.target.value;

      this.setState ({
        dict: dict,
      })
      this.props.getState(this.props.data.fieldTitle, dict);
    }

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.radio.length)].map((x, i) =>
                <div className="elevatorElement" key={i} >

                  <Form inline>

                    <FormGroup>
                      <ControlLabel>Asset Type</ControlLabel>
                      <FormControl className='formcontrol' type='select' componentClass='select' onChange={selectHandleChange.bind(this, i)}>
                        {[...Array(this.props.options.length)].map((x, j) =>
                          <option key={j}>{this.props.options[j]}</option>)}
                      </FormControl>
                    </FormGroup><Button bsStyle="primary">Create New Asset</Button><br/>

                    <FormGroup>
                      <ControlLabel>{this.props.data.label}</ControlLabel>
                      <FormControl className='formcontrol' type="text" onBlur={handleSubmit.bind(this, i)} placeholder={this.props.data.label} />
                    </FormGroup>
                  </Form>

                  {(this.state.dict.length > 1) &&
                  (<FormGroup>
                    <Radio inline onChange={handleChange.bind(this, i)} checked={this.state.dict[i].isPrimary}>
                      <p>Primary Entry</p></Radio>
                  </FormGroup>)}
                </div>
      				)}
            </Panel>
    );
  }
}

export default Select;
