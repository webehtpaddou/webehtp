import React, { Component } from 'react'
import './connexion.css'

class Connexion extends Component {
  constructor(props){
    super(props)
    this.state={email:"",password:"",check:false,message:""}
  }
  componentDidMount(){
    fetch("/csrf/webehtpcsrfprovider").then(response=>response.text()).then(code=>{this.setState({token:code})})
  }
  handleEmailInput=(e)=>{
    this.setState({email: e.target.value})
    this.setState({message:""})
  }
  handlePasswordInput=(e)=>{
    this.setState({password: e.target.value})
    this.setState({message:""})
  }
  handleCheckInput=(e)=>{
    this.setState({check: !this.state.check})
  }
  handleSubmit=(e)=>{
    e.preventDefault()
    this.setState({message:""})
    let formData1 = new FormData()
    formData1.append('_token', this.state.token)
    formData1.append('email', this.state.email)
    formData1.append('password', this.state.password)
    let formData2 = new FormData()
    formData2.append('Accept', "application/json")
    fetch("/login",
    {
      headers:formData2,
      body: formData1,
      method: "post"
    }).then(body=>body.status).then(status=>{
      if(status===204) location.href="/"
      else if(status==422) this.setState({message:"Email et/ou mot de passe sont incorrects, veuillez ressayer."})
      else this.setState({message:"Un erreur est servenu, veuillez ressayer."})
    })
  }
  render() {
    return (
      <div onSubmit={this.handleSubmit} className='connexion'>
        <form>
            <h1>Connexion</h1>
            <div className='signin-dialog'>
                <label htmlFor='email'>Email</label>
                <input onChange={this.handleEmailInput} name='email' value={this.state.email} type='text'></input>
                <label htmlFor='password'>Mot de passe</label>
                <input onChange={this.handlePasswordInput} name='password' value={this.state.password} type='password'></input>
                <div className="remember">
                  <input onChange={this.handleCheckInput} type="checkbox" checked={this.state.check} name="remember" id="remember"/>
                  <label htmlFor='remember'>Rester connecté</label>
                </div>
            </div>
            <p className="message">{this.state.message}</p>
            <button type='submit'>Se connecter</button>
            <a href="/forget" className="forget">Mot de pase oublié?</a>
        </form>
      </div>
    )
  }
}

export default Connexion
