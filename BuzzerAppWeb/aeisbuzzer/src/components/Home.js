import React,{useEffect} from 'react';
import './Home.css';
import {Link} from "react-router-dom";

function Home() {
    useEffect(() => {
        document.body.style.animation = "17000ms ease-in-out infinite color-change"
    }, [])
    return (
        <div className="home" id="home__wrapper">
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
