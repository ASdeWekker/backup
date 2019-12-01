import React, { Component } from "react"

class Item extends Component {
	render() {
		return (
			<li className="list--items--item">
				<p className="list--items--item--date">
					{this.props.weight.date
						? new Date(this.props.weight.date).toLocaleDateString("nl-NL", this.props.dateStringOptions)
						: new Date().toLocaleDateString("nl-NL", this.props.dateStringOptions)}
				</p>
				<p className="list--items--item--weight">{this.props.weight.weight_val}</p>
				<p className="list--items--item--notes">{this.props.weight.notes}</p>
			</li>
		)
	}
}

export default Item