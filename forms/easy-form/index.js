import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

class EasyForm extends Component {
	state = {
		value: 'Please write an essay about your favarite DOM element.'
	};

	constructor(props){
		super(props);
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}

	handleSubmit = (e) => {
		alert('An essay was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}