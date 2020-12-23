import React, { Component } from 'react'
import {Slider,SItem} from "../components/Slider/Slider"
import slider1 from "../components/Slider/Assets/slider1.png"
import slider2 from "../components/Slider/Assets/slider2.png"
import slider3 from "../components/Slider/Assets/slider3.png"
import Item from "../components/Item/Item"
import Product from "../components/Product/Product"
import loader from "../loader.svg"
import "./accueil.css"

class Accueil extends Component {
  constructor(props){
    super(props)
    this.state={loading:true}
  }
  async componentDidMount(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url="https://jsonkeeper.com/b/L9VT"
    const response=await fetch(proxyurl+url)
    const data=await response.json()
    this.setState({items:data,loading:false})
  }
  closeProduct=()=>{
    this.setState({showWindowProduct:false})
  }
  openProduct=()=>{
    this.setState({showWindowProduct:true})
  }
  render() {
    return (
        <div className='accueil'>
            <Slider>
                <SItem bgImage={slider1} id='1'/>
                <SItem bgImage={slider2} id='2'/>
                <SItem bgImage={slider3} id='3'/>
            </Slider>
            <section className="products">
              <h1>Catalogue des produits</h1>
              {this.state.loading?<div className="loader"><img src={loader} alt="loading..."/></div>:this.state.items.map((elt)=>{
                return(<Item key={elt.id} handleClick={this.openProduct} prod_id={elt.id} img={elt.img} name={elt.name} sizes={elt.sizes} price={elt.price}/>)
              })}
              
            </section>
            
            
            {this.state.showWindowProduct?<Product handleClose={this.closeProduct} item={{id:'0000',name:"Nike Air Max for Men",price:200,description:"Men's Running Shoes.",colors:["#ef8bef","#f43542","#ffe55b","#6cf96c"],sizes:[40,41,42,43],imgs:["https://images-na.ssl-images-amazon.com/images/I/81xVii89zLL._AC_UX425_.jpg","https://images-na.ssl-images-amazon.com/images/I/61ZB%2B5gy0zL._AC_UX522_.jpg"]}}/>:""}
        </div>
    )
  }
}

export default Accueil
