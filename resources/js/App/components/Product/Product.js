import React, { Component } from 'react'
import "./product.css"
import close_btn from "./close.svg"

class Product extends Component {
    constructor(props){
        super(props)
        this.state=this.props.item
        this.state.thumbselected=0
    }
    async componentDidMount(){
        const url="./data.json"
        const response=await fetch(url)
        const data=await response.json()
        this.setState({items:data,loading:false})
      }
    clickColor=(e)=>{
        var colors=document.querySelectorAll(".product .colors")
        colors.forEach((elt)=>{elt.classList.remove("selected")})
        e.target.classList.add("selected")
        this.setState({selectedColor:e.target.getAttribute("data-color")})
    }
    clickSize=(e)=>{
        var colors=document.querySelectorAll(".product .size")
        colors.forEach((elt)=>{elt.classList.remove("selected")})
        e.target.classList.add("selected")
        this.setState({selectedColor:e.target.innerHTML})
    }
    handleImgProduct(e){
        var thumbs=document.querySelectorAll(".product .thumbnail")
        var imgs=document.querySelectorAll(".product .img-product")
        thumbs.forEach((elt)=>{
            elt.classList.remove("selected1")
        })
        var index=e.target.getAttribute("data-index")
        imgs.forEach((elt)=>{
            elt.classList.add("hiddenimg")
        })
        imgs[index].classList.remove("hiddenimg")
        e.target.classList.add("selected1")
    }
  render() {
    return (
      <div className="product-page">
            <div className="product">
                <div className="product-img">
                    <div className="wrapper-thumb">
                        {this.state.imgs.map((url,i)=>{
                            if(i===this.state.thumbselected) return(<div key={i} data-index={i} onClick={this.handleImgProduct} className="thumbnail selected1"></div>)
                            return(<div key={i} data-index={i} onClick={this.handleImgProduct} className="thumbnail"></div>)
                        })}
                    </div>
                    {this.state.imgs.map((url,i)=>{
                        if(i===this.state.thumbselected) return(<img  alt={"ecommerce"} key={i} className="img-product" src={url}/>)
                        return(<img alt={"ecommerce"} key={i} className="img-product hiddenimg" src={url}/>)
                    })}
                </div>
                <div className="product-description">
                <div onClick={this.props.handleClose} className="close-btn" style={{backgroundImage:"url("+close_btn+")"}}></div>
                    <div className="wrapper">
                        <span className="price">{this.state.price} DH</span>
                    </div>
                    <h1 className="title-product">{this.state.name}</h1>
                    <p>{this.state.description}</p>
                    <h3>Color:</h3>
                    <div className="colors-wrap">
                        {this.state.colors.map((color,i)=>{
                            return(<span onClick={this.clickColor} key={i} data-color={color} style={{backgroundColor:color}} className="colors"></span>)
                        })}
                        
                    </div>
                    <h3>Taille:</h3>
                    <div className="size-wrap">
                        {this.state.sizes.map((size,i)=>{
                            return(<span onClick={this.clickSize} key={i} className="size">{size}</span>)
                        })}
                    </div>
                    <div className="purchase">Ajouter au panier</div>
                </div>
            </div>
        </div>
    )
  }
}

export default Product
