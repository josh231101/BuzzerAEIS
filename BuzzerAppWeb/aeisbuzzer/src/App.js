import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './Home';
import LoginModerador from './LoginModerador';
import LoginJugador from './LoginJugador';
import VistaModerador from './VistaModerador';
import VistaJugador from './VistaJugador';
import Game from './Game';

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
          <Route path="/vistaModerador/gameId=:id">
            <VistaModerador/>
          </Route>
          <Route path="/vistaJugador">
            <VistaJugador/>
          </Route>
          <Route path="/game/gameId=:id">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
