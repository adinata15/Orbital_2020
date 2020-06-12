import React from "react";
import axios from "axios";

export default class TrialAPI extends React.Component {
	state = {
		persons: [],
	};

	//this is connected to the backend
	componentDidMount() {
		axios.get("/search").then((res) => {
			const persons = res.data;
			this.setState({ persons });
		});
	}

	render() {
		return (
			<ul>
				{this.state.persons.map((person) => (
					<li>{person.name}</li>
				))}
			</ul>
		);
	}
}
