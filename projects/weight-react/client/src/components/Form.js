import React, { Component } from "react"

class Form extends Component {
	render() {
		return (
			<form className="form" action="/post" method="POST">
				<div className="form--item">
					<label className="form--item--label" for=""></label>
					<input className="form--item--input" type="number" />
				</div>
				<div className="form--item">
					<label className="form--item--label" for=""></label>
					<input className="form--item--input" type="text" />
				</div>
				<div className="form--item">
					<button className="form--item--button" type="submit">Toevoegen</button>
				</div>
			</form>
		)
	}
}

export default Form
