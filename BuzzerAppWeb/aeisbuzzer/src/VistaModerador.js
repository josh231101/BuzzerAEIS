import React from 'react'
import '/vistaJugador.css'
function vistaModerador() {
	return (
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="jumbotron" id="content">
						<h1>Id de la reunión:</h1>
						<hr/>
						<label>Ronda:  .ronda</label>
						<br/>
						<label>Equipo:  .equipo</label>
						<br/>
						<label>Jugador:  .jugador</label>
						<br/>
						<button class="btn btn-info">Reiniciar</button>
					</div>
				</div>
			</div>
		</div>


	)
}

export default vistaModerador

