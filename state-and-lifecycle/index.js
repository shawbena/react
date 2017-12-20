import React, { Component } from 'react';
import { render } from 'react-dom';

class Clock extends Component {
    state = {
        date: new Date()
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({ date: new Date() });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

let root = document.createElement('div');
document.body.appendChild(root);
render(<Clock />, root);