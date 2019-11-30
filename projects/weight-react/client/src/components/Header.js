import React, { Component } from "react"
import Form from "./Form"

class Header extends Component {
	render() {
		return (
			<header className="header">
				<h1 className="header--title">Gewicht</h1>
				<Form />
			</header>
		)
	}
}

export default Header