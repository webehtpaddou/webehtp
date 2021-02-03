import React, { Component } from 'react'

class Paiement extends Component {
    constructor(props){
        super(props)
        this.state={
            nom:"",
            prenom:"",
            email:"",
            tel:"",
            adresse:"",
            pays:"ma",
            ville:"",
            message:""
        }
    }
    componentDidMount(){
        fetch('/panier/list_items/')
        .then(body=>body.json())
        .then(rep=>{
            console.log(rep)
            let total=0
            let temp=rep.map((elt)=>{
                total=total+elt.quantite*elt.pu
            })
            this.setState({total:total})
            
        })
        fetch("/csrf/webehtpcsrfprovider").then(response=>response.text()).then(code=>{this.setState({token:code})})
    }
    handleNom=(e)=>{
        this.setState({nom:e.target.value})
    }
    handlePrenom=(e)=>{
        this.setState({prenom:e.target.value})
    }
    handleEmail=(e)=>{
        this.setState({email:e.target.value})
    }
    handleTel=(e)=>{
        this.setState({tel:e.target.value})
    }
    handleAdresse=(e)=>{
        this.setState({adresse:e.target.value})
    }
    handlePays=(e)=>{
        this.setState({pays:e.target.value})
    }
    handleVille=(e)=>{
        this.setState({ville:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('_token', this.state.token)
        formData.append('nom', this.state.nom)
        formData.append('prenom', this.state.prenom)
        formData.append('email', this.state.email)
        formData.append('tel', this.state.tel)
        formData.append('adresse', this.state.adresse)
        formData.append('pays', this.state.pays)
        formData.append('ville', this.state.ville)
        fetch('/commande',{body:formData,method:"post"})
        .then(body=>body.text())
        .then(msg=>{
            if(msg==="commande enregistrée avec succès!!!") this.setState({message:msg})
            else this.setState({message:"Un erreur est servenu, Veuillez ressayer"})
        })
    }
  render() {
    return (
        <form onSubmit={this.handleSubmit} className="checkout">
        <div className="container-fluid"> 
            <div className="row">
                <div className="col-lg-8">
                    <div className="checkout-inner">
                        <div className="billing-address">
                            <h2>Adresse de facturation</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Nom</label>
                                    <input onChange={this.handleNom} className="form-control" type="text" placeholder="Nom"/>
                                </div>
                                <div className="col-md-6">
                                    <label>Prénom</label>
                                    <input onChange={this.handlePrenom} className="form-control" type="text" placeholder="Prénom"/>
                                </div>
                                <div className="col-md-6">
                                    <label>E-mail</label>
                                    <input onChange={this.handleEmail} className="form-control" type="text" placeholder="E-mail"/>
                                </div>
                                <div className="col-md-6">
                                    <label>N° téléphone</label>
                                    <input onChange={this.handleTel} className="form-control" type="text" placeholder="N° téléphone"/>
                                </div>
                                <div className="col-md-12">
                                    <label>Adresse</label>
                                    <input onChange={this.handleAdresse} className="form-control" type="text" placeholder="Adresse"/>
                                </div>
                                <div className="col-md-6">
                                    <label>Pays</label>
                                    <select defaultValue={'ma'} onChange={this.handlePays} className="custom-select">
                                        <option value='ma'>Maroc</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Ville</label>
                                    <input onChange={this.handleVille} className="form-control" type="text" placeholder="Ville"/>
                                </div>
                                    {this.state.message==="commande enregistrée avec succès!!!"?<p className="text-success">Commande enregistrée avec succès!</p>:<p className="text-danger">{this.state.message}</p>}
                                    
                                
                            </div>
                        </div>

                        <div className="shipping-address">
                            <h2>Shipping Address</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>First Name</label>
                                    <input className="form-control" type="text" placeholder="First Name"/>
                                </div>
                                <div className="col-md-6">
                                    <label>Last Name"</label>
                                    <input className="form-control" type="text" placeholder="Last Name"/>
                                </div>
                                <div className="col-md-6">
                                    <label>E-mail</label>
                                    <input className="form-control" type="text" placeholder="E-mail"/>
                                </div>
                                <div className="col-md-6">
                                    <label>Mobile No</label>
                                    <input className="form-control" type="text" placeholder="Mobile No"/>
                                </div>
                                <div className="col-md-12">
                                    <label>Address</label>
                                    <input className="form-control" type="text" placeholder="Address"/>
                                </div>
                                <div className="col-md-6">
                                    <label>Country</label>
                                    <select className="custom-select">
                                        <option >United States</option>
                                        <option>Afghanistan</option>
                                        <option>Albania</option>
                                        <option>Algeria</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>City</label>
                                    <input className="form-control" type="text" placeholder="City"/>
                                </div>
                                <div className="col-md-6">
                                    <label>State</label>
                                    <input className="form-control" type="text" placeholder="State"/>
                                </div>
                                <div className="col-md-6">
                                    <label>ZIP Code</label>
                                    <input className="form-control" type="text" placeholder="ZIP Code"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="checkout-inner">
                        <div className="checkout-summary">
                            <h1>Récapitulatif</h1>
                            <p className="sub-total">Sub Total<span>{this.state.total}DH</span></p>
                            <p className="ship-cost">Frais de livraison<span>0DH</span></p>
                            <h2>Grand Total<span>{this.state.total}DH</span></h2>
                        </div>

                        <div className="checkout-payment">
                            <div className="payment-methods">
                                <h1>Méthode de paiement</h1>
                                
                                <div className="payment-method">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="payment-5" name="payment"/>
                                        <label className="custom-control-label" htmlFor="payment-5">Cash on Delivery</label>
                                    </div>
                                    <div className="payment-content" id="payment-5-show">
                                        <p>
                                            Après avoir revu votre commande avec notre livreur, vous aurez la possibilité de payer en espèce. Si vous n’êtes pas satisfait(e) de votre commande, vous avez toujours la possibilité de la rendre à notre livreur sans payer 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-btn">
                                <button type="submit">Commander</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    )
  }
}

export default Paiement
