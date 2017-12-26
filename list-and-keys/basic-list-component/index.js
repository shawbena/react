import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

function NumberList(props){
	const numbers = [1, 2, 3, 4, 5];
	const listItems = props.numbers.map((number) => <li>{number}</li>);
	return(
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];

bootstrap(NumberList, { numbers });