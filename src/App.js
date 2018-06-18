import React, { Component } from 'react'

import './App.css'

import Header from "./components/Header"
import Connection from "./components/Connection"
import Map from './components/Map'
import Wave from './components/Wave'

import axios from "axios"

import getNewIP from "./api"

class App extends Component {
  
  state = {
    isConnected: false,
    isLoading: false,
    zoomLevel: 15,
    ipInfo: {
      address: null,
      city: null,
      country: null,
      longitude: null,
      latitude: null,
    }
  }

  componentDidMount() {
    const userIPInfoString = localStorage.getItem('userIPInfo')

    if(userIPInfoString === null) {
      this.getIPInfo()
        .then(res => {
          const ipInfo = JSON.stringify(res)
          localStorage.setItem('userIPInfo', ipInfo)
        })
    } else {
      this.setState({
        ipInfo: JSON.parse(userIPInfoString)
      })
    }
  }

  getIPInfo = async(endpoint = "api") => {
    this.setState({
      isLoading: true,
    })

    const { 
      data: {
        ip,
        city,
        country_name,
        longitude,
        latitude,
      }
    }  = await axios.get(`https://json.geoiplookup.io/${endpoint}`)
  
    const ipInfo = {
      address: ip,
      city: city,
      country: country_name,
      longitude: Number(longitude),
      latitude: Number(latitude),
    }

    this.setState({
      isLoading: false,
      ipInfo
    })

    return ipInfo
  }

  changeLocation = async(location) => {
    await this.getIPInfo(getNewIP(location))

    this.setState({
      isConnected: true,
    })
  }

  setConnection = (isConnected) => {
    this.setState({
      isConnected,
      ipInfo: JSON.parse(
        localStorage.getItem('userIPInfo')
      )
    })
  }

  buttonHandler = ({type, value}) => {
    if (type === 'changeLocation') {
      this.changeLocation(value)
    } else if (type === 'disconnect') {
      this.setConnection(false)
    }
  }

  render() {
    const {
      isConnected,
      ipInfo,
      zoomLevel,
      isLoading,
    } = this.state
    
    return (
      <div className="app">
        <Header />
        <main className="site-main">
        {
          !this.state.isLoading
          &&
          <Connection 
            isConnected={isConnected}
            ipInfo={ipInfo}
            buttonHandler={this.buttonHandler}
          />
        }
          
        </main>
        {
          ipInfo.longitude !== null 
          && <Map zoomLevel={zoomLevel}
            location={{
              lat: ipInfo.latitude,
              lng: ipInfo.longitude
            }}
          />
        }
        <Wave 
          isConnected={isConnected}
          isLoading={isLoading}
        />
      </div>
    )
  }
}

export default App
