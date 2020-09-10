import React from 'react';
import './vistaJugador.css';
import {db} from './firebase';
import firebase from "firebase"
import "./VistaModerador.css";
import {useStateValue} from './StateProvider';

function VistaModerador() { 
	const [{user,gameID}, dispatch] = useStateValue();
	const answers = [{user : "Josue", userTeam : "Red"},{user : "Karla", userTeam : "Blue"}];


	const startGame = ()=>{
		db.collection('gamesID').doc(gameID).update({
			canPlay : true,
		})
	}
	const addPointToTeam = (e) => {
		switch(e.target.value){
			case 'Blue':
				db.collection('gamesID').doc(gameID).update({
					pointsBlue :  firebase.firestore.FieldValue.increment(1)
				})
				break;
			case 'Red':
				db.collection('gamesID').doc(gameID).update({
					pointsRed :  firebase.firestore.FieldValue.increment(1)
				})
				break;
			case 'Green':
				db.collection('gamesID').doc(gameID).update({
					pointsGreen :  firebase.firestore.FieldValue.increment(1)
				})
				break;
			default:
				break;
		}
		
	}
	return (
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="jumbotron" id="content">
						<h1>Id de la reunión: {gameID}</h1>
						<hr/>
						<div className="usersAnswer">
						</div>
						<label>Ronda:  .ronda</label>
						<br/>
						<label>Equipo:  .equipo</label>
						<br/>
						<label>Jugador:  .jugador</label>
						<br/>
						<div className="admin__wrapper">
							<button onClick={startGame} className="admin__btn start">Empezar</button>
							<button className="admin__btn restart">Reiniciar</button>
							
						</div>
						<div className="admin__buttons">
						<button onClick={addPointToTeam} value="Blue" class="admin__btn btn__blue">Punto Azul</button>
						<button onClick={addPointToTeam} value="Red" class="admin__btn btn__red">Punto Rojo</button>
						<button onClick={addPointToTeam} value="Green" class="admin__btn btn__green">Punto Verde</button>
						</div>
						
					</div>
				</div>
			</div>
		</div>


	)
}

export default VistaModerador

