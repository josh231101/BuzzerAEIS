import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="jumbotron" id="content">
						<h1 id="title">AEIS's Buzzer App</h1>
						<hr/>
						<a href="/loginModerador" class="btn btn-info">Moderador</a>
						<br/>
						<a href="/loginJugador" class="btn btn-info">Jugador</a>
			</div>
    </div>
  );
}

export default App;
