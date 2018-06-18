import React, { Component } from 'react';
import {TimelineLite} from "gsap/TweenMax"

import './Wave.css'

class Wave extends Component {
  constructor(props) {
    super(props)
    this.animation = new TimelineLite()
  }

  componentDidMount() {
    this.showWave()
  }

  showWave = (duration = 0) => {
    this.animation
      .to(this.circle1, duration, { opacity: 1})
      .to(this.circle2, duration, { opacity: 1})
      .to(this.circle3, duration, { opacity: 1})
  }

  componentDidUpdate(prevProps) {
    if(!this.props.isLoading && this.props.isConnected) {
      this.showWave(.2)
    }

    if(this.props.isLoading && !this.props.isConnected) {
      this.animation
        .to(this.circle3, .2, { opacity: 0})
        .to(this.circle2, .2, { opacity: 0})
        .to(this.circle1, .2, { opacity: 0})
    }
  }
  render() {
    return (
      <div className="wave">
        <svg width="962" height="962" viewBox="0 0 962 962" xmlns="http://www.w3.org/2000/svg">
          <title>
              wave
          </title>
          <g transform="translate(1 1)" fill="#FFF" fillRule="evenodd">
              <circle className="wave__circle3" ref={ node => this.circle3 = node} strokeOpacity=".05" stroke="#FFF" fillOpacity=".02" cx="480" cy="480" r="480"/>
              <circle className="wave__circle2" ref={ node => this.circle2 = node} strokeOpacity=".1" stroke="#FFF" fillOpacity=".04" cx="480" cy="480" r="225"/>
              <circle className="wave__circle1" ref={ node => this.circle1 = node} strokeOpacity=".1" stroke="#FFF" fillOpacity=".04" cx="480" cy="480" r="55"/>
              <circle cx="480" cy="480" r="5"/>
          </g>
        </svg>
      </div>
    )
  }
}

export default Wave
