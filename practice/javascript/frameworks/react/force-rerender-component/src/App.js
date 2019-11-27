import React, { Component } from "react"
import "./App.css"
import SiblingOne from "./components/SiblingOne"
import SiblingTwo from "./components/SiblingTwo"

class App extends Component {
	constructor(props) {
		super()
		this.state = {
			values: {
				value: ""
			}
		}
	}

	handleUpdate = () => {
		this.forceUpdate()
	}

	render() {
		return (
			<div>
				<SiblingOne />
				<SiblingTwo />
			</div>
		)
	}
}

export default App