import React, { Component } from 'react'
import {Link} from "react-router-dom"

class Produits extends Component {
    constructor(props) {
        super(props)
        this.state={
            products:[]
        }
    }
    componentDidMount(){
        fetch("/products")
        .then(body=>body.json())
        .then(obj=>{this.setState({products:obj})})
    }
    handleTrans=(e)=>{
        let i=e.target.getAttribute("data-index")
        this.props.trans(this.state.products[i])
    }
  render() {
    return (
        <div className="product-view">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        {
                            this.state.products.map((elt,i)=>{
                                return(
                                <div key={i} className="col-md-4">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">{elt.nom}</a>
                                        </div>
                                        <div className="product-image">
                                            <img src={elt.img} alt="Product Image"/>
                                        </div>
                                        <div className="product-price">
                                            <h3>{elt.prix_unitaire}<span>DH</span></h3>
                                            <Link data-index={i} onClick={this.handleTrans} to="/details" className="btn" href="">Details</Link>
                                        </div>
                                    </div>
                                </div>
                            )})
                        }
                    </div>
                </div>           

                <div className="col-lg-4 sidebar">
                    <div className="sidebar-widget category">
                        <h2 className="title">Category</h2>
                        <nav className="navbar bg-light">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><i className="fa fa-female"></i>Fashion et Beauté</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><i className="fa fa-tshirt"></i>Hommes et Femmes</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    
                    <div className="sidebar-widget tag">
                        <h2 className="title">Mots clés</h2>
                        <a href="#">Lorem ipsum</a>
                        <a href="#">Vivamus</a>
                        <a href="#">Phasellus</a>
                        <a href="#">pulvinar</a>
                        <a href="#">Curabitur</a>
                        <a href="#">Fusce</a>
                        <a href="#">Sem quis</a>
                        <a href="#">Mollis metus</a>
                        <a href="#">Sit amet</a>
                        <a href="#">Vel posuere</a>
                        <a href="#">orci luctus</a>
                        <a href="#">Nam lorem</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default Produits
