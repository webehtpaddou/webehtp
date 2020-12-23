import React, { Component } from 'react'
import './slider.css'
class Slider extends Component {
    constructor(props){
        super(props)
        this.state={selected:0}
    }
  render() {
    return (
        <div style={{position:'relative',paddingTop:"60px"}}>
            <div className='slider'>
                {this.props.children}
            </div>
            <div className='slider-counter'>
            {this.props.children.map((elt,index)=>{
                return(
                <div key={index} >
                    <input checked={this.state.selected===index} onChange={()=>{}} type="radio" id={'s'+index} name='select' value={'s'+index}/>
                    <a onClick={()=>{this.setState({selected:index})}} className='scItem' href={'#slider'+elt.props.id}> </a>
                </div>
                )
            })}
            </div>
        </div>
    )
  }
}
class SItem extends Component {
    getId(){
        return this.props.id
    }
  render() {
    return (
      <div id={'slider'+this.props.id} className='sItem' style={{backgroundImage:'url('+this.props.bgImage+')',backgroundSize:"100% 100%"}}>
          <button className='button'>En savoir plus</button>
      </div>
    )
  }
}
export {Slider,SItem}
