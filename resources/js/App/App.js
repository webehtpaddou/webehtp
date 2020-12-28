import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Accueil from './Pages/Accueil'
import Connexion from './Pages/Connexion'
import Inscription from './Pages/Inscription'
import Profile from './Pages/Profile'
function App() {
  return (
      <Router>
        <div>
          <Navbar/>
          <Switch>
            <Route path='/' exact component={Accueil} />
            <Route path='/connexion' component={Connexion} />
            <Route path='/inscription' component={Inscription} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;

if(document.getElementById('root')){
  ReactDOM.render(<App/>,document.getElementById('root'))
}