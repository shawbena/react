import React from '../react';

export default class Nav extends React.Component{
    constructor (props) {
        super(props)
        this.state = {};
    }
    render(){
        return (
            <ul id="nav">
                <li>
                    <a href="/info">Info</a>
                </li>
                <li>
                    <a href="/order">Order</a>
                </li>
                <li>
                    <a href="/flow">Flow</a>
                </li>
                <li>
                    <a href="/alarm">Alarm</a>
                </li>
            </ul>
        );
    }
    
}