import React, { Component } from 'react'
import {Link} from "react-router-dom"
import logo from "./logo.png"

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state={user_authenticated:false,user_name:""}
  }
  componentDidMount=()=>{
    
    fetch("users/is_authenticated")
    .then(response=>response.text())
    .then(bool=>{
      if(bool==='1'){
        this.fetchUser()
        this.setState({user_authenticated:true})
      }
      else{
        console.log(bool)
        this.setState({user_authenticated:false})
      }
    })
    fetch("/csrf/webehtpcsrfprovider")
    .then(response=>response.text())
    .then(code=>{this.setState({token:code})})
  }
  fetchUser(){
    fetch("users/identity")
    .then(response=>response.json())
    .then(data=>{this.setState({user_name:data.name})})
  }
  logout=(e)=>{
    e.preventDefault()
    let formData = new FormData()
    formData.append('_token', this.state.token)
    fetch("/logout",{body:formData,method:"post"}).then(()=>{location.reload()})
  }
  render(){
    
    return (
      <div>
        <div className="nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <a href="#" className="navbar-brand">MENU</a>
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto">
                  <a href="index.html" className="nav-item nav-link active">Accueil</a>
                  <a href="product-list.html" className="nav-item nav-link">Produits</a>
                  <a href="cart.html" className="nav-item nav-link">Panier</a>
                </div>
                {this.state.user_authenticated?
                <div className="navbar-nav ml-auto">
                  <div className="nav-item dropdown">
                    <a href="#" id="user" className="nav-link dropdown-toggle" data-toggle="dropdown">{this.state.user_name}</a>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">Profile</Link>
                      <a href="/logout" onClick={this.logout} className="dropdown-item">Se deconnecter</a>
                    </div>
                  </div>
                </div>
                :
                <div className="navbar-nav ml-auto">
                  <div className="nav-item dropdown">
                    <a href="#" id="user" className="nav-link dropdown-toggle" data-toggle="dropdown">Espace client</a>
                    <div className="dropdown-menu">
                      <Link to="/connexion" className="dropdown-item">Se connecter</Link>
                      <Link to="/inscription" className="dropdown-item">S'inscrire</Link>
                    </div>
                  </div>
                </div>
                }
                
              </div>
            </nav>
          </div>
        </div>
        <div className="bottom-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="logo">
                            <a href="index.html">
                                <img src={logo} alt="Logo"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="search">
                            <input type="text" placeholder="Search"/>
                            <button><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="user">
                            <a href="cart.html" className="btn cart">
                                <i className="fa fa-shopping-cart"></i>
                                <span>(0)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Navbar
