import React, { Component } from 'react'
import {Slider,SItem} from "../components/Slider/Slider"
import slider1 from "../components/Slider/Assets/slider1.png"
import slider2 from "../components/Slider/Assets/slider2.png"
import slider3 from "../components/Slider/Assets/slider3.png"

class Accueil extends Component {
  render() {
    return (
        <div className='accueil'>
            <Slider>
                <SItem bgImage={slider1} id='1'/>
                <SItem bgImage={slider2} id='2'/>
                <SItem bgImage={slider3} id='3'/>
            </Slider>
            <div style={{height:"500px"}}></div>
        </div>
    )
  }
}

export default Accueil
