import React, { Component } from "react"

class List extends Component {
	constructor(props) {
		super()
		this.state = {
			weight: []
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
				<ul>
				{this.state.weight.map(weight =>
					<li key={weight.id}>
						<p>{weight.weight_val}</p>
						<p>{weight.date}</p>
						<p>{weight.notes}</p>
					</li>
				)}
				</ul>
			</div>
		)
	}
}

export default List
