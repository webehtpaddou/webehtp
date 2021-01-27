import "./admin.css"
import React, { Component } from 'react'

class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            window:""
        }
    }
    openTab=(str)=>{
        this.setState({open:true,window:str})
    }
    closeTab=()=>{
        this.setState({open:false})
    }
  render() {
    return (
      <div className="my-account">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                            <a className="nav-link  active" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab">Commandes</a>
                            <a className="nav-link" id="products-nav" data-toggle="pill" href="#products-tab" role="tab">Produits</a>
                            <a className="nav-link" id="users-nav" data-toggle="pill" href="#users-tab" role="tab">Clients</a>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
                                <button className="btn">Ajouter</button>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Id</th>
                                                <th>Nom</th>
                                                <th>Date</th>
                                                <th>Total</th>
                                                <th>Statut</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Product Name</td>
                                                <td>01 Jan 2020</td>
                                                <td>$99</td>
                                                <td>Approved</td>
                                                <td><button onClick={()=>{this.openTab("commandes")}} className="btn">View</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="products-tab" role="tabpanel" aria-labelledby="products-nav">
                                <button className="btn">Ajouter</button>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Id</th>
                                                <th>Produit</th>
                                                <th>Date d'ajout</th>
                                                <th>Prix</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Product Name</td>
                                                <td>01 Jan 2020</td>
                                                <td>$99</td>
                                                <td><button onClick={()=>{this.openTab("produits")}} className="btn">Modifier</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="users-tab" role="tabpanel" aria-labelledby="users-nav">
                                <button className="btn">Ajouter</button>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Id</th>
                                                <th>Nom</th>
                                                <th>Date de création</th>
                                                <th>Rôle</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Product Name</td>
                                                <td>01 Jan 2020</td>
                                                <td>$99</td>
                                                <td><button onClick={()=>{this.openTab("utilisateurs")}} className="btn">Modifier</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.open?
            <div className="admin update-window">
                <div className="update-tab">
                    <i onClick={this.closeTab} className="fas fa-times"></i>
                    {(()=>{
                        switch(this.state.window){
                            case "commandes": 
                                return <div className="commandes">
                                            <h1>Etat de livraison</h1>
                                            <select defaultValue={'3'} className="custom-select">
                                                <option value="1">Echec</option>
                                                <option value="2">Livré</option>
                                                <option value="3">En attente</option>
                                            </select>
                                            <button className="btn">Supprimer</button>
                                        </div>
                            case "produits": return <div className="commandes">
                                                <label>Nom</label>
                                                <input onChange={this.handleNom} className="form-control" type="text"/>
                                                <label>Prix unitaire</label>
                                                <input onChange={this.handlePrix} className="form-control" type="text"/>
                                                <label>Image</label>
                                                <input onChange={this.handleFile} type="file" className="form-control"/>
                                                <table className="table table-bordered">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>Taille</th>
                                                            <th>Nombre restant</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>43</td>
                                                            <td>21</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table className="table table-bordered">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>Couleur</th>
                                                            <th>Nombre restant</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>43</td>
                                                            <td>21</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button onClick={()=>{this.update("Produits")}} className="btn">Modifier</button>
                                                <button className="btn">Supprimer</button>
                                            </div>
                            case "utilisateurs": 
                            return <div className="commandes">
                                        <h1>Rôle</h1>
                                        <select defaultValue={'2'} className="custom-select">
                                            <option value="1">Administrateur</option>
                                            <option value="2">Client</option>
                                        </select>
                                        <button className="btn">Supprimer</button>
                                    </div>
                        }
                    })()}
                    
                </div>
            </div>:""}
        </div>
    )
  }
}

export default Admin
