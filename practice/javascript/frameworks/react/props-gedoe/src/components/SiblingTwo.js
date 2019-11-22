import React, { Component } from "react"
import Child from "./Child"

class SiblingTwo extends Component {
	render() {
		return (
			<div>
				<h2>SiblingTwo</h2>
				{this.props.things.map((things) => (
					<Child classname="child-elem" key={things.id} things={things} />
				))}
			</div>
		)
	}
}

export default SiblingTwo