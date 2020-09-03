import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './Home';
import LoginModerador from './LoginModerador';
import LoginJugador from './LoginJugador';
import VistaModerador from './VistaModerador';
import VistaJugador from './VistaJugador';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/loginModerador">
            <LoginModerador/>
          </Route>
          <Route path="/loginJugador">
            <LoginJugador/>
          </Route>
          <Route path="/vistaModerador">
            <VistaModerador/>
          </Route>
          <Route path="/vistaJugador">
            <VistaJugador/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
