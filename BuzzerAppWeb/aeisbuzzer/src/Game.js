import React,{useState, useEffect} from 'react';
import './Game.css';
import {db} from './firebase';
import {useStateValue} from './StateProvider';
import { firestore } from 'firebase';
import useSound from 'use-sound';
import boopSfx from './sounds/bell_sound.mp3';
import userIn from './sounds/airhorn.mp3';
import beginSound from './sounds/start.mp3';
import ding from './sounds/ding.mp3'

function Game() {
    const [ {user,gameID}, dispatch] = useStateValue();
    const [gameStatus, setGameStatus] = useState({});
    const [round, setRound] = useState();
    const [gotPoint, hasGottenPoint] = useState("none");
    const [tap] = useSound(boopSfx);
    const [isLoggedin] = useSound(userIn)
    const [beginPlay] = useSound(beginSound)
    const [userPoint] = useSound(ding)    
    const [hasStarted, setStarted] = useState(false)

    const teamPoints = () =>{
        if(user){
            switch(user.team){
                case 'Equipo Rojo':
                    return gameStatus.pointsRed
                case 'Equipo Verde' :
                    return gameStatus.pointsGreen
                case 'Equipo Azul' : 
                    return gameStatus.pointsBlue
            }
        }
    }
    useEffect(() => {    
        if(user){
            isLoggedin()
            db.collection('gamesID').doc(user.gameID).onSnapshot((snapshot)=>{
                hasGottenPoint(snapshot.data().hasPoint)
                setStarted(snapshot.data().canPlay);
                setRound(snapshot.data().round);
                setGameStatus(snapshot.data());
                
            })
        }else{}
    }, [isLoggedin])

    useEffect(() => {
        if(user){
            if(gotPoint != "none" || gotPoint != "undefined" || gotPoint != null){
                updateTeamPoint(gotPoint)
                document.body.style.animation =  `${gotPoint} 2000ms ease-in-out`;

                setTimeout(() => {
                    document.body.style.animation = "E4E4E4"
                    document.getElementById('teamPoint').innerHTML = ""
                  }, 2500);
            }
        }
    }, [gotPoint])
    const updateTeamPoint = (team) => {
        switch(team){
            case 'Equipo_Rojo':
            case 'Equipo_Azul':
            case 'Equipo_Verde':
                return document.getElementById('teamPoint').innerHTML = `${bgColor(team).toUpperCase()} POINT!!`;
            default:
                return true;
        }
    }

    useEffect(() => {
        /*IF HASSTARTED CHANGES ITS VALUE MAKE THIS EFFECT */
        user && beginPlay()
    }, [hasStarted])

    useEffect(() => {
        user && userPoint()
    }, [teamPoints()])

    useEffect(() => {
        if(user){document.getElementById("round").style.animation = "update-round 4s";}

    }, [round])

    const bgColor = (team) => {    
        switch(team){
            case 'Equipo Rojo':
            case 'Equipo_Rojo':
                return 'red'
            case 'Equipo Verde' :
            case 'Equipo_Verde' :
                return 'green'
            case 'Equipo Azul' : 
            case 'Equipo_Azul' :
                return 'blue'
            case 'none':
                return ""
        }
    }

    const sendUserParticipation = () => {
        tap()
		db.collection(`gamesID/${user.gameID}/playersBuzz`).add({
            userPlayer : user.player,
            userTeam : user.team,
            timestamp : firestore.FieldValue.serverTimestamp()
		})
		.then(()=> {
			
		})
		.catch((error)=>{alert("Error creating document: ",error)})
    }

    return (
        <div className="game ">
            
            {user ? (
                <div className="game__wrapper"> 
                    
                    <div className={"game__button " + (gameStatus.canPlay && "start__game") }>
                    <a onClick={gameStatus.canPlay ? sendUserParticipation : ()=>{}} className={"button" + " " + bgColor(user.team)}></a>
                    </div>
                    <h2 className="game__wrapperPoints">{user.team} Puntos: {teamPoints()}</h2>
                    <h2 id="round" className="game__wrapperRound">Ronda: {round}</h2>
                    <h1 id="teamPoint"></h1>
                </div>
            ): (
                <div>
                    <h1>You can not access this, please login</h1>
                    <a className="btn" href="/loginJugador">Log-In</a>
				</div>
            )}
        </div>
    )
}

export default Game
