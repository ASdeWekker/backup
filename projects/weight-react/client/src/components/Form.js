import React, { Component } from "react"

class Form extends Component {
	constructor(props) {
		super()
		this.state = {
			values: {
				weight_val: "",
				notes: ""
			},
			isSubmitting: false,
			isError: false
		}
	}

	handleInputChange = e => {
		this.setState({
			values: { ...this.state.values, [e.target.name]: e.target.value }
		})
	}

	submitForm = e => {
		e.preventDefault()
		console.log(this.state.values)
	}

	render() {
		return (
			<form className="form" onSubmit={this.submitForm}>
				<div className="form--row weight-input">
					<label className="form--row--label" htmlFor="weight_val"></label>
					<input
						className="form--row--input"
						value={this.state.values.weight_val}
						onChange={this.handleInputChange}
						type="number"
						placeholder="Gewicht..."
						name="weight_val"
						id="weight_val"
						title="Weight"
						min="0"
						step="any"
						required
					/>
				</div>
				<div className="form--row notes-input">
					<label className="form--row--label" htmlFor="notes"></label>
					<input
						className="form--row--input"
						value={this.state.values.notes}
						onChange={this.handleInputChange}
						type="text"
						placeholder="Notities..."
						name="notes"
						id="notes"
						title="Notes"
						maxlength="255"
					/>
				</div>
				<div className="form--row">
					<button className="form--row--button" type="submit">Toevoegen</button>
				</div>
			</form>
		)
	}
}

export default Form
