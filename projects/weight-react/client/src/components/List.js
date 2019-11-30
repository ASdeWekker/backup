import React, { Component } from "react"
import Item from "./Item"

class List extends Component {
	constructor(props) {
		super()
		this.state = {
			weight: []
		}
		this.dateStringOptions = { year: "numeric", month: "numeric", day: "numeric" }
	}

	componentDidMount() {
		fetch("/api/weight")
			.then(res => res.json())
			.then(weight => this.setState({weight}, () => console.log("Weight fetched...", weight)))
	}

	render() {
		return (
			<div className="list">
				<ul className="list--items">
					{this.state.weight.map((weight) => (
						<Item key={weight.id} weight={weight} />
					))}
				</ul>
			</div>
		)
	}
}

export default List