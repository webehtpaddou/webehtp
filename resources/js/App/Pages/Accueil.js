import React, { Component } from 'react'
import { Slide } from 'react-slideshow-image';
import Item from "../components/Item/Item"
import Product from "../components/Product/Product"
import loader from "../loader.svg"
import 'react-slideshow-image/dist/styles.css'
import "./accueil.css"

class Accueil extends Component {
  constructor(props){
    super(props)
    this.state={loading:true,
      slider:[
        {img:"https://github.com/Flat-Pixels/assets_hosting/blob/master/picture_slides/1.jpg?raw=true",link:"/"},
        {img:"https://github.com/Flat-Pixels/assets_hosting/blob/master/picture_slides/2.jpg?raw=true",link:"/"},
        {img:"https://github.com/Flat-Pixels/assets_hosting/blob/master/picture_slides/3.jpg?raw=true",link:"/"},
      ],
      sliderPropreties:{
        arrows:false,
        easing:"ease",
        transitionDuration:3000
      }
    }
  }
  async componentDidMount(){
    const url="/products"
    const response=await fetch(url)
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
            <Slide {...this.state.sliderPropreties}>
              {this.state.slider.map((item,i)=>{return(
                 <div key={i} className="each-slide">
                   <div style={{'backgroundImage': `url(${item.img})`}}><span></span></div>
               </div>
              )})}
        </Slide>
            <section className="products">
              <h1>Catalogue des produits</h1>
              {this.state.loading?<div className="loader"><img src={loader} alt="loading..."/></div>:this.state.items.map((elt)=>{
                return(<Item key={elt.id} handleClick={this.openProduct} prod_id={elt.id} img={elt.img} name={elt.nom} price={elt.prix_unitaire}/>)
              })}
              
            </section>
            
            
            {this.state.showWindowProduct?<Product handleClose={this.closeProduct} item={{id:'0000',name:"Nike Air Max for Men",price:200,description:"Men's Running Shoes.",colors:["#ef8bef","#f43542","#ffe55b","#6cf96c"],sizes:[40,41,42,43],imgs:["https://images-na.ssl-images-amazon.com/images/I/81xVii89zLL._AC_UX425_.jpg","https://images-na.ssl-images-amazon.com/images/I/61ZB%2B5gy0zL._AC_UX522_.jpg"]}}/>:""}
        </div>
    )
  }
}

export default Accueil
