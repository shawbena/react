import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../bootstrap';

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

bootstrap(ActionLink);