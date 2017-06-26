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
                    <a href="#/">Home</a>
                </li>
                <li>
                    <a href="#/about">About</a>
                </li>
                <li>
                    <a href="#/inbox">Inbox</a>
                </li>
                <li>
                    <a href="#/news">News</a>
                </li>
            </ul>
        );
    }
    
}