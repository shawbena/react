import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../bootstrap';

function UserGreeting(props){
    return <h1>Welcome back!</h1>
}

function GuestGreeting(props){
    return <h1>Please sign up.</h1>;
}

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

// Try changing to isLoggedIn={true}
bootstrap(Greeting, { isLoggedIn: true });