import React, { Component } from 'react'
import "./Navbar.css"
import basket from "./basket.svg"
import searchbtn from "./search.svg"
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
        <div className="navbar">
          <Link to='/'><h1 className="logo">Near Shop</h1></Link>
          <div className="navright">
            <form>
              <div className="search">
                <input placeholder="Chercher" type="text"/>
                <div className="search-btn">
                  <img alt='Search button' src={searchbtn}></img>
                </div>
              </div>
            </form>
            <Link to='/connexion'>Connexion</Link>
            <Link to='/inscription'>Inscription</Link>
            <div className="basket">
              <img alt='Basket' src={basket}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Navbar
