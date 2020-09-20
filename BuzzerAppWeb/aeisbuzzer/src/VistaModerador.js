import React,{useState, useEffect} from 'react';
import './vistaJugador.css';
import {db} from './firebase';
import firebase from 'firebase'
import "./VistaModerador.css";
import {useStateValue} from './StateProvider';
import PlayerBuzz from './PlayerBuzz'

function VistaModerador() { 
	const [{user,gameID}, dispatch] = useStateValue();
	const [gameStatus, setGameStatus] = useState({});
	const [playersBuzz, setPlayersBuzz] = useState([]);

	useEffect(() => {
		gameID && db.collection('gamesID').doc(gameID).onSnapshot((snapshot)=>{
			setGameStatus(snapshot.data())
		})
	}, [])
	
	useEffect(() => {
		gameID && db.collection(`gamesID/${gameID}/playersBuzz`).orderBy("timestamp","asc").onSnapshot((snapshot) =>{
			setPlayersBuzz(snapshot.docs.map(doc => ({id : doc.id,playerBuzz : doc.data() })))
			
		})
	}, [])

	const startGame = ()=>{
		db.collection('gamesID').doc(gameID).update({
			canPlay : true,
			hasPoint : "none",
			pointsBlue : 0,
			pointsRed : 0,
			pointsGreen : 0,
			round : 1,
		})
	}
	const setPointToNone = () => {
		db.collection('gamesID').doc(gameID).update({
			hasPoint : "none"
		})
	}

	const addPointToTeam = (e) => {
		switch(e.target.value){
			case 'Blue':
				//DELETE ALL THE CLICKS LIST
				restart()
				db.collection('gamesID').doc(gameID).update({
					hasPoint : "Equipo_Azul",
					pointsBlue :  firebase.firestore.FieldValue.increment(1),
					round : firebase.firestore.FieldValue.increment(1)
				})
				//Set hasPoint AGAIN to none
				///setPointToNone();
				break;
			case 'Red':
				restart()
				db.collection('gamesID').doc(gameID).update({
					hasPoint : "Equipo_Rojo",
					pointsRed :  firebase.firestore.FieldValue.increment(1),
					round : firebase.firestore.FieldValue.increment(1)
				})
				///setPointToNone();
				break;
			case 'Green':
				restart()
				db.collection('gamesID').doc(gameID).update({
					hasPoint : "Equipo_Verde",
					pointsGreen :  firebase.firestore.FieldValue.increment(1),
					round : firebase.firestore.FieldValue.increment(1)
				})
				//setPointToNone();
				break;
			/*TODO : ADD NEW COLOR TEAM*/
			default:
				break;
		}
		
	}

	const restart = () =>{
		db.collection(`gamesID/${gameID}/playersBuzz`)
  		.get()
  		.then(res => {
    		res.forEach(element => {
      			element.ref.delete();
    		});
  		});
	}

	return (
		<div className="vista__moderador" id="vista__moderadorWrapper">
			{gameID ? 
				(<div>
					<h1>Id de la reunión: {gameID}</h1>
					<hr/>
					<div className="usersAnswer">
					</div>
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
						<button  className="admin__btn restart">Finalizar juego</button>
						
					</div>
					<div className="admin__buttons">
						<button onClick={addPointToTeam} value="Blue" class="admin__btn btn__blue">Punto Azul <br/>Puntos actuales: {gameStatus.pointsBlue}</button>
						
						<button onClick={addPointToTeam} value="Red" class="admin__btn btn__red">Punto Rojo <br/>Puntos actuales:{gameStatus.pointsRed}</button>
						
						<button onClick={addPointToTeam} value="Green" class="admin__btn btn__green">Punto Verde <br/>Puntos actuales:{gameStatus.pointsGreen}</button>
						
					</div>
				</div>)
				 : (
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

