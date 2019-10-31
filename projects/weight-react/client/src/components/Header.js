import React, { Component } from "react"
import Form from "./Form"

class Header extends Component {
	render() {
		return (
			<header className="header jumbotron jumbotron-fluid">
				<h1 className="header--title text-center">Gewicht</h1>
				<Form />
			</header>
		)
	}
}

export default Header
