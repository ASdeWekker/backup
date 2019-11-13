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

	submitForm = async e => {
		e.preventDefault()
		console.log(this.state)
		this.setState({ isSubmitting: true })

		const res = await fetch("http://10.8.0.4:3010/api/weight", {
			method: "POST",
			body: JSON.stringify(this.state.values),
			headers: {
				"Content-Type": "application/json"
			}
		})
		this.setState({ isSubmitting: false })
		const data = await res.json()
		!data.hasOwnProperty("error")
			? this.setState({ message: data.success })
			: this.setState({ message: data.error, isError: true })
		console.log("Maak het formulier leeg en voeg het item zelf toe.")

		this.setState({
			values: {
				weight_val: "",
				notes: ""
			}
		})
	}

	handleInputChange = e => {
		this.setState({
			values: { ...this.state.values, [e.target.name]: e.target.value }
		})
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
						maxLength="255"
					/>
				</div>
				<div className="form--row submit-button">
					<button className="form--row--button" type="submit">Toevoegen</button>
				</div>
			</form>
		)
	}
}

export default Form
