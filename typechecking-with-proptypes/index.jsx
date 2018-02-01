import React from 'react';
import PropTypes from 'prop-types';

class Greeting extends React.Component{
    render(){
        <h1>Hello, {props.name}</h1>
    }
}

Greeting.prototype = {
    name: PropTypes.string
};
