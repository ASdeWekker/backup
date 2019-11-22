import React, { Component } from "react"
import "./App.css"
import SiblingOne from "./components/SiblingOne"
import SiblingTwo from "./components/SiblingTwo"

class App extends Component {
	constructor(props) {
		super()
		this.state = {
			things: [
				{
					id: 3,
					valueOne: "lolol"
				},
				{
					id: 2,
					valueOne: "dingen enzo"
				},
				{
					id: 1,
					valueOne: "Nog meer meuk"
				}
			]
		}
	}

	render() {
		return (
			<div className="App">
				<SiblingOne things={this.state.things} />
				<SiblingTwo things={this.state.things} />
			</div>
		)
	}
}

export default App
