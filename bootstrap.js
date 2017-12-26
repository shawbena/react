import React from 'react';
import { render } from 'react-dom';

/**
 * Bootstrap a React Component to page.
 * @param {ReactComponent} App
 */
export default (App, props) => {
    let root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);
    render(<App {...props} />, root);
}
