import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

class Reservation extends Component {
	state = {
		isGoing: true,
		numberOfGuests: 2
	};

	constructor(props){
		super(props);
	}

	handleChanges = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render(){
		return(
			<form>
				<label>
					Is going:
					<input 
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleChanges} />
				</label>
				<br />
				<label>
					Number of guests:
					<input 
						name="numberOfGuests" 
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleChanges} />
				</label>
			</form>
		);
	}
}