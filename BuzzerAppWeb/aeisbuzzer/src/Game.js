import React,{useState, useEffect} from 'react'
import './Game.css'
import {db} from './firebase';
import {useStateValue} from './StateProvider';
function Game() {
    const [ {user,gameID}, dispatch] = useStateValue();
    const [gameStatus, setGameStatus] = useState({});
    console.log(user);
    useEffect(() => {
        if(user){
            db.collection('gamesID').doc(user.gameID).onSnapshot((snapshot)=>{
                console.log(snapshot.data());
                setGameStatus(snapshot.data())
            })
        }else{
        }
    }, [])

	
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
    const sendUserParticipation = () => {
        console.log("YOU FUCKING PROGRAMMER CLICKED ME!");
    }
    return (
        <div className={"game "  + (gameStatus.canPlay && "start__game")}>
            {user ? (
                <div className="game__button">

                <a onClick={gameStatus.canPlay ? sendUserParticipation : ()=>{}} className={"button" + " " + bgColor()}></a>
                </div>
            ): <h1>YOU ARE NOT LOGGED IN!</h1>}
        </div>
    )
}

export default Game
