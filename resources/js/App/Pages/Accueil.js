import React, { Component } from 'react'

class Accueil extends Component {
  constructor(props){
    super(props)
    this.state={loading:true,
      slider:[
        {
          img:"https://imgupload.io/images/2020/12/29/slider-1.jpg",
          text:""
        },
        {
          img:"https://imgupload.io/images/2020/12/29/slider-3.jpg",
          text:""
        },
        {
          img:"https://imgupload.io/images/2020/12/29/slider-2.jpg",
          text:""
        }],
      best_sales:[
        {
          id:0,
          name:"",
          img:"https://imgupload.io/images/2020/12/29/product-1.jpg",
          price:100
        },
        {
          id:1,
          name:"",
          img:"https://imgupload.io/images/2020/12/29/product-2.jpg",
          price:100
        },
        {
          id:2,
          name:"",
          img:"https://imgupload.io/images/2020/12/29/product-3.jpg",
          price:100
        },
        {
          id:3,
          name:"",
          img:"https://imgupload.io/images/2020/12/29/product-4.jpg",
          price:100
        },
        {
          id:4,
          name:"",
          img:"https://imgupload.io/images/2020/12/29/product-5.jpg",
          price:100
        },
      ]
    }
  }
  async componentDidMount(){
    const url="/products"
    const response=await fetch(url)
    const data=await response.json()
    this.setState({items:data,loading:false})
  }
  closeProduct=()=>{
    this.setState({showWindowProduct:false})
  }
  openProduct=()=>{
    this.setState({showWindowProduct:true})
  }
  render() {
    return (
        <div className='accueil'>
        <div className="header">
            <div className="container-fluid">
                <div className="row">
                    
                    <div className="col-md-8">
                        <div className="header-slider normal-slider">
                          {this.state.slider.map((elt,i)=>{
                              return(
                                <div key={i} className="header-slider-item">
                                <img src={elt.img} alt="Slider Image" />
                                <div className="header-slider-caption">
                                    <p>{elt.text}</p>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Shop Now</a>
                                </div>
                            </div>
                              )
                          })}
                            
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="header-img">
                            <div className="img-item">
                                <img src="https://imgupload.io/images/2020/12/29/category-1.jpg" />
                                <a className="img-text" href="">
                                    <p></p>
                                </a>
                            </div>
                            <div className="img-item">
                                <img src="https://imgupload.io/images/2020/12/29/category-2.jpg" />
                                <a className="img-text" href="">
                                    <p></p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="feature">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12 feature-col">
                        <div className="feature-content">
                            <i className="fab fa-cc-mastercard"></i>
                            <h2>100% sécurisé</h2>
                            <p>
                                Tous les transaction se passent d'une manière 100% sécurisée 
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 feature-col">
                        <div className="feature-content">
                            <i className="fa fa-truck"></i>
                            <h2>Partout dans le monde</h2>
                            <p>
                                Nous livrons tous nos produits dans la plupart des pays du monde
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 feature-col">
                        <div className="feature-content">
                            <i className="fa fa-comments"></i>
                            <h2>24/7 Support</h2>
                            <p>
                                Notre support est disponible 24h/24 7j/7
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="call-to-action">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1>Pour plus d'informations, appelez nous sur :</h1>
                    </div>
                    <div className="col-md-6">
                        <a href="tel:+212500000000">+2125 00 00 00 00</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="newsletter">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Subscribe Our Newsletter</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="form">
                            <input readOnly type="email" value="Your email here"/>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="review">
            <div className="container-fluid">
                <div className="row align-items-center review-slider normal-slider">
                    <div className="col-md-6">
                        <div className="review-slider-item">
                            <div className="review-img">
                                <img src="https://imgupload.io/images/2020/12/29/review-1.jpg" alt="Image"/>
                            </div>
                            <div className="review-text">
                                <h2>Morgana</h2>
                                <h3>Professeur</h3>
                                <p>
                                    Les produits sont de bonnes qualité
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="review-slider-item">
                            <div className="review-img">
                                <img src="https://imgupload.io/images/2020/12/29/review-2.jpg" alt="Image"/>
                            </div>
                            <div className="review-text">
                                <h2>Ezreal</h2>
                                <h3>Banquier</h3>
                                <p>
                                    J'ai bien reçu ma commande dans un temps exceptionnel, je recommande bien cette application.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="review-slider-item">
                            <div className="review-img">
                                <img src="https://imgupload.io/images/2020/12/29/review-3.jpg" alt="Image"/>
                            </div>
                            <div className="review-text">
                                <h2>Fiora</h2>
                                <h3>Comptable</h3>
                                <p>
                                    Articles à la hauteur des ambitions, je recommande cette plateforme.
                                </p>
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

export default Accueil
