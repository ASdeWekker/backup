import React, { Component } from "react"

class Form extends Component {
	constructor(props) {
		super()
		this.displayData = []
		this.state = {
			showdata: this.displayData,
			values: {
				weight_val: "",
				notes: ""
			},
			isSubmitting: false,
			isError: false
		}
		//this.appendData = this.appendData.bind(this)
	}

	// Function to submit a form.
	submitForm = async e => {
		e.preventDefault() // Not sure what this does.
		console.log(this.state)
		this.setState({ isSubmitting: true })

		// Post the inputted values.
		const res = await fetch("/api/weight", {
			method: "POST",
			body: JSON.stringify(this.state.values),
			headers: {
				"Content-Type": "application/json"
			}
		})

		this.setState({ isSubmitting: false }) // Done submitting.
		// Wait for the result and check for errors.
		const data = await res.json()
		!data.hasOwnProperty("error")
			? this.setState({ message: data.success })
			: this.setState({ message: data.error, isError: true })

		// Add an element with data and empty the form after submit.
		this.displayData.push(<p>Append data</p>)
		this.setState({
			showdata: this.displayData,
			values: {
				weight_val: "",
				notes: ""
			}
		})
	}

	// A function to be able to input data.
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
				<div>{this.displayData}</div>
			</form>
		)
	}
}

export default Form
