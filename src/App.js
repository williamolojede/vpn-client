import React, { Component } from 'react'
import './App.css'

import Header from "./components/Header"
import Connection from "./components/Connection"
import Map from './components/Map'
import axios from "axios";

import getNewIP from "./api"

class App extends Component {
  
  state = {
    isConnected: false,
    isLoading: false,
    zoomLevel: 15,
    ipInfo: {
      address: null,
      city: null,
      country: null
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
        country_name
      }
    }  = await axios.get(`https://json.geoiplookup.io/${endpoint}`)
  
    const ipInfo = {
      address: ip,
      city: city,
      country: country_name
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
    return (
      <div className="app">
        <Header />
        <main className="site-main">
          <Connection 
            isConnected={this.state.isConnected}
            ipInfo={this.state.ipInfo}
            buttonHandler={this.buttonHandler}
          />
          
        </main>
        <Map zoomLevel={this.state.zoomLevel}/>
      </div>
    )
  }
}

export default App
