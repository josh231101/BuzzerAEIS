import React, {useState} from 'react';
import './loginModerador.css';
import {db,auth,storage} from './firebase';
import {useHistory} from 'react-router-dom'
function LoginModerador() {
	const history = useHistory();
	const [_id,setId] = useState("")

	const createGameById = (e) => {
		e.preventDefault();
		db.collection("gamesID").doc(_id).set({
			exists : true,
		})
		.then(()=> {
			console.log("Document successfully written!!");
			history.push(`/vistaModerador/${_id}`)
		})
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="jumbotron" id="content">
						<h1>AEIS's Buzzer App</h1>
						<hr/>
						<form onSubmit={createGameById}>
						<label>ID del juego: <input  className="content__id" placeholder="6 digits" value={_id} onChange={(e) => setId(e.target.value)}></input></label>
						<br/>
						<button class="btn" type="submit" className="btn btn-info">Iniciar Juego</button>

						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginModerador

	
