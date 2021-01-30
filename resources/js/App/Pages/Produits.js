import React, { Component } from 'react'
import {Link} from "react-router-dom"

class Produits extends Component {
    constructor(props) {
        super(props)
        this.state={
            products:[],selected:0,loaded:false,filter:false,cat:"",price:"",tailles:"",
            categories:['homme','femme','adulte','enfant','chemise','pantalon','veste','monteau']
        }
    }
    splitInPages(arr,n){
        let res=[]
        while(arr.length>0){
            res.push(arr.splice(0,n))
        }
        return res
    }
    componentDidMount(){
        fetch("/products")
        .then(body=>body.json())
        .then(obj=>{
            this.setState({products:this.splitInPages(obj,12),loaded:true})}
            )
    }
    changePage=(e)=>{
        let c=e.target.innerHTML
        if(c=="Précédent"){
            if(this.state.selected>=1)
                this.setState({selected:this.state.selected-1})
        }
        else if(c=="Suivant"){
            if(this.state.selected<=this.state.products.length-2)
                this.setState({selected:this.state.selected+1})
        }
        else if(this.state.selected!=parseInt(c)-1) this.setState({selected:parseInt(c)-1})
    }
    handleTrans=(e)=>{
        let i=e.target.getAttribute("data-index")
        console.log(i)
        console.log(this.state.products)
        this.props.trans(this.state.products[this.state.selected][i])
    }
    HandleFilter=(type,value)=>{
        if(type==="cat"){
            var cats=document.querySelectorAll(".catFilter")
            var str=""
            for(let i=0; i<cats.length;i++){
                let ch=cats[i].checked?this.state.categories[i]+"-":""
                str=str+ch
            }
            if(str){
                str=str.split('-')
                str.splice(-1,1)
                str=str.join("-")
                console.log(str)
            }
            this.setState({cat:str,filter:true})
            this.fetchFilter()
        }
    }
    fetchFilter=()=>{
        fetch("/products/"+this.state.cat+"/0-2000/0-50")
            .then(body=>body.json())
            .then(obj=>{
                this.setState({products:this.splitInPages(obj,12),loaded:true})}
                )
    }
  render() {
    return (
        <div className="product-view">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8">
                <a className="btn btn-primary m-1" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Filtres
                </a>
                <div className="collapse" id="collapseExample">
                    <div className="card card-body m-1">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","1")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck1"/>
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Homme
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","2")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck2"/>
                                    <label className="form-check-label" htmlFor="defaultCheck2">
                                        Femme
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","3")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck3"/>
                                    <label className="form-check-label" htmlFor="defaultCheck3">
                                        Adulte
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","4")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck4"/>
                                    <label className="form-check-label" htmlFor="defaultCheck4">
                                        Enfant
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","5")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck5"/>
                                    <label className="form-check-label" htmlFor="defaultCheck5">
                                        Chemise
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","6")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck6"/>
                                    <label className="form-check-label" htmlFor="defaultCheck6">
                                        Pantalon
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","7")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck7"/>
                                    <label className="form-check-label" htmlFor="defaultCheck7">
                                        Veste
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input onChange={()=>{this.HandleFilter("cat","8")}} className="form-check-input catFilter" type="checkbox" value="" id="defaultCheck8"/>
                                    <label className="form-check-label" htmlFor="defaultCheck8">
                                        Menteau
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <p>Prix</p>
                                <input type="number"/><span>  -   </span><input type="number"/>
                            </div>
                            <div className="col-lg-3">
                                <p>Tailles</p>
                                <input type="number"/><span>  -   </span><input type="number"/>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row">
                        {
                            this.state.loaded?this.state.products[this.state.selected].map((elt,i)=>{
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
                            )}):"loading..."
                        }
                    </div>
                    <div className="col-md-12">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={this.state.selected===0?"page-item hidepg":"page-item"}>
                                    <a onClick={this.changePage} className="page-link" href="#" tabIndex="-1">Précédent</a>
                                </li>
                                {this.state.products.map((e,i)=>
                                    <li key={i} className={this.state.selected===i?"page-item active":"page-item"}><a onClick={this.changePage} className="page-link" href="#">{i+1}</a></li>
                                )}
                                <li className={this.state.selected===this.state.products.length-1?"page-item hidepg":"page-item"}>
                                    <a onClick={this.changePage} className="page-link" href="#">Suivant</a>
                                </li>
                            </ul>
                        </nav>
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
