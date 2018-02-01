import React from 'react';
import PropTypes from 'prop-types';
import bootstrap from '../../bootstrap';

class Greeting extends React.Component{
    render(){
        return (
            <h1>Hello, {this.props.name}</h1>
        )
    }
}

// Specifies the default values for props:
Greeting.defaultProps = {
    name: 'Stranger'
};

// Renders 'Hello, Stranger'
bootstrap(Greeting);