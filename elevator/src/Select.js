import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio, Col } from "react-bootstrap";
import "./App.css";

class Select extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn) {
      this.state = {
        dict: props.fillIn,
      }
    }
    else{
      this.state = {
        dict: [{ "fieldContents": this.props.data.fieldData.selectGroup[0],
                 "isPrimary": false,
               }],
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{"fieldContents": this.props.data.fieldData.selectGroup[0], "isPrimary": false,}]);
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
      var dict2 = this.state.dict2;
      for(var j=0; j<dict2.length; j++)
      {
        dict2[j].isPrimary = false;
      }
      if(!this.state.dict2[i].isPrimary)
      {
        dict2[i].isPrimary = true;
      }
      this.setState ({
        dict2: dict2,
      });
      this.props.getState(this.props.data.fieldTitle, dict2);
    }

    var selectHandleChange = function(i, event) {
      var dict = this.state.dict;
      dict[i].fieldContents=event.target.value;

      this.setState ({
        dict: dict,
      });
      this.props.getState(this.props.data.fieldTitle, dict);
    }

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.length)].map((x, i) =>
                <Col xsOffset={1} xs={11} className="elevatorElement" key={i}>

                  <Form inline>
                    <FormGroup>
                      <ControlLabel>{this.props.data.label}</ControlLabel>
                      <FormControl className='formcontrol' type='select' componentClass='select' value={this.state.dict[i].fieldContents} onChange={selectHandleChange.bind(this, i)}>
                        {[...Array(this.props.data.fieldData.selectGroup.length)].map((x, j) =>
                          <option key={j}>{this.props.data.fieldData.selectGroup[j]}</option>)}
                      </FormControl>
                    </FormGroup>
                  </Form>

                  {(this.state.dict.length > 1) &&
                  (<FormGroup>
                    <Radio inline onChange={handleChange.bind(this, i)} checked={this.state.dict[i].isPrimary}>
                      <p>Primary Entry</p></Radio>
                  </FormGroup>)}
                </Col>
      				)}
            </Panel>
    );
  }
}

export default Select;
