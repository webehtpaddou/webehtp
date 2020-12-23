import React, { Component } from 'react'
import './inscription.css'
import { Link } from 'react-router-dom'

class Inscription extends Component {
    render() {
        return ( <
            div >
            <
            div className = 'inscription' >
            <
            form >
            <
            h1 > Inscription < /h1> <
            div className = 'signup-dialog' >
            <
            label htmlFor = 'lastName' > Nom < /label> <
            input name = 'lastName'
            type = 'text' > < /input> <
            label htmlFor = 'firstName' > Prénom < /label> <
            input name = 'firstName'
            type = 'text' > < /input> <
            label htmlFor = 'email' > Email < /label> <
            input name = 'email'
            type = 'text' > < /input> <
            label htmlFor = 'password' > Mot de passe < /label> <
            input name = 'password'
            type = 'password' > < /input> <
            label htmlFor = 'confirmPassword' > Confirmer mot de passe < /label> <
            input name = 'confirmPassword'
            type = 'password' > < /input> <
            /div> <
            button type = 'submit' > S 'inscrire</button> <
            p className = "already" > Avez - vous déjà un compte ? < Link to = '/connexion' > Connectez - vous! < /Link></p >
            <
            /form> <
            /div> <
            /div>
        )
    }
}

export default Inscription
