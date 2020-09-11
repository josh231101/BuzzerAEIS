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
			console.log(snapshot.data());
			setGameStatus(snapshot.data())
		})
	}, [])
	
	useEffect(() => {
		gameID && db.collection(`gamesID/${gameID}/playersBuzz`).orderBy("timestamp","asc").onSnapshot((snapshot) =>{
			setPlayersBuzz(snapshot.docs.map(doc => ({id : doc.id,playerBuzz : doc.data() })))
			
		})
		console.log(playersBuzz);

	}, [])

	const startGame = ()=>{
		db.collection('gamesID').doc(gameID).update({
			canPlay : true
		})
	}

	const addPointToTeam = (e) => {
		switch(e.target.value){
			case 'Blue':
				db.collection('gamesID').doc(gameID).update({
					pointsBlue :  firebase.firestore.FieldValue.increment(1),
					round : firebase.firestore.FieldValue.increment(1)

				})
				break;
			case 'Red':
				db.collection('gamesID').doc(gameID).update({
					pointsRed :  firebase.firestore.FieldValue.increment(1),
					round : firebase.firestore.FieldValue.increment(1)
				})
				break;
			case 'Green':
				db.collection('gamesID').doc(gameID).update({
					pointsGreen :  firebase.firestore.FieldValue.increment(1),
					round : firebase.firestore.FieldValue.increment(1)
				})
				break;
			default:
				break;
		}
		
	}

	const restart = () =>{
		/*db.collection('gamesID').doc(gameID).update({
			round : firebase.firestore.FieldValue.increment(1)
		})*/
		db.collection(`gamesID/${gameID}/playersBuzz`).delete().then(()=>{
			alert("PLAYERS CLICKS HAVE BEEN DELETED NOW YOU CAN PLAY AGAIN")
		}).catch((e)=>{alert(e)})
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
					
					<label>Jugador: 
						<div className="playersbuzzer__wrapper">
							{playersBuzz.map(({id, playerBuzz}) =>
							<PlayerBuzz 
								key={id} 
								playerName={playerBuzz.userPlayer} 
								playerTeam={playerBuzz.userTeam} /> 
							)} 
						</div>
						</label>
					<br/>
					<br/>
					<div className="admin__wrapper">
						<button onClick={startGame} className="admin__btn start">Empezar</button>
						<button onClick={restart} className="admin__btn restart">Reiniciar</button>
						
					</div>
					<div className="admin__buttons">
					<button onClick={addPointToTeam} value="Blue" class="admin__btn btn__blue">Punto Azul</button>
					<button onClick={addPointToTeam} value="Red" class="admin__btn btn__red">Punto Rojo</button>
					<button onClick={addPointToTeam} value="Green" class="admin__btn btn__green">Punto Verde</button>
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

