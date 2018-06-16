import React, { Component } from 'react';
import Select from 'react-select'
import axios from "axios";
import './Connection.css';

class Connection extends Component {

  locationOption = [
    { value: "usa", label: "USA - Automatic"},
    { value: "United Kingdom", label: "United Kingdom"},
    { value: "Germany", label: "Germany"},
    { value: "Turkey", label: "Turkey"},
  ]

  state = {
    isLoading: true,
    ipInfo: {
      address: null,
      city: null,
      country: null
    }
  }

  componentDidMount() {
    this.getIPInfo()
  }

  getIPInfo = async() => {
    const { 
      data: {
        ip,
        city,
        country_name
      }
    }  = await axios.get("https://json.geoiplookup.io/api");
  
    // console.log(data)
    this.setState({
      isLoading: false,
      ipInfo: {
        address: ip,
        city: city,
        country: country_name
      }
    })
  }
  handleInputChange = (e) => {
    console.log(e)
  }

  render () {
    const {
      address,
      city,
      country
    } = this.state.ipInfo
    return (
      <div className="connection">
        <p className="connection__status connection__on">YOU'RE NOT PROTECTED</p>
        <div className="connection__ip">
          <h1 className="connection__ip-address">{address}</h1>
          <p className="connection__ip-location">
            Current Location: 
            <span> {city}, {country}</span>
          </p>
        </div>
        <div className="connection__select-location">
          <Select
            className="select-location"
            classNamePrefix="select-location"
            defaultValue={this.locationOption[0]}
            options={this.locationOption}
            onChange={this.handleInputChange}
          />
          <button className="connection__select-location-btn">CONNECT</button>
        </div>
      </div>
    ) 
  }
}


export default Connection;