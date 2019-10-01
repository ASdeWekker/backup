import React, { Component } from "react"
import Item from "./Item"

class List extends Component {
	constructor(props) {
		super()
		this.state = {
			weight = []
		}
	}

	componentDidMount() {
		fetch("/api/weight")
			.then(res => res.json())
			.then(weight => this.setState({weight}, () => console.log("Weight fetched...", weight)))
	}

	render() {
		return (
			<div>
				<h2>Gewicht</h2>
				<ul>
				{this.state.weight.map(weight =>
					<li key={weight.id}>{weight.weight} {weight.date}</li>
				)}
				</ul>
			</div>
		)
	}
}

export default List
