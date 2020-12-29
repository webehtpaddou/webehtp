import React, { Component } from 'react'
import "./Navbar.css"
import basket from "./basket.svg"
import searchbtn from "./search.svg"
import { Link } from 'react-router-dom'
import user from "./user.svg"
import down from "./down.svg"

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
    console.log("idddddddd")
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
        <div className="navbar">
          <Link to='/'><h1 className="logo">Near Shop</h1></Link>
          <div className="navright">
            <form>
              <div className="search">
                <input placeholder="Chercher" type="text"/>
                <div className="search-btn">
                  <img alt='Search button' src={searchbtn}/>
                </div>
              </div>
            </form>
            {this.state.user_authenticated?
              <div className="user-logged1">
                <div className="user-logged">
                  <img className="user-img" src={user} alt="user"/>
                  <span className="name">{this.state.user_name}</span>
                  <span><img className="dropdown" src={down} alt="dropdown"/></span>
                </div>
                <div className="dropdown-menu">
                  <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={this.logout} to="/logout">logout</Link></li>
                  </ul>
                </div>
              </div>:
              <div className="user-not-logged">
                <Link to='/connexion'>Connexion</Link>
                <Link to='/inscription'>Inscription</Link>
              </div>
            }
            
            
            <div className="basket">
              <img alt='Basket' src={basket}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Navbar
