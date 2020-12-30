import React, { Component } from 'react'

class Panier extends Component {
    constructor(props){
        super(props)
        this.state={
            items:[]
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
                return {
                    id:elt.id,
                    nom:elt.article[0].nom,
                    img:elt.article[0].img,
                    prix_unitaire:elt.pu,
                    quantite:elt.quantite,
                    total:elt.quantite*elt.pu
                }
            })
            this.setState({items:temp,total:total})
            
        })
    }
    qteChangem=(e)=>{
        let i=parseInt(e.target.getAttribute("data-index"))
        let temp=this.state.items
        temp[i].quantite=temp[i].quantite>0?temp[i].quantite-1:0
        let old=temp[i].total
        temp[i].total=temp[i].quantite*temp[i].prix_unitaire
        fetch('/panier/change_item/'+temp[i].id+'/s/noir/'+temp[i].quantite)
        this.setState({total:this.state.total+temp[i].total-old})
        this.setState({items:temp})
    }
    qteChangep=(e)=>{
        let i=parseInt(e.target.getAttribute("data-index"))
        let temp=this.state.items
        temp[i].quantite=temp[i].quantite+1
        let old=temp[i].total
        temp[i].total=temp[i].quantite*temp[i].prix_unitaire
        fetch('/panier/change_item/'+temp[i].id+'/s/noir/'+temp[i].quantite)
        this.setState({total:this.state.total+temp[i].total-old})
        this.setState({items:temp})
    }
    qteChange=(e)=>{
        let i=parseInt(e.target.getAttribute("data-index"))
        let temp=this.state.items
        temp[i].quantite=e.target.value
        let old=temp[i].total
        temp[i].total=temp[i].quantite*temp[i].prix_unitaire
        this.setState({total:this.state.total+temp[i].total-old})
        this.setState({items:temp})
    }
    deleteItem=(e)=>{
        let i=parseInt(e.target.getAttribute("data-index"))
        let temp=this.state.items
        fetch('/panier/remove_item/'+temp[i].id)
        temp.splice(i,1)
        this.setState({items:temp})
    }
  render() {
    return (
        <div className="cart-page">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8">
                    <div className="cart-page-inner">
                        <div className="table-responsive">
                            {this.state.items.length===0?
                                <p className="text-muted">Votre panier est vide</p>:
                                <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Produit</th>
                                        <th>Prix</th>
                                        <th>Quantité</th>
                                        <th>Total</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {this.state.items.map((elt,i)=>{return(
                                    <tr key={i}>
                                        <td>
                                            <div className="img">
                                                <a href="#"><img src={elt.img} alt="Image"/></a>
                                                <p>{elt.nom}</p>
                                            </div>
                                        </td>
                                        <td>{elt.prix_unitaire}DH</td>
                                        <td>
                                            <div className="qty">
                                                <button data-index={i} onClick={this.qteChangem} className="btn-minus"><i data-index={i} className="fa fa-minus"></i></button>
                                                <input data-index={i} onChange={this.qteChange} type="text" value={elt.quantite}/>
                                                <button data-index={i} onClick={this.qteChangep} className="btn-plus"><i data-index={i} className="fa fa-plus"></i></button>
                                            </div>
                                        </td>
                                        <td>{elt.total}DH</td>
                                        <td><button data-index={i} onClick={this.deleteItem}><i data-index={i} className="fa fa-trash"></i></button></td>
                                    </tr>  

                                        
                                    )})}
                                    
                                    
                                </tbody>
                            </table>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="cart-page-inner">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="cart-summary">
                                    <div className="cart-content">
                                        <h1>Récapitulatif</h1>
                                        <p>Sub Total<span>{this.state.total}DH</span></p>
                                        <p>Frais de livraison<span>0DH</span></p>
                                        <h2>Grand Total<span>{this.state.total}DH</span></h2>
                                    </div>
                                    <div className="cart-btn">
                                        <button>Mettre à jour le panier</button>
                                        <button>Passer au payement</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default Panier
