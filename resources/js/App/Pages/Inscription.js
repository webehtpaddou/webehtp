import React, { Component } from 'react'
import './inscription.css'
import { Link } from 'react-router-dom'

class Inscription extends Component {
    constructor(props){
        super(props)
        this.state={name:"",email:"",password:"",password_confirmatiom:"",message:{name:[],email:[],password:[],password_confirmatiom:[],other:[""]}}
      }
      componentDidMount(){
        fetch("/csrf/webehtpcsrfprovider").then(response=>response.text()).then(code=>{this.setState({token:code})})
      }
      handleNameInput=(e)=>{
        this.setState({name: e.target.value})
      }
      handleEmailInput=(e)=>{
        this.setState({email: e.target.value})
      }
      handlePasswordInput=(e)=>{
        this.setState({password: e.target.value})
      }
      handleRePasswordInput=(e)=>{
        this.setState({password_confirmatiom: e.target.value})
      }
      handleSubmit=(e)=>{
        e.preventDefault()
        this.setState({message:""})
        let formData1 = new FormData()
        formData1.append('_token', this.state.token)
        formData1.append('name', this.state.name)
        formData1.append('email', this.state.email)
        formData1.append('password', this.state.password)
        formData1.append('password_confirmation', this.state.password_confirmatiom)
        let formData2 = new FormData()
        formData2.append('Accept', "application/json")
        this.setState({message:{name:[],email:[],password:[],password_confirmatiom:[],other:[]}})
        fetch("/register",
        {
          headers:formData2,
          body: formData1,
          method: "post"
        }).then(body=>{this.setState({status:body.status});return body.json()}).then(message=>{
          if(this.state.status===204) location.href="/profile"
          else if(this.state.status==422){
              let msg={name:[],email:[],password:[],password_confirmatiom:[],other:""};
              for(let ch in message.errors){
                  msg[ch]=message.errors[ch]
              }
              this.setState({message:msg})
            }
          else this.setState({message:{name:[],email:[],password:[],password_confirmatiom:[],other:["Un erreur est servenu, veuillez ressayer."]}})
        })
      }
    render() {
        return ( 
            <div onSubmit={this.handleSubmit} className = 'inscription'>
                <form>
                    <h1> Inscription </h1> 
                    <div className = 'signup-dialog' >
                        <label htmlFor = 'name' > Nom </label> 
                        <input onChange={this.handleNameInput} id="name" name ='name'type = 'text' />
                        <ul className="errors">
                            {this.state.message.name.map((error,i)=>{
                                return(
                                    <li key={i}>{error}</li>
                                )
                            })}
                        </ul>
                        <label htmlFor = 'email' > Email </label> 
                        <input onChange={this.handleEmailInput} id="email" name = 'email' type = 'text' />
                        <ul className="errors">
                            {this.state.message.email.map((error,i)=>{
                                return(
                                    <li key={i}>{error}</li>
                                )
                            })}
                        </ul>
                        <label htmlFor = 'password' > Mot de passe </label> 
                        <input onChange={this.handlePasswordInput} id="password" name = 'password' type = 'password' /> 
                        <ul className="errors">
                            {this.state.message.password.map((error,i)=>{
                                return(
                                    <li key={i}>{error}</li>
                                )
                            })}
                        </ul>
                        <label htmlFor = 'password_confirmation' > Confirmer mot de passe </label> 
                        <input onChange={this.handleRePasswordInput} id="password_confirmation" name = 'password_confirmation'type = 'password' /> 
                        <ul className="errors">
                            {this.state.message.password_confirmatiom.map((error,i)=>{
                                return(
                                    <li key={i}>{error}</li>
                                )
                            })}
                        </ul>
                    </div> 
                    <button type = 'submit' > S'inscrire</button> 
                    <p className="errors">{this.state.message.other[0]}</p>
                    <p className = "already" > Avez - vous déjà un compte ? < Link to = '/connexion' > Connectez - vous! </Link></p >
                </form> 
            </div> 
        )
    }
}

export default Inscription
