import "./admin.css"
import React, { Component } from 'react'
class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            window:"",
            selected:0,
            commandes:[],
            produits:[],
            categories:['homme','femme','adulte','enfant','chemise','pantalon','veste','menteau'],
            message:""
        }
    }
    componentDidMount(){
        this.fetchCommandes()
        this.fetchProduits()
        fetch("/csrf/webehtpcsrfprovider").then(response=>response.text()).then(code=>{this.setState({token:code})})
    }
    openTab=(str,i)=>{
        this.setState({open:true,window:str,index:i})
    }
    closeTab=()=>{
        this.setState({open:false})
    }
    fetchCommandes=()=>{
        fetch("/admin/lister_commandes")
        .then((obj)=>obj.json())
        .then((obj)=>{this.setState({commandes:obj});console.log(obj)})
    }
    fetchProduits=()=>{
        fetch("/admin/lister_articles")
        .then((obj)=>obj.json())
        .then((obj)=>{this.setState({produits:obj});console.log(obj)})
    }
    addProduct=()=>{
        let formData1 = new FormData()
        formData1.append('_token', this.state.token)
        formData1.append('nom', document.querySelector("#ajnom").value)
        formData1.append('marque', document.querySelector("#ajmarque").value)
        formData1.append('description', document.querySelector("#ajdescription").value)
        formData1.append('prix_unitaire', document.querySelector("#ajprix_unitaire").value)
        formData1.append('img', document.querySelector("#ajimg").value)
        let ch={[document.querySelector("#ajtaille").children[0].children[0].value.toString()]:{[document.querySelector("#ajtaille").children[1].children[0].value.toString()]:parseInt(document.querySelector("#ajtaille").children[2].children[0].value)}}
        console.log(JSON.stringify(ch))
        formData1.append('tailles',JSON.stringify(ch) )
        this.HandleFilter()
        formData1.append('categories',JSON.stringify(this.state.cat) )
        let formData2 = new FormData()
        formData2.append('Accept', "application/json")
        formData2.append('enctype', "application/json")
        fetch("admin/ajouter_article",
        {
            headers:formData2,
          body: formData1,
          method: "post"
        })
        .then(data=>{this.setState({message:"Article ajouté"})})
    }
    HandleFilter=(type,value)=>{
        if(type==="cat"){
            var cats=document.querySelectorAll(".catFilter")
            var str=[]
            for(let i=0; i<cats.length;i++){
                cats[i].checked?str.push(this.state.categories[i]):""
            }
            this.setState({cat:str})
        }
    }
    changerEtatCommande=()=>{
        
        fetch("/admin/changer_etat_commade/"+this.state.commandes[this.state.index].id+"/"+document.querySelector("#etatcommande").value)
        .then(obj=>obj.text())
        .then(data=>{this.setState({message:"L'état de la commande a été changée avec succés"})})
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
                                            {this.state.commandes.map((item,i)=>
                                                <tr key={i}>
                                                    <td>{item.id}</td>
                                                    <td>{item.client_id[0].nom+" "+item.client_id[0].prenom}</td>
                                                    <td>01 Jan 2020</td>
                                                    <td>{item.prix_total+"DH"}</td>
                                                    <td>{item.etat}</td>
                                                    <td><button onClick={(e)=>{this.openTab("commandes",e.target.getAttribute("data-index"))}} data-index={i} className="btn">View</button></td>
                                                </tr>
                                            )}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="products-tab" role="tabpanel" aria-labelledby="products-nav">
                                <button  onClick={()=>{this.openTab("creerproduits")}} className="btn">Ajouter</button>
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
                                            {this.state.produits.map((item,i)=>
                                                <tr key={i}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nom}</td>
                                                    <td>01 Jan 2020</td>
                                                    <td>{item.prix_unitaire+"DH"}</td>
                                                    <td><button onClick={()=>{this.openTab("produits")}} className="btn">Modifier</button></td>
                                                </tr>
                                            )}
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
                                            <select id="etatcommande" defaultValue={'3'} className="custom-select">
                                                <option value="Echec">Echec</option>
                                                <option value="Livré">Livré</option>
                                                <option value="En attente">En attente</option>
                                            </select>
                                            <a onClick={this.changerEtatCommande} className="btn btn-primary m-1" role="button">
                                                Enregistrer
                                            </a>
                                            <a className="btn btn-primary m-1" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                Afficher articles
                                            </a>
                                            {this.state.message!=""?<p className="text-success">{this.state.message}</p>:""}
                                            <div className="collapse" id="collapseExample">
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>id</th>
                                                            <th>image</th>
                                                            <th>Nom</th>
                                                            <th>Taille</th>
                                                            <th>couleur</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {JSON.parse(this.state.commandes[this.state.index].data).map((item,i)=>
                                                        <tr key={i}>
                                                            <td>{item.id}</td>
                                                            <td><img className="minimg" src={item.article[0].img}/></td>
                                                            <td>{item.article[0].nom}</td>
                                                            <td>{item.taille}</td>
                                                            <td>{item.couleur}</td>
                                                        </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>
                                        </div>
                            case "produits": return <div className="commandes">
                                                <label>Nom</label>
                                                <input id="modifnom" className="form-control" type="text"/>
                                                <label>Prix unitaire</label>
                                                <input onChange={this.handlePrix} className="form-control" type="text"/>
                                                <label>Image</label>
                                                <input onChange={this.handleFile} type="file" className="form-control"/>
                                                <table className="table table-bordered">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>Taille</th>
                                                            <th>Couleur</th>
                                                            <th>Nombre restant</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="number"/></td>
                                                            <td><input type="text"/></td>
                                                            <td><input type="number"/></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button onClick={()=>{this.update("Produits")}} className="btn">Modifier</button>
                                                <button className="btn">Supprimer</button>
                                            </div>
                            case "creerproduits": return <div className="commandes">
                                <label>Nom</label>
                                <input id="ajnom" className="form-control" type="text"/>
                                <label>Marque</label>
                                <input id="ajmarque" className="form-control" type="text"/>
                                <label>Description</label>
                                <input id="ajdescription" className="form-control" type="text"/>
                                <label>Prix unitaire</label>
                                <input id="ajprix_unitaire" className="form-control" type="text"/>
                                <label>Image</label>
                                <input id="ajimg" type="file" className="form-control"/>
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Taille</th>
                                            <th>Couleur</th>
                                            <th>Nombre restant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr id="ajtaille">
                                            <td><input type="text"/></td>
                                            <td><input type="text"/></td>
                                            <td><input type="number"/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <label>Catégories</label>
                                <div className="row">
                                    <div className="col-lg-12">
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
                                </div>
                                <button onClick={()=>{this.addProduct()}} className="btn m-4">Ajouter Produit</button>
                                {this.state.message!=""?<p className="text-success">{this.state.message}</p>:""}
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
