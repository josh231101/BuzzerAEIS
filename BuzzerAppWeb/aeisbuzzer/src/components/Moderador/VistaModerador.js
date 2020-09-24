import React,{useState, useEffect} from 'react';
import './vistaJugador.css';
import {db} from '../../db/firebase';
import firebase from 'firebase'
import "./VistaModerador.css";
import {useStateValue} from '../../api/StateProvider';
import PlayerBuzz from './PlayerBuzz'

function VistaModerador() { 
	const [{gameID},] = useStateValue();
	const [gameStatus, setGameStatus] = useState({});
	const [playersBuzz, setPlayersBuzz] = useState([]);

	useEffect(() => {
		//Connect in realtime to db, so when somehing changes update React components value
		gameID && db.collection('gamesID').doc(gameID).onSnapshot((snapshot)=>{
			setGameStatus(snapshot.data())
		})
	}, [gameID])
	
	useEffect(() => {
		//If there is a gameID->Check if there is a change on the collection inside the gameID
		//That collection has all of the users that have clicked the buzzer.Order them by timestamp
		//Save the array of objects inside the playersBuzz hook
		gameID && db.collection(`gamesID/${gameID}/playersBuzz`).orderBy("timestamp","asc").onSnapshot((snapshot) =>{
			setPlayersBuzz(snapshot.docs.map(doc => ({id : doc.id,playerBuzz : doc.data() })))
		})

	}, [gameID])

	const startGame = ()=>{
		//Set everything to begin the game, either case we start or play again
		db.collection('gamesID').doc(gameID).update({
			canPlay : true,
			hasPoint : "none",
			pointsBlue : 0,
			pointsRed : 0,
			pointsGreen : 0,
			round : 1,
			isFinished : false,
			winner : "none",
		})
		clean()
	}
	const getHasPoint = (pointToTeam) =>{
		switch (pointToTeam) {
			case "pointsBlue":	return "Equipo_Azul"	
			case "pointsRed":	return "Equipo_Rojo"
			case "pointsGreen":	return "Equipo_Verde"
			default: return "none"
		}
	}
	const addPointToTeam = (e) => {
		const pointToTeam = e.target.value;
		const hasPoint = getHasPoint(pointToTeam);
		clean()
		db.collection('gamesID').doc(gameID).update({
			hasPoint : hasPoint,
			[pointToTeam] : firebase.firestore.FieldValue.increment(1),
			round : firebase.firestore.FieldValue.increment(1),
			hasWrongAnswer : "none"
		})
	}

	const clean = () =>{
		db.collection(`gamesID/${gameID}/playersBuzz`).get().then(res => {
    		res.forEach(element => {
      			element.ref.delete();
    		});
  		});
	}

	const handleWrongAnswer = (e) =>{
		const wrongTeam = e.target.value;
		db.collection('gamesID').doc(gameID).update({
			hasWrongAnswer : wrongTeam,
		})
	}
	const newRound = () => {
		db.collection('gamesID').doc(gameID).update({
			round : firebase.firestore.FieldValue.increment(1)
		})
		clean();
	}
	const finishGame = () =>{
		const teamsPoints = [
			{teamPoints : gameStatus.pointsBlue, teamColor : "Equipo Azul" }, 
			{teamPoints : gameStatus.pointsGreen, teamColor : "Equipo Verde"}, 
			{teamPoints : gameStatus.pointsRed , teamColor : "Equipo Rojo"}
		]
		//Sort the teamsPoints to get the team with more points
		teamsPoints.sort((a,b)=>{
			if (a.teamPoints < b.teamPoints) {
			  return 1;
			}
			if (a.teamPoints > b.teamPoints) {
			  return -1;
			}
			return 0;
		  });
		db.collection('gamesID').doc(gameID).update({
			isFinished : true,
			winner : teamsPoints[0].teamColor,
		})
	}
	return (
		<div className="vista__moderador" id="vista__moderadorWrapper">
			{gameID ? 
				(<div>
					<h1>Id de la reunión: {gameID}</h1>
					<hr/>
					<label>Ronda:  {gameStatus.round}</label>
					<br/>	
					<label>Jugador:</label>
					<br/>
					<div className="playersbuzzer__wrapper">
						{playersBuzz.map(({id, playerBuzz}) =>
						<PlayerBuzz 
							key={id} 
							playerName={playerBuzz.userPlayer} 
							playerTeam={playerBuzz.userTeam} /> 
						)} 
					</div>
					<br/>
					<br/>
					<div className="admin__wrapper">
						<button onClick={startGame} className="admin__btn start">Empezar</button>
						<button onClick={clean} className="admin__btn">Clean</button>
						<button onClick={newRound} className="admin__btn">Nueva Ronda</button>
						<button onClick={finishGame} className="admin__btn restart">Finalizar juego</button>

					</div>
					<div className="admin__buttons">
						<button onClick={addPointToTeam} value="pointsBlue" class="admin__btn btn__blue">Punto Azul <br/>Puntos actuales: {gameStatus.pointsBlue}</button>
						
						<button onClick={addPointToTeam} value="pointsRed" class="admin__btn btn__red">Punto Rojo <br/>Puntos actuales:{gameStatus.pointsRed}</button>
						
						<button onClick={addPointToTeam} value="pointsGreen" class="admin__btn btn__green">Punto Verde <br/>Puntos actuales:{gameStatus.pointsGreen}</button>
						
					</div>
					<div className="admin__buttons">
						<button onClick={handleWrongAnswer} value="Equipo Azul" className="admin__btn wrong__blue">Azul Incorrecto</button>
						<button onClick={handleWrongAnswer} value="Equipo Rojo" className="admin__btn wrong__red">Rojo Incorrecto</button>
						<button onClick={handleWrongAnswer} value="Equipo Verde" className="admin__btn wrong__green">Verde Incorrecto</button>
					</div>
				</div>
				): 
				(
					<div>
						<h1>You can not access this, please login</h1>
						<a className="btn" href="/loginModerador">Log-In</a>
					</div>
				 )
			
			}
		</div>	
			
		
	)
}

export default VistaModerador

