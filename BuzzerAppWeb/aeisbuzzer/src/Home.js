import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="jumbotron" id="content">
            <h1 id="title">AEIS's Buzzer App</h1>
            <hr/>
            <a href="/loginModerador" class="btn btn-info">Moderador</a>
            <br/>
            <a href="/loginJugador" class="btn btn-info">Jugador</a>
        </div>
    )
}

export default Home
