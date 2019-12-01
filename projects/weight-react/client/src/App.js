import React, { Component } from "react"
import Item from "./components/Item"

class App extends Component {
	constructor(props) {
		super()
		this.displayData = []
		this.state = {
			showData: this.displayData,
			values: {
				date: "",
				weight_val: "",
				notes: ""
			},
			weight: [],
			isSubmitting: false,
			isError: false
		}
		this.dateStringOptions = { year: "numeric", month: "numeric", day: "numeric" }
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
		this.displayData.unshift(
			<Item key={weight.id} weight={this.state.values} />
		)
		this.setState({
			showData: this.displayData,
			values: {
				date: "",
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

	componentDidMount() {
		fetch("/api/weight")
			.then(res => res.json())
			.then(weight => this.setState({weight}, () => console.log("Weight fetched...", weight)))
	}

	render() {
		return (
			<div className="App">
				<header className="header">
					<h1 className="header--title">Gewicht</h1>
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
					</form>
				</header>
				<div className="list">
					<ul className="list--items prepend-list">
						{this.displayData}
					</ul>
					<ul className="list--items">
						{this.state.weight.map((weight) => (
							<Item key={weight.id} weight={weight} />
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export default App