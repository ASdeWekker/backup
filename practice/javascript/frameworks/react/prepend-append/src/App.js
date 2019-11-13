import React, { Component } from "react"
import "./App.css"

class App extends Component {
	constructor(props) {
		super()
		this.displayData = []
		this.state = {
			showdata: this.displayData,
			postVal: ""
		}

		this.appendData = this.appendData.bind(this)
		this.prependData = this.prependData.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	appendData = e => {
		e.preventDefault()
		this.displayData.push(<div id="display-data"><pre>{this.state.postVal}</pre></div>)
		this.setState({
			showdata: this.displayData,
			postVal: ""
		})
	}

	prependData = e => {
		e.preventDefault()
		this.displayData.unshift(<div id="display-data"><pre>{this.state.postVal}</pre></div>)
		this.setState({
			showdata: this.displayData,
			postVal: ""
		})
	}

	handleChange = e => {
		let getTextAreaValue = e.target.value
		this.setState({
			postVal: getTextAreaValue
		})
	}

	render() {
		return (
			<div id="mainContainer">
				<textarea rows="4" cols="50" value={this.state.postVal} onChange={this.handleChange}></textarea>
				<div>
					<input type="submit" className="button" onClick={this.appendData} value="Append" />
					<input type="submit" className="button" onClick={this.prependData} value="Prepend" />
				</div>
				<div id="display-data-Container">
					{this.displayData}
				</div>
			</div>
		)
	}
}

export default App
