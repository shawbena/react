import React, { Component } from 'react';
// import bootstrap from '../bootstrap';
import { render } from 'react-dom';

// let div = <div id="div1">CLick Me</div>;

// let btn = <MyButton color="blue" shadowSize={2}>
//     <i>mouse</i>Click Me
// </MyButton>
function MyButton(props) {
    return <button>{props.children}</button>
}

render(
    <MyButton color="blue" shadowSize={2}>
        <i>mouse</i>Click Me
    </MyButton>, div
)

let Hello = (
    <div>
        <div />

        <div></div>

        <div>{false}</div>

        <div>{null}</div>

        <div>{undefined}</div>

        <div>{true}</div>
    </div>
);