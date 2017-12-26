import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../../bootstrap';

bootstrap('input', { value: "h1" });

setTimeout(() => {
	render(<input value={null} />, document.getElementById('app'));
}, 1000);