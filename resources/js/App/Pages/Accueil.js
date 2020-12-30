import React, { Component } from 'react'
import {  Lin k } from "react-router-dom"

class Accueil extends Component {
      constructor(prop s) {
            super(props)
            this.s t a
            te = { 
                  l o{ading: true,
                               img: "https://imgupload.io/images/2020/12/29/slider-1.jpg",
                               text: ""
                        },
                        {
                               img: "https://imgupload.io/images/2020/12/29/slider-3.jpg",
                               text: ""
                        },
                        {
                               img: "https://imgupload.io/images/2020/12/29/slider-2.jpg",
                               text: ""
                 
                   }
                  ], {
                               id: 0,
                               name: "",
                               img: "https://imgupload.io/images/2020/12/29/product-1.jpg",
                               price: 100
                        },
                        {
                               id: 1,
                               name: "",
                               img: "https://imgupload.io/images/2020/12/29/product-2.jpg",
                               price: 100
                        },
                        {
                               id: 2,
                               name: "",
                               img: "https://imgupload.io/images/2020/12/29/product-3.jpg",
                               price: 100
                        },
                        {
                               id: 3,
                               name: "",
                               img: "https://imgupload.io/images/2020/12/29/product-4.jpg",
                               price: 100
                        },
                        {
                               id: 4,
                               name: "",
                               img: "https://imgupload.io/images/2020/12/29/product-5.jpg",
                               price: 100
                        },
                  ]
            }
      }
      async componentDidMount () {
            const   url = "/products"
            const resp o nse = await fetch(url)
            const  d ata = await response.json()
            this.setSta te({ i tems:  data, l oadin g: false })
      }
      closeProdu c t  =  () => {
            this.setSta te({ showWindowPro duct:  false })
      }
      openProdu c t  =  () => {
            this.setSta te({ showWindowPro duct : true })
      }
      render() {
            retu <rn ( <
               div classN a me = 'acc ueil' >
             
               <   
            d
            iv className  =  "header" > 
            <
        <   
            div className = "container-fluid" >
            <
    <   
            <
div classNam = "row" >    {
   
                    return ( <
 <     div key = { i }
  div className = "col8   
                 <<
               
                          
            div classNam<
e = "hea                er-slider nor m al-slider" > { 
                this.sta<
te.slider.ma            ( ( e lt, i) = >   { <
        return ( <  
                                  
                        <
   div key              /div> <
          clas          /div>
              <
                })
        im  grc = { elt.img }
                        alt = "Slider Image" / >
            <
             <
               di <v className = "header-slider-caption" >
               <   
            <
             > { elt.text   } < /p> < 
            <
        a clssName = "btn "  
            <
    href = " > < i  c lassName = "fa fa-shopping-cart" > < /i>Shop Now</a > 
            <
    <  
            href = "" >
/div> <
            p > < /p> <
    /div> <
             <
               
           }<
   
<
  
            href<="">

            p/>d<i/p>v<
> < <
            /div>/<
div> < <
            /div> <
div classNam = "c <ol-md-4" >
    < <
        div lassN
ame = "header-img" >
            <
               img src =  " https://i mgupload.io/images/2020/12/29/category-1.jpg" / >
            <
               
            <
        a clssName = "img - text" 
            <
   href = "  >   
            <
<   
            <
p > < /p> <      <
                  <
> < 
lassName = "-item" >  <
 <
     img srctps:/ </imgupload.io/images/2020/12/29/category-2.jpg" / >
          < <
            me = "img-tex t " 
            <
href = "" >   
        <<
      <
           p     <
             
             <
             <
             <
             <
               
            <
/div>   
<
      <
                   <
            f eature" >
                   <
            /p>d<
iv classNamecdivn <tainer-fluid" >
            /div><<
  <
            Name  <= "row align-items-center" >
            

            dassName = "col-lg-4 col-md-12 feature-col" >
               <   
            i
             className =  " fab fa-cc-masterc ard" > < /i> <
            <
h2 >        100 % sécuris é  < /h2> < 
            <
p >       
            <
Toutes les tan s action se p assent d 'une manière 100% sécurisée   <<
             <
               
            <
/div> <       <
            /div>d<
iv clas     Name  <= "col-lg-4 col-md-12 feature-col" >
             <
            iv className = "feature-content" >

             
               h2 > Parto u t dans le mo nde < /h2> <
            p
             >   
            <
Nous        livrons tous  n os pr oduits dans la plupart des pays du monde <
            <
/p> <       
            <
/div> <     <
             <
            Name = "col-l g -4 col-md- 12 feature-col" >
            <
<   
            <
div classNamfeature-content" >  
               
            <
<     <
            /div>i<
 className   "fa  <fa-comments" > < /i> <
             7 Su <pport < /h2> <
             <
            otre support est disponible 24 h / 24 7 j / 7 <

             > <
               /div> <   
            /
            div> <   
            <
/div         <   
            <
/div>       
<
   
            <
<   
            <
div classNam-to-act i on" >
               
            <
< <
            container-flu i d" > 
    <<
     <
sName = "rowal i gn-items-c e nter <" >
 
e = "col-md-6" > <
 <
 Pour plus d'info <rmations, appelez nous sur :</h1> <
/div> < <
    div clasName  <= "col-md-6" >
    <   
            <
a href = "te:+21250000000 0 " > +2125 00 00 00 0 0 < /a> <
        /div<
> <   
    /div> <<
  
               
        /div<
> < <
>   
<
     <
     <
sName = "newl etter" >
  <
sName = "conain <er-fluid" >
 <
div classNam = "r <ow" >
    < <
    div clasName = "col-m d -6" > 
            <
<   
        h1 ><
 Subscribe Or Newsletter  <  /h1> < 
    /div> <<
  
               
        div <
className = col-m <d-6" >
   
    div clas<
sName = "for"  >    <
     <
adOnly type   "email"
r email here" / > <
 <
         but/div>t<
on > Submit  /but <ton> <
/div> < <
    /div> < <
        /div < <
            div>  <<
               /div>
)
              div className = "review" >
            <
            div className = "container-fluid" >
            <            div className = "row align-items-center review-slider normal-slider" >
            <
            div className = "col-md-6" >
            <
            div className = "review-slider-item" >
            <
            div className = "review-img" >
            <
            img src = "https://imgupload.io/images/2020/12/29/review-1.jpg"
            alt = "Image" / >
            <
            /div> <
            div className = "review-text" >
            <
            h2 > Morgana < /h2> <
            h3 > Professeur < /h3> <
            p >
            Les produits sont de bonnes qualité <
            /p> <
            /div> <
            /div> <
            /div> <
            div className = "col-md-6" >
            <
            div className = "review-slider-item" >
            <
            div className = "review-img" >
            <
            img src = "https://imgupload.io/images/2020/12/29/review-2.jpg"
            alt = "Image" / >
            <
            /div> <
            div className = "review-text" >
            <
            h2 > Ezreal < /h2> <
            h3 > Banquier < /h3> <
            p >
            J 'ai bien reçu ma commande dans un temps exceptionnel, je recommande bien cette application. <
            /p> <
            /div> <
            /div> <
            /div> <
            div className = "col-md-6" >
            <
            div className = "review-slider-item" >
            <
            div className = "review-img" >
            <
            img src = "https://imgupload.io/images/2020/12/29/review-3.jpg"
            alt = "Image" / >
            <
            /div> <
            div className = "review-text" >
            <
            h2 > Fiora < /h2> <
            h3 > Comptable < /h3> <
            p >
            Articles à la hauteur des ambitions, je recommande cette plateforme. <
            /p> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div>
        )
    }
}

export default Accueil