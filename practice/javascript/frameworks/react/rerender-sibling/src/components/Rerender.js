import React, { Component } from "react"

const A = ({ users, selectUser }) => {
	return (
		<React.Fragment>
			<h1>I am A.</h1>
			{users.map((u, i) => {
				return <button onClick={() => selectUser(i)}>{u}</button>
			})}
		</React.Fragment>
	)
}

const B = ({ user }) => {
	return <h1>I am B. Current user: {user}</h1>
}

const C = ({ user }) => {
	return <h1>I am C. Current user: {user}</h1>
}

class Rerender extends Component {
	state = {
		users: ["Bob", "Anne", "Mary"],
		currentUserIndex: 0
	}

	selectUser = n => {
		this.setState({
			currentUserIndex: n
		})
	}

	render() {
		const { users, currentUserIndex } = this.state
		const currentUser = users[currentUserIndex]

		return (
			<React.Fragment>
				<A selectUser={this.selectUser} users={users} />
				<B user={currentUser} />
				<C user={currentUser} />
			</React.Fragment>
		)
	}
}

export default Rerender