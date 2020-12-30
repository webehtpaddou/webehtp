import React, { Component } from 'react'

class Authentification extends Component {
    constructor(props){
        super(props)
        this.state={
            register:{name:"",email:"",password:"",password_confirmation:""},
            login:{email:"",password:"",check:false,message:""},
            r_message:{name:[],email:[],password:[],password_confirmation:[],other:""},
            l_message:""
        }
      }
      componentDidMount(){
        fetch("/csrf/webehtpcsrfprovider").then(response=>response.text()).then(code=>{this.setState({token:code})})
      }
      handleNameInput=(e)=>{
          let temp=this.state.register
          temp.name=e.target.value
        this.setState({register: temp})
      }
      handleEmailInput=(e)=>{
        let temp=this.state.register
          temp.email=e.target.value
        this.setState({register: temp})
      }
      handlePasswordInput=(e)=>{
        let temp=this.state.register
          temp.password=e.target.value
        this.setState({register: temp})
      }
      handleRePasswordInput=(e)=>{
        let temp=this.state.register
          temp.password_confirmation=e.target.value
        this.setState({register: temp})
      }
      handleEmailInput1=(e)=>{
        let temp=this.state.login
          temp.email=e.target.value
        this.setState({login: temp})
      }
      handlePasswordInput1=(e)=>{
        let temp=this.state.login
          temp.password=e.target.value
        this.setState({login: temp})
      }
      handleCheckInput1=(e)=>{
        let temp=this.state.login
          temp.check=!temp.check
        this.setState({login: temp})
      }
      handleSubmit1=(e)=>{
        e.preventDefault()
        this.setState({l_message:""})
        let formData1 = new FormData()
        formData1.append('_token', this.state.token)
        formData1.append('email', this.state.login.email)
        formData1.append('password', this.state.login.password)
        if(this.state.login.check) formData1.append('remember', "on")
        let formData2 = new FormData()
        formData2.append('Accept', "application/json")
        fetch("/login",
        {
          headers:formData2,
          body: formData1,
          method: "post"
        }).then(body=>body.status).then(status=>{
          if(status===204) location.href="/"
          else if(status==422) this.setState({l_message:"Email et/ou mot de passe sont incorrects, veuillez ressayer."})
          else this.setState({l_message:"Un erreur est servenu, veuillez ressayer."})
        })
      }
      handleSubmit=(e)=>{
        e.preventDefault()
        this.setState({r_message:""})
        let formData1 = new FormData()
        formData1.append('_token', this.state.token)
        formData1.append('name', this.state.register.name)
        formData1.append('email', this.state.register.email)
        formData1.append('password', this.state.register.password)
        formData1.append('password_confirmation', this.state.register.password_confirmation)
        let formData2 = new FormData()
        formData2.append('Accept', "application/json")
        this.setState({r_message:{name:[],email:[],password:[],password_confirmation:[],other:""}})
        fetch("/register",
        {
          headers:formData2,
          body: formData1,
          method: "post"
        }).then(body=>{this.setState({status:body.status});return body.json()}).then(message=>{
          if(this.state.status>=200 && this.state.status<=299) location.href="/profile"
          else if(this.state.status==422){
              let msg={name:[],email:[],password:[],password_confirmation:[],other:""};
              for(let ch in message.errors){
                  msg[ch]=message.errors[ch]
              }
              this.setState({r_message:msg})
            }
          else this.setState({r_message:{name:[],email:[],password:[],password_confirmation:[],other:["Un erreur est servenu, veuillez ressayer."]}})
        })
      }
  render() {
    return (
        <div className="login">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6">    
                    <form onSubmit={this.handleSubmit} className="register-form">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Nom complet</label>
                                <input onChange={this.handleNameInput} className="form-control" type="text" placeholder="Nom complet"/>
                                {this.state.r_message.name.map((error,i)=>{
                                    return(<p className="text-danger" key={i}>{error}</p>)
                                })}
                            </div>
                            <div className="col-md-12">
                                <label>E-mail</label>
                                <input onChange={this.handleEmailInput} className="form-control" type="text" placeholder="E-mail"/>
                                {this.state.r_message.email.map((error,i)=>{
                                    return(<p className="text-danger" key={i}>{error}</p>)
                                })}
                            </div>
                            <div className="col-md-6">
                                <label>Mot de passe</label>
                                <input onChange={this.handlePasswordInput} className="form-control" type="password" placeholder="Mot de passe"/>
                                {this.state.r_message.password.map((error,i)=>{
                                    return(<p className="text-danger" key={i}>{error}</p>)
                                })}
                            </div>
                            <div className="col-md-6">
                                <label>Confirmation</label>
                                <input onChange={this.handleRePasswordInput} className="form-control" type="password" placeholder="Retaper le mot de passe"/>
                                {this.state.r_message.password_confirmation.map((error,i)=>{
                                    return(<p className="text-danger" key={i}>{error}</p>)
                                })}
                            </div>
                            <div className="col-md-12">
                                <button className="btn">Envoyer</button>
                                <p className="text-danger">{this.state.r_message.other}</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6">
                    <form onSubmit={this.handleSubmit1} className="login-form">
                        <div className="row">
                            <div className="col-md-6">
                                <label>E-mail</label>
                                <input onChange={this.handleEmailInput1} className="form-control" type="text" placeholder="E-mail"/>
                            </div>
                            <div className="col-md-6">
                                <label>Mot de passe</label>
                                <input onChange={this.handlePasswordInput1} className="form-control" type="password" placeholder="Mot de passe"/>
                            </div>
                            <div className="col-md-12">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="newaccount"/>
                                    <label onChange={this.handleCheckInput1} className="custom-control-label" htmlFor="newaccount">Rester connecté</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="btn">Envoyer</button>
                                <p className="text-danger">{this.state.l_message}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default Authentification
