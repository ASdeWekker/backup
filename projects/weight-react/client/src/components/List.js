import React, { Component } from "react"

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
				{this.state.weight.map(weight =>
					<li key={weight.id} className="list--items--item">
						<p className="list--items--item--weight">{weight.weight_val} kg</p>
						<p className="list--items--item--date">{new Date(weight.date).toLocaleDateString("nl-NL", this.dateStringOptions)}</p>
						<p className="list--items--item--notes">{weight.notes}</p>
					</li>
				)}
				</ul>
			</div>
		)
	}
}

export default List
