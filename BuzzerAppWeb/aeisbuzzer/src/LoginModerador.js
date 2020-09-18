import React, {useState, useEffect} from 'react';
import './loginModerador.css';
import {db,auth,storage} from './firebase';
import {useHistory} from 'react-router-dom';
import {useStateValue} from './StateProvider';

function LoginModerador() {
	const [{user, gameID}, dispatch] = useStateValue();
	const history = useHistory();
	const [_id,setId] = useState("");
	useEffect(() => {
        document.body.style.animation = "E4E4E4"
    }, [])

	const createGameById = (e) => {
		e.preventDefault();

		dispatch({
			type : 'SET_GAMEID',
			gameID: _id,
		})
		db.collection("gamesID").doc(_id).set({
			canPlay : false,
			hasPoint : "none",
			restart : false,
			pointsBlue : 0,
			pointsRed : 0,
			pointsGreen : 0,
			round : 1,
		})
		.then(()=> {
			console.log("Document successfully written!!");
			history.push(`/vistaModerador/gameId=${_id}`)
		})
		.catch((error)=>{alert("Error creating document: ",error)})
	}
	return (

		<div className="login__moderador" id="login__moderadorWrapper">
			<h1>AEIS's Buzzer App</h1>
			<hr/>
			<form onSubmit={createGameById}>
			<label>ID del juego: <input required className="content__id" placeholder="6 digits" value={_id} onChange={(e) => setId(e.target.value)}></input></label>
			<br/>
			<button className="btn" type="submit" className="btn btn-info">Iniciar Juego</button>

			</form>
		</div>

	)
}

export default LoginModerador

	
