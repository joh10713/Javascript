import React, { Component } from "react";
import { Button, Panel, FormControl, FormGroup, Form, HelpBlock, ControlLabel, Radio} from "react-bootstrap";
import "./App.css";
var moment = require('moment');

class DateWidget extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn)
    {
      this.state = {
        dateType: ["moment"],
        dict: props.fillIn,
      }
    }
    else {
      this.state = {
        dateType: ["moment"],
        dict: [{ "label": "",
                 "start": {"text": "", "numeric": null},
                 "end": {"text": "", "numeric": null},
                 "isPrimary": false,
              }],
      }
    }

    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    var dateType = this.state.dateType.concat([["moment"]]);
    var dict = this.state.dict.concat([{ "label": "",
                                         "start": {"text": "", "numeric": null},
                                         "end": {"text": "", "numeric": null},
                                         "isPrimary": false,
                                      }]);
    this.props.getState(this.props.data.fieldTitle, dict);
    this.setState ({
      dateType: dateType,
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  getValidationState(value)
  {
    if((!value.text) || (!value))
    {
      return null;
    }
    else if(value.numeric !== "")
    {
      return "success";
    }
    return "error";

  }
  parseDateString(dateString, dict) {
    if(moment(dateString).isValid())
    {
      return dict.start.numeric = moment(dateString).valueOf()/1000;
    }
    else if (dateString.toLowerCase().includes('bc')) {
      var pattern = /[0-9]+/g;
      var matches = dateString.match(pattern);
      if(matches.length>0) {
				var yearsAgo = matches[0];
				if(dateString.toLowerCase().indexOf('century') !== -1) {
					yearsAgo = yearsAgo * 100;
        }
			}
        return (-1 * yearsAgo * 31556952) - (1970*31556952);
    }
    else {
      return "";
    }

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

    var dropdownHandleChange = function(i) {
      var dateType = this.state.dateType;
      if(dateType[i] === "range")
      {
        dateType[i]="moment";
      }
      else {
        dateType[i]="range";
      }
      this.setState ({
        dateType: dateType,
      });
    }

    var handleSubmit = function(i, property, event) {
      var dict = this.state.dict;
      switch(property) {
        case "start" :
          dict[i].start.text = event.target.value;
          dict[i].start.numeric = this.parseDateString(event.target.value, dict[i]);
          break;
        case "end":
          dict[i].end.text=event.target.value;
          dict[i].end.numeric = this.parseDateString(event.target.value, dict[i]);
          break;
        case "label":
          dict[i].label=event.target.value;
          break;
        default:
          console.log("this shouldn't happen")
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
                <div className="elevatorElement" key={i}>
                  <div>

                    <Form inline>

                      <FormGroup>
                        <ControlLabel>Date Type</ControlLabel>
                        <FormControl type='select' className='formcontrol' componentClass='select' onChange={dropdownHandleChange.bind(this, i)}>
                          <option value="moment">Moment</option>
                          <option value="range">Range</option>
                        </FormControl>
                      </FormGroup><br/>

                      <FormGroup validationState={this.getValidationState(this.state.dict[i].start)}>
                        {(this.state.dateType[i]) === "moment" ? <ControlLabel>Date</ControlLabel> : <ControlLabel>Start</ControlLabel>}
                        <FormControl type="text" className='formcontrol' defaultValue={this.state.dict[i].start.text} onBlur={handleSubmit.bind(this, i, "start")} />
                        {(this.getValidationState(this.state.dict[i].start) === 'error') && <HelpBlock>We could not figure out a way to parse this date.</HelpBlock>}
                      </FormGroup><br/>

                      {(this.state.dateType[i] === "range") && (<FormGroup validationState={this.getValidationState(this.state.dict[i].end)}>
                        <ControlLabel>End</ControlLabel>
                        <FormControl type="text" className='formcontrol' defaultValue={this.state.dict[i].end.text} onBlur={handleSubmit.bind(this, i, "end")} placeholder="End" /><br/>
                        {(this.getValidationState(this.state.dict[i].end) === 'error') && <HelpBlock>We could not figure out a way to parse this date.</HelpBlock>}
                      <br/></FormGroup>)}

                      <FormGroup>
                        <p>Label</p>
                        <FormControl type="text" className='formcontrol' defaultValue={this.state.dict[i].label} onBlur={handleSubmit.bind(this, i, "label")} placeholder="Label" />
                      </FormGroup><br/>
                    </Form>
                  </div>


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

export default DateWidget;
