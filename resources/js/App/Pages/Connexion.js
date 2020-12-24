import React, { Component } from 'react'
import './connexion.css'

class Connexion extends Component {
    render() {
        return ( <
            div className = 'connexion' >
            <
            form >
            <
            h1 > Connexion < /h1> <
            div className = 'signin-dialog' >
            <
            label htmlFor = 'email' > Email < /label> <
            input name = 'email'
            type = 'text' > < /input> <
            label htmlFor = 'password' > Mot de passe < /label> <
            input name = 'password'
            type = 'password' > < /input> <
            /div> <
            button type = 'submit' > Se connecter < /button> <
            a href = "/forget"
            className = "forget" > Mot de pase oublié ? < /a> <
            /form> <
            /div>
        )
    }
}

export default Connexion