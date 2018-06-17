import React, { Component } from 'react';
import Select from 'react-select'
import classNames from "classnames";

import './Connection.css';

class Connection extends Component {

  locationOption = [
    { value: "usa", label: "USA - Automatic"},
    { value: "uk", label: "United Kingdom"},
    { value: "germany", label: "Germany"},
    { value: "turkey", label: "Turkey"},
    {value: "china", label: "China" }
  ]

  state = {
    selectedLocation: this.locationOption[0].value,
  }

  handleInputChange = ({ value }) => {
    this.setState({
      selectedLocation: value
    })
  }

  buttonHandler = () => {
    this.props.isConnected ?
      this.props.buttonHandler({
        type: 'disconnect', 
      })
      :
      this.props.buttonHandler({
        type: 'changeLocation', 
        value: this.state.selectedLocation
      })
  } 

  render () {
    const {
      address,
      city,
      country
    } = this.props.ipInfo
    return (
      <div className="connection">
        <p 
          className={classNames(
            'connection__status',
            {
              'connection__on': this.props.isConnected,
              'connection__off': !this.props.isConnected
            }
          )}
        >
          {
            this.props.isConnected 
              ? "YOU'RE PROTECTED"
              : "YOU'RE NOT PROTECTED"
          }
        </p>
        <div className="connection__ip">
          <h1 className="connection__ip-address">{address}</h1>
          <p className="connection__ip-location">
            {
              this.props.isConnected
                ? "Virtual Location: "
                : "Current Location: "
            }
            <span>{city}, {country}</span>
          </p>
        </div>
        <div className="connection__select-location">
          {
            !this.props.isConnected && 
            <Select
              className="select-location"
              classNamePrefix="select-location"
              defaultValue={this.locationOption[0]}
              options={this.locationOption}
              onChange={this.handleInputChange}
            />
          }
          
          <button 
            className="connection__select-location-btn"
            onClick={this.buttonHandler}
            type="button"
          >
            {
              this.props.isConnected
                ? 'DISCONNECT'
                : 'CONNECT'
            }
          </button>
        </div>
      </div>
    ) 
  }
}


export default Connection