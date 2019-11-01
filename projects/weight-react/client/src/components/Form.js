import React, { Component } from "react"

class Form extends Component {
	render() {
		return (
			<form className="form" action="/api/weight" method="POST">
				<div className="form--row weight-input">
					<label className="form--row--label" for="weight_val"></label>
					<input className="form--row--input" type="number" placeholder="Gewicht..." name="weight_val" id="weight_val" min="0" step="any" required />
				</div>
				<div className="form--row notes-input">
					<label className="form--row--label" for="notes"></label>
					<input className="form--row--input" type="text" placeholder="Notities..." name="notes" id="notes" maxlength="255" />
				</div>
				<div className="form--row">
					<button className="form--row--button" type="submit">Toevoegen</button>
				</div>
			</form>
		)
	}
}

export default Form
