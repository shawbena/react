import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../bootstrap';

class NameForm extends Component{
	state = {
		value: ''
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}

	handleSubmit = (e) => {
		alert('A name was submitted: ' + this.state.value);
		e.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

bootstrap(NameForm);