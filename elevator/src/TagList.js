import React, { Component } from "react";
import { Button, Panel, FormGroup, Radio, Col } from "react-bootstrap";
import Tags from "./Tags";
import "./App.css";

class TagList extends Component {
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
        dict: [{ "fieldContents": [],
                  "isPrimary": false,
        }],
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{ "fieldContents": [], "isPrimary": false}]);
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  render() {
    var getTags = function(i, string) {
      var dict= this.state.dict;
      dict[i].fieldContents=string;
      this.setState ({
        dict: dict,
      })
      this.props.getState(this.props.data.fieldTitle, dict);
    }

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

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.length)].map((x, i) =>
                <Col xsOffset={1} xs={11} className="elevatorElement" key={i}>
                  <Tags i={i} getState={getTags.bind(this)} tags={this.state.dict[i].tags} style={{padding: "5px"}}/>

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

export default TagList;
