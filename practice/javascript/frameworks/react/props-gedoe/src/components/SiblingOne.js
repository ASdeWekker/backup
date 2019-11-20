import React, { Component } from "react"

class SiblingOne extends Component {
	constructor(props) {
		super()
		this.showNewElems = []
		this.state = {
			newElems: this.showNewElems,
			values: {
				valueOne: ""
			}
		}
	}

	submitForm = e => {
		e.preventDefault()
		console.log(this.state)

		this.showNewElems.unshift(
			<p>New value: {this.state.values.valueOne}</p>
		)
		this.setState({
			newElems: this.showNewElems,
			values: {
				valueOne: ""
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
			<div>
				<h2>SiblingOne</h2>
				<form onSubmit={this.submitForm}>
					<label htmlFor="valueOne"></label>
					<input
						value={this.state.values.valueOne}
						onChange={this.handleInputChange}
						type="text"
						placeholder="Iets..."
						name="valueOne"
						id="valueOne"
						title="valueOne"
					/>
					<button type="submit">+</button>
				</form>
				<div>{this.showNewElems}</div>
			</div>
		)
	}
}

export default SiblingOne