import React from 'react'
import 'loginModerador.css'
function loginModerador() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="jumbotron" id="content">
						<h1>AEIS's Buzzer App</h1>
						<hr/>
						<label>ID del juego: </label>
						<br/>
						<a href="/vistaModerador" className="btn btn-info">Iniciar Juego</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default loginModerador

	
