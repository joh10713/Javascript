/*Use TinyMCE*/

import React, { Component } from "react";
import { Button, Panel, Radio, FormGroup } from "react-bootstrap";
import TinyMCE from "react-tinymce";
import "./App.css";

class TextArea extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn){
      this.state = {
        dict: props.fillIn,
      }
    }
    else {
      this.state = {
        dict: [{ "fieldContents": "<p>This is the initial contents of the editor",
                 "isPrimary": false,
               }],
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{"fieldContents": "<p>This is the initial contents of the editor", "isPrimary": false,}]);
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  handleEditorChange(i, e) {
    var dict= this.state.dict;
    dict[i].fieldContents = e.target.getContent();
    this.setState ({
      dict: dict,
    });
    this.props.getState(this.props.data.fieldTitle, dict);
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

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (
      <Panel header={header} footer={footer}>
                {[...Array(this.state.dict.length)].map((x, i) =>
                  <div className="elevatorElement" key={i}>
                    <TinyMCE
                      content={this.state.dict[i].fieldContents}
                      config={{
                        plugins: 'autolink link image lists print preview',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                      }}
                      passive={true}
                      onBlur={this.handleEditorChange.bind(this, i)}
                    />
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

export default TextArea;
