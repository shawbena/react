import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

class FlavorForm extends Component {
	state = {
		value: 'coconut'
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}
	handleSubmit = (e) => {
		alert('Your favorite flavor is: ' + this.state.value);
		e.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite La Croix flavor:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}