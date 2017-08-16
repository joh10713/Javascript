import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio, Col } from "react-bootstrap";
import NestedAsset from './NestedAsset';
import "./App.css";

class RelatedAsset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dict: [{ targetAssetId: null,
               label: null,
               isPrimary: 0,
             }]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{ targetAssetId: null,
                                         label: null,
                                         isPrimary: 0,
                                        }]);
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  addAsset() {
    var windowPointer = window.open("http://10.158.167.153:3000/");
  	windowPointer.onload = function( ){
      console.log(windowPointer);
  	}
  }

  render() {
    var data = {"templateId":"54","templateName":"Related Asset Target","widgetArray":[{"widgetId":2113,"type":"text","allowMultiple":true,"attemptAutocomplete":false,"fieldTitle":"titlefield_1","label":"Title Field","tooltip":"","fieldData":[]},{"widgetId":2114,"type":"upload","allowMultiple":false,"attemptAutocomplete":false,"fieldTitle":"fileattachment_1","label":"File Attachment","tooltip":"","fieldData":{"extractDate":true,"extractLocation":true}}],"collections":{"25":{"Blank Generation":{"28":"fades"}},"20":{"Collection two":{"23":"Test Collection"}},"29":"Date testing","1":"Initial Collection","26":"Lang Center New","24":"Language Center","40":"new test collection","35":"Obama Speeches","27":"really blank","41":"Speeches 2"},"allowedCollections":{"25":"Blank Generation","20":"Collection two","29":"Date testing","28":"fades","1":"Initial Collection","26":"Lang Center New","24":"Language Center","40":"new test collection","35":"Obama Speeches","27":"really blank","41":"Speeches 2","23":"Test Collection"}}

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
              {[...Array(this.state.dict.length)].map((x, i) =>
                <Col xsOffset={1} xs={11} className="elevatorElement" key={i} >

                {(this.props.data.fieldData.displayInline) ? <NestedAsset getState={this.props.getState} data={data} fillIn={{}} nested={true}/> :

                  <Form inline>

                    <FormGroup>
                      <ControlLabel>Asset Type</ControlLabel>
                      <FormControl className='formcontrol' type='select' componentClass='select' onChange={selectHandleChange.bind(this, i)}>
                        {[...Array(this.props.options.length)].map((x, j) =>
                          <option key={j}>{this.props.options[j]}</option>)}
                      </FormControl>
                    </FormGroup><Button bsStyle="primary" onClick={this.addAsset.bind(this)}>Create New Asset</Button><br/>

                    <FormGroup>
                      <ControlLabel>{this.props.data.label}</ControlLabel>
                      <FormControl className='formcontrol' type="text" onBlur={handleSubmit.bind(this, i)} placeholder={this.props.data.label} />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>Label</ControlLabel>
                      <FormControl className='formcontrol' type="text" onBlur={handleSubmit.bind(this, i)} placeholder="Label" />
                    </FormGroup>
                  </Form>
}
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

export default RelatedAsset;
