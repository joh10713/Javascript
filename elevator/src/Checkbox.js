import React, { Component } from "react";
import { Button, Panel, Checkbox, FormGroup, Radio, Col } from "react-bootstrap";
import "./App.css";

class CheckboxWidget extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn)
    {
      this.state = {
        dict: props.fillIn,
      }
    }
    else {
      this.state = {
        dict: [{ "fieldContents": false,
                  "isPrimary": false,
        }],
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    var dict = this.state.dict.concat([{"fieldContents": false, "isPrimary": false,}]);
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  render() {
    var checkboxHandleChange = function(i) {
      var dict = this.state.dict;
      dict[i].fieldContents = !dict[i].fieldContents;
      this.props.getState(this.props.data.fieldTitle, dict);
      this.setState ({
        dict: dict,
      });
    }//updates state when checkboxes are checked/unchecked

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
    }//updates when a radio button changes which checkbox is the primary checkbox

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.length)].map((x, i) =>
                <Col xsOffset={1} xs={11} key={i} className="elevatorElement">

                  <FormGroup>
                    <Checkbox onChange={checkboxHandleChange.bind(this, i)} checked={this.state.dict[i].fieldContents} inline>{this.props.data.label}</Checkbox>
                  </FormGroup>

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

export default CheckboxWidget;
