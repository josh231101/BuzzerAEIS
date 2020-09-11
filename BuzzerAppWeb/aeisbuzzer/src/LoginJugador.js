import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import "./loginJugador.css";
import {useStateValue} from './StateProvider';
import {db,auth,storage} from './firebase';

function LoginJugador() {
	const [{user,gameID}, dispatch] = useStateValue()
	const history = useHistory();
	const [gameId, setGameId] = useState('');
	const [playerName, setPlayerName] = useState('');
	const [playerTeam, setPlayerTeam] = useState('');



	const submitPlayer = (e) =>{
		e.preventDefault();
		//CHECK IF THE DOCUMENT INSIDE GAMESID EXISTS
		db.collection('gamesID').doc(gameId).get().then((doc)=>{
			//Document exists ? Take the user to the room
			if(doc.exists){
				dispatch({
					type : 'SET_USER',
					user : {gameID : gameId, player : playerName, team : playerTeam}
				})
				history.push(`/game/gameId=${gameId}`)
			}else{
				//THE GAME ID DOESN'T EXISTS
				alert("The Game ID is not in use. TRY AGAIN!")
			}
		})

	}
	return (
		<div className="login__jugador" id="login__jugadorWrapper">
			<h1 id="title">AEIS's Buzzer App</h1>
			<hr/>
			<form onSubmit={submitPlayer}>
				<input 
					placeHolder="Id del Juego" 
					name="_idgame" 
					autofocus required
					value={gameId} 
					onChange={(e)=>setGameId(e.target.value)}>
				</input>
				<br/>
				<input 
					placeHolder="Nombre" 
					name="playername" 
					required={true}
					value={playerName} 
					onChange={(e)=>setPlayerName(e.target.value)}>

				</input>
				<br/>
				<select name="userteam" onChange={(e)=> setPlayerTeam(e.target.value)} required>
					<option value="" disabled selected >Equipo</option>
					<option>Equipo Rojo</option>
					<option>Equipo Verde</option>
					<option>Equipo Azul</option>
				</select>
				<br/>
				<button type="submit" className="btn btn-info">Unirse</button>
			</form>
		</div>
	)
}

export default LoginJugador
