import React, { Component } from "react"

class Form extends Component {
	render() {
		return (
			<form className="form" action="/post" method="POST">
				<div className="form-row form--row">
					<div className="col-3 form--row--col">
						<label className="form--row--col--label" for="weight"></label>
						<input className="form-control form--row--col--input" type="text" name="weight_val" required maxlength="5" placeholder="Gewicht..." id="weight" />
					</div>
					<div className="col-7 form--row--col">
						<label className="form--row--col--label" for="notes"></label>
						<input className="form-control form--row--col--input" type="text" name="notes" maxlength="255" placeholder="Opmerkingen..." id="notes" />
					</div>
					<div className="col-2 form--row--col">
						<button className="btn btn-secondary form--row--col--button" type="submit">+</button>
					</div>
				</div>
			</form>
		)
	}
}

export default Form
