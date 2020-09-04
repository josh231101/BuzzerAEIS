import React from 'react'
import './Game.css'
import {useStateValue} from './StateProvider';
function Game() {
    const [ {user} ] = useStateValue();
    console.log(user);
    console.log(user);
    const bgColor = () => {    
        switch(user.team){
            case 'Equipo Rojo':
                return 'red'
            case 'Equipo Verde' :
                return 'green'
            case 'Equipo Azul' : 
                return 'blue'
        }
    }
    return (
        <div className="game">
            {user ? (
                <div className="game__button">

                <a className={"button" + " " + bgColor()} href="#"></a>
                </div>
            ): <h1>YOU ARE NOT LOGGED IN!</h1>}
        </div>
    )
}

export default Game
