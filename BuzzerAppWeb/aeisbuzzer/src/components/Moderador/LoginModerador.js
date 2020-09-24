import React, {useState, useEffect} from 'react';
import './loginModerador.css';
import {db} from '../../db/firebase';
import {useHistory} from 'react-router-dom';
import {useStateValue} from '../../api/StateProvider';

function LoginModerador() {
	const [, dispatch] = useStateValue();
	const history = useHistory();
	const [_id,setId] = useState("");

	//Delete the color-change animation
	useEffect(() => {
        document.body.style.animation = "E4E4E4"
    }, [])

	const createGameById = (e) => {
		e.preventDefault();//Prevent a refresh on web
		//Pass the gameID to all the web app using React Context API
		dispatch({
			type : 'SET_GAMEID',
			gameID: _id,
		})

		//Start a new game with the ID written
		db.collection("gamesID").doc(_id).set({
			canPlay : false,
			hasPoint : "none",
			isFinished : false,
			winner : "none",
			hasWrongAnswer : "none",
			restart : false,
			pointsBlue : 0,
			pointsRed : 0,
			pointsGreen : 0,
		})
		.then(()=> {
			history.push(`/vistaModerador/gameId=${_id}`)
		})
		.catch((error)=>{alert("Error creating document: ", error)})
	}
	return (
		<div className="login__moderador" id="login__moderadorWrapper">
			<h1>AEIS's Buzzer App</h1>
			<hr/>
			<form onSubmit={createGameById}>
				<label>ID del juego: 
					<input 
						required 
						className="content__id" 
						placeholder="6 digits" 
						value={_id} 
						onChange={(e) => setId(e.target.value)}>

					</input>
				</label>
				<br/>
				<button type="submit" className="btn btn-info">Iniciar Juego</button>
			</form>
		</div>
	)
}

export default LoginModerador

	
