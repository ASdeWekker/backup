import React, { Component } from "react"

const A = ({ users, selectUser }) => {
	return (
		<React.Fragment>
			<h1>I am A.</h1>
			{users.map(u, i) => {
				return <button onClick={() => selectUser(i)}>{u}</button>
			})}
		</React.Fragment>
	)
}

// Const B goes here.

class Rerender extends Component {
	render() {
		return (
			<h1>Ding</h1>
		)
	}
}

export default Rerender