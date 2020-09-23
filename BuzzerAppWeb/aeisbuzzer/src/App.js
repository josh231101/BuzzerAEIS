import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import LoginModerador from './components/Moderador/LoginModerador';
import LoginJugador from './components/Player/LoginJugador';
import VistaModerador from './components/Moderador/VistaModerador';
import Game from './components/Player/Game';

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
          <Route path="/game/gameId=:id">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
