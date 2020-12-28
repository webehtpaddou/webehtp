import React, { Component } from 'react'
import './connexion.css'

class Connexion extends Component {
  constructor(props){
    super(props)
    this.state={email:"",password:"",check:false}
  }
  componentDidMount(){
    fetch("/csrf/webehtpcsrfprovider").then(response=>response.text()).then(code=>{this.setState({token:code})})
  }
  handleEmailInput=(e)=>{
    this.setState({email: e.target.value})
  }
  handlePasswordInput=(e)=>{
    this.setState({password: e.target.value})
  }
  handleCheckInput=(e)=>{
    this.setState({check: !this.state.check})
  }
  handleSubmit=(e)=>{
    e.preventDefault()
    let formData = new FormData()
    formData.append('_token', this.state.token)
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    fetch("/login",
    {
        body: formData,
        method: "post"
    }).then(body=>{console.log(body.text())})
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
            <button type='submit'>Se connecter</button>
            <a href="/forget" className="forget">Mot de pase oublié?</a>
        </form>
      </div>
    )
  }
}

export default Connexion
