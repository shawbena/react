import * as React from 'react';

function App1(){
    return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2(){
    const props: GreetingProps = {firstName: 'Ben', lastName: 'Hector'};
    return <Greeting {...props}/>;
}

interface GreetingProps{
    firstName: string;
    lastName: string;
}

function Greeting(props: GreetingProps){
    return <div>Hello, {props.firstName} {props.lastName}.</div>
}