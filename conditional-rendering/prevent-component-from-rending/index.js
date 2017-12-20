import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

function WarningBanner(props){
	if(!props.warn){
		return null;
	}

	return (
		<div className="warning">
			Warning!
		</div>
	);
}

class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showWarning: false
		};
	}

	handleToggleClick = () => {
		this.setState(prevState => ({
			showWarning: !prevState.showWarning
		}));
	}

	render(){
		return(
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		);
	}
}

bootstrap(Page);