import React, { Component } from "react"

class Child extends Component {
	render() {
		return (
			<div className={this.props.classname}>
				<p>Value: <span>{this.props.things.valueOne}</span></p>
			</div>
		)
	}
}

export default Child