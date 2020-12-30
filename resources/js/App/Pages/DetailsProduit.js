import React, { Component } from 'react'

class DetailsProduit extends Component {
    constructor(props){
        super(props)
        this.state={
            product:"",message:"",status:""
        }
    }
    componentDidMount(){
        this.setState({product:this.props.trans()})
    }
    addPanier=(e)=>
    {
        e.preventDefault()
        let temp=this.state.product
        fetch('panier/add_item/'+temp.id+'/s/noir/'+temp.prix_unitaire+'/1')
        .then(body=>body.status)
        .then(msg=>{
            this.setState({status:msg})
            if(msg>=200 && msg<=299)
            this.setState({message:"Produit ajouté au panier avec succés."})
            else this.setState({message:"Erreur."})
        })
    }
  render() {
    return (
        <div className="product-detail">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8">
                    <div className="product-detail-top">
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <div className="product-slider-single normal-slider">
                                    <img src={this.state.product.img} alt="Product Image"/>
                                </div>
                                
                            </div>
                            <div className="col-md-7">
                                <div className="product-content">
                                    <div className="title"><h2>{this.state.product.nom}</h2></div>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <div className="price">
                                        <h4>Prix:</h4>
                                        <p>{this.state.product.prix_unitaire}DH</p>
                                    </div>
                                    <div className="action">
                                        <a className="btn" onClick={this.addPanier} href="#"><i className="fa fa-shopping-cart"></i>Ajouter au panier</a>
                                    </div>
                                    {this.state.status>=200 && this.state.status<=299 ?<p className="text-success">{this.state.message}</p>:<p className="text-danger">{this.state.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row product-detail-bottom">
                        <div className="col-lg-12">
                            <ul className="nav nav-pills nav-justified">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div id="description" className="container tab-pane active">
                                    <h4>Description du produit</h4>
                                    <p>
                                    {this.state.product.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 sidebar">
                    <div className="sidebar-widget category">
                        <h2 className="title">Categorie</h2>
                        <nav className="navbar bg-light">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><i className="fa fa-female"></i>Fashion et Beauté</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><i className="fa fa-tshirt"></i>Hommes et femmes</a>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>
                    
                    
                    
                    <div className="sidebar-widget tag">
                        <h2 className="title">Tags Cloud</h2>
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

export default DetailsProduit
