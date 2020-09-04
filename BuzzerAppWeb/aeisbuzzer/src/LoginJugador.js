import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import "./loginJugador.css";

function LoginJugador() {
	const history = useHistory();
	const [gameId, setGameId] = useState('');
	const [playerName, setPlayerName] = useState('');
	const [playerTeam, setPlayerTeam] = useState('');



	const submitPlayer = (e) =>{
		e.preventDefault();
		console.log(gameId, playerName,playerTeam);
		history.push('/game/'+gameId)
	}
	return (		
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div class="jumbotron" id="content">
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
							<button type="submit" className="btn btn-info">Unirse</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginJugador
