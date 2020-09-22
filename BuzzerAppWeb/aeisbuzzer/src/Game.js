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
import wrong from './sounds/wrong_answer.mp3';
import trumpetSad from './sounds/sad_trompet.mp3';
import loser_sound from './sounds/loserSound.mp3';

function Game() {
    /*HOOKS*/
    const [ {user,gameID}, dispatch] = useStateValue();
    const [gameStatus, setGameStatus] = useState({});
    const [round, setRound] = useState();
    const [gotPoint, hasGottenPoint] = useState("none");
    const [hasStarted, setStarted] = useState(false);
    const [hasWrongAnswer, setWrongAnswerTeam] = useState("none");
    const [isFinished, setFinish] = useState(false);
    const [winner , setWinner] = useState("none");
    /*SOUNDS*/
    const [tap] = useSound(boopSfx);
    const [isLoggedin] = useSound(userIn);
    const [beginPlay] = useSound(beginSound);
    const [userPoint] = useSound(ding);
    const [wrongAnswer] = useSound(wrong);
    const [sadTrumpet] = useSound(trumpetSad);
    const [loserSound] = useSound(loser_sound)

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
            document.getElementById('teamPoint').innerHTML = "¡ESTÁS DENTRO!"
            db.collection('gamesID').doc(user.gameID).onSnapshot((snapshot)=>{
                hasGottenPoint(snapshot.data().hasPoint)
                setStarted(snapshot.data().canPlay);
                setRound(snapshot.data().round);
                setGameStatus(snapshot.data());
                setWrongAnswerTeam(snapshot.data().hasWrongAnswer)  
                setFinish(snapshot.data().isFinished);
                setWinner(snapshot.data().winner)
            })
            setTimeout(() => {
                document.getElementById('teamPoint').innerHTML = ""
            }, 2000);
        }
    }, [isLoggedin])

    useEffect(() => {
        if( user && isFinished){
            switch(winner){
                case "none" : 
                    break
                case user.team : 
                    winnerTeamAnimation(winner);
                    break
                default : 
                    loserTeamAnimation(winner);
                    break
            }
            setTimeout(() => {
                document.getElementById('teamPoint').innerHTML = ""
            }, 8000);
        }
    }, [isFinished, winner])

    const winnerTeamAnimation = (winner) =>{
        beginPlay();
        document.getElementById('teamPoint').innerHTML = `${winner} Gana. Felicidades!`
    }
    const loserTeamAnimation = (winner) => {
        loserSound();
        document.getElementById('teamPoint').innerHTML = `${winner} Gana. Suerte la próxima!`


    }
    useEffect(() => {
        if(user){
            if(gotPoint != "none" || gotPoint != "undefined" || gotPoint != null){
                //SHOW THE WINNER OF THE POINT
                updateTeamPoint(gotPoint)
                document.body.style.animation =  `${gotPoint} 2000ms ease-in-out`;

                setTimeout(() => {
                    document.body.style.animation = "E4E4E4"
                    document.getElementById('teamPoint').innerHTML = ""
                }, 2500);
            }
        }
    }, [gotPoint,gameStatus.pointsBlue,gameStatus.pointsGreen,gameStatus.pointsRed])

    useEffect(() => {
        if(hasWrongAnswer != null && hasWrongAnswer != "none"){
            if(user.team == hasWrongAnswer){
                wrongAnswer();
                document.body.style.backgroundColor = "#F30000";
            }else{
                sadTrumpet();
            }
            document.getElementById('teamPoint').innerHTML = `¡${hasWrongAnswer} Incorrecto!`
            setTimeout(() => {
                document.body.style.backgroundColor = "#E4E4E4";
                document.getElementById('teamPoint').innerHTML = ""
            }, 2000);
        }
    }, [hasWrongAnswer])

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
