import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio } from "react-bootstrap";
import Map from "./InitialMap";
import axios from 'axios';
import "./App.css";

class Location extends Component {
  constructor(props) {
    super(props);
    if(props.fillIn) {
      this.state = {
        dict: props.fillIn,
      }
    }
    else {
      this.state = {
        dict: [
                {
                  "locationLabel": "",
                  "address": "",
                  "loc": {
                    "type": "Point",
                    "coordinates": []
                  },
                  "isPrimary": false
                }
              ],
      }
    }
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([
                                          {
                                            "locationLabel": "",
                                            "address": "",
                                            "loc": {
                                              "type": "Point",
                                              "coordinates": []
                                            },
                                            "isPrimary": false
                                          }
                                        ]);
    this.props.getState(this.props.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.fieldTitle, this.state.dict);
  }


      handleAlertDismiss() {
          this.setState({alertVisible: false});
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
      this.props.getState(this.props.fieldTitle, dict);
    }

    var handleSubmit = function(i, property, event) {
      var dict = this.state.dict;
      switch(property) {
        case "latitude" :
          dict[i].loc.coordinates[0] = parseFloat(event.target.value);
          break;
        case "longitude" :
          dict[i].loc.coordinates[1] = parseFloat(event.target.value);
          break;
        case "label":
          dict[i].locationLabel=event.target.value;
          break;
        case "address":
          dict[i].address=event.target.value;
          break;
        default:
          console.log("this shouldn't happen")
      }
      this.setState ({
        dict: dict,
      });
      this.props.getState(this.props.fieldTitle, dict);
    }

    var searchHandleClick = function(i) {
      var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(this.state.dict[i].address) + "&key=AIzaSyALp7FztjTiGMkWkj7TTcxnKKQSooHsxO0";
      var dict = this.state.dict;
      axios.get(url).then((response) => {
  			dict[i].loc.coordinates= [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng];
        this.setState({
          dict: dict,
        })
        this.props.getState(this.props.fieldTitle, dict);
      })
    }

    var clearHandleClick = function(i, event) {
      var dict = this.state.dict;
      dict[i].loc.coordinates = [44.974156, -93.234200];
      this.setState({
        dict: dict,
      })
      this.props.getState(this.props.fieldTitle, dict);
    }

    var mapHandleClick = function(i, event) {
      var dict = this.state.dict;
      dict[i].loc.coordinates = [event.latLng.lat.apply(), event.latLng.lng.apply()];
      this.setState({
        dict: dict,
      })
      this.props.getState(this.props.fieldTitle, dict);
    }

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.length)].map((x, i) =>
                <div key={i} className="elevatorElement">
                  <div>

                    <Form inline>
                      <FormGroup>
                        <ControlLabel>Latitude</ControlLabel>
                        <FormControl className='formcontrol' onChange={handleSubmit.bind(this, i, "latitude")} type="text" value={this.state.dict[i].loc.coordinates[0]} />
                      </FormGroup><br/>

                      <FormGroup>
                        <ControlLabel>Longitude</ControlLabel>
                        <FormControl className='formcontrol' onChange={handleSubmit.bind(this, i, "longitude")} type="text" value={this.state.dict[i].loc.coordinates[1]} />
                      </FormGroup><br/>

                      <FormGroup>
                        <ControlLabel>Label</ControlLabel>
                        <FormControl className='formcontrol' onBlur={handleSubmit.bind(this, i, "label")} type="text" placeholder="Label" />
                      </FormGroup><br/>

                      <FormGroup>
                        <ControlLabel>Address</ControlLabel>
                        <FormControl className='formcontrol' onBlur={handleSubmit.bind(this, i, "address")} type="text" placeholder="Address" defaultValue={this.state.dict[i].address} />
                      </FormGroup>
                      <Button bsStyle="primary" onClick={searchHandleClick.bind(this, i)}>Search</Button><Button bsStyle='danger' onClick={clearHandleClick.bind(this, i)}>Clear</Button><br/>
                    </Form>
                  </div>

                  <Map
                    style={{padding: "5px"}}
                    mapHandleClick={mapHandleClick.bind(this, i)}
                    getState={this.props.getState}
                    marker={{ lat: parseFloat(this.state.dict[i].loc.coordinates[0], 10), lng: parseFloat(this.state.dict[i].loc.coordinates[1], 10) }}
                    containerElement={<div style={{height: "300px", width: "90%", margin: "0% 0% 0% 5%"}} />}
                    mapElement={<div style={{height: "100%"}} />}
                  />

                  {(this.state.dict.length > 1) &&
                  (<FormGroup controlId={"5"}>
                    <Radio inline onChange={handleChange.bind(this, i)} checked={this.state.dict[i].isPrimary}>
                      <p>Primary Entry</p></Radio>
                  </FormGroup>)}
                </div>
              )}
            </Panel>
    );
  }
}

export default Location;
