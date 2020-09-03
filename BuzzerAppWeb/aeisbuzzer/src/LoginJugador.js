import React from 'react'
import "./loginJugador.css"

function loginJugador() {
	return (		
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div class="jumbotron" id="content">
						<h1 id="title">AEIS's Buzzer App</h1>
						<hr/>
						<form action="/loginJugador" method="post">
							<input placeHolder="Id del Juego" name="_idgame" autofocus required="true"></input>
							<br/>
							<input placeHolder="Nombre" name="playername" required="true"></input>
							<br/>
							<select name="userteam">
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

export default loginJugador
