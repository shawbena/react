import React, { Component } from 'react';
import { render } from 'react-dom';

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
      </a>
    );
}

let root = document.createElement('div');
document.body.appendChild(root);
render(<ActionLink />, root);