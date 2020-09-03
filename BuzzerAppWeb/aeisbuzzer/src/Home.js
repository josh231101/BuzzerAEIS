import React from 'react';
import './Home.css';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="jumbotron" id="content">
            <h1 id="title">AEIS's Buzzer App</h1>
            <hr/>
            <Link to="/loginModerador" className="btn btn-info">
                Moderador
            </Link>
            <br/>
            <Link to="/loginJugador" className="btn btn-info">
                Jugador
            </Link>
        </div>
    )
}

export default Home
