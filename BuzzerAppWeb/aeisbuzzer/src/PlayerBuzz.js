import React from 'react';
import './PlayerBuzz.css';

function PlayerBuzz({playerName,playerTeam}) {
    const color = () => {
        switch(playerTeam){
            case "Equipo Rojo":
                return "#E74C3C"
            case "Equipo Azul": 
                return "#3498DB"
            case "Equipo Verde":
                return "#2ECC71"
            default :
                return "White"
        }
    }
    return (
        <div className="playerbuzz" style={{"background-color" : color()}}>
            <p className="playerbuzzer__text">{playerName}</p>
        </div>
    )
}

export default PlayerBuzz
