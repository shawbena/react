import React from 'react';
import ReactDOM from 'react-dom';

function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, root);
}

let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

setInterval(tick, 1000);
