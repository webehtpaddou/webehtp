import React , { useState, Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Accueil from './Pages/Accueil'
import Authentification from './Pages/Authentification'
import Profile from './Pages/Profile'
import Produits from './Pages/Produits'
import Panier from './Pages/Panier'
import Paiement from './Pages/Paiement'
import DetailsProduit from './Pages/DetailsProduit'
class App extends Component {
  constructor(props){
    super(props)
    this.state={product:{},item:{}}
  }
  f=(p)=>{
    this.setState({product:p})
  }
  g=()=>this.state.product
  f1=(p)=>{
    let temp={id:p.id,nom:p.nom,prix_unitaire:p.prix_unitaire,total:p.prix_unitaire}
    this.setState({item:temp})
  }
  g1=()=>this.state.item
  f2=(p)=>{
    let temp={id:p.id,nom:p.nom,prix_unitaire:p.prix_unitaire,total:p.prix_unitaire}
    this.setState({item:temp})
  }
  g2=()=>this.state.item
  render(){
  return (
      <Router>
        <div>
          <Navbar trans1={this.g1}/>
          <Switch>
            <Route path='/' exact component={Accueil} />
            <Route path='/authentification' component={Authentification} />
            <Route path='/profile' component={Profile} />
            <Route exact path='/produits' component={()=><Produits trans={this.f}/>} />
            <Route path='/details' component={()=><DetailsProduit trans1={this.f1} trans={this.g}/>} />
            <Route path="/panier" component={Panier}/>
            <Route path="/paiement" component={Paiement}/>
          </Switch>
          <div className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Contactez nous</h2>
                            <div className="contact-info">
                                <p><i className="fa fa-map-marker"></i>Ecole Hassania Travaux PublicsKm 7 Route d'El Jadida Casablanca BP 8108 Maroc</p>
                                <p><i className="fa fa-envelope"></i>admin@estore.com</p>
                                <p><i className="fa fa-phone"></i>+2126 00 00 00 00</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Suivez nous</h2>
                            <div className="contact-info">
                                <div className="social">
                                    <a href=""><i className="fab fa-twitter"></i></a>
                                    <a href=""><i className="fab fa-facebook-f"></i></a>
                                    <a href=""><i className="fab fa-linkedin-in"></i></a>
                                    <a href=""><i className="fab fa-instagram"></i></a>
                                    <a href=""><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Information d'entreprise</h2>
                            <ul>
                                <li><a href="#">À propos de nous</a></li>
                                <li><a href="#">Politique de confidentialité</a></li>
                                <li><a href="#">Termes et conditions</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Informations sur l'achat</h2>
                            <ul>
                                <li><a href="#">Politique de paiement</a></li>
                                <li><a href="#">Politique d'expédition</a></li>
                                <li><a href="#">Politique de retour</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
        </div>
      </Router>
  )}
}

export default App;

if(document.getElementById('root')){
  ReactDOM.render(<App/>,document.getElementById('root'))
}