import React from '../react';

export default function Greeting(props) {
    return (
        <div className="greeting">
            Hello, {props.lastName + ' · ' + props.firstName}
        </div>
    );
}