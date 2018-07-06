import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Bootstrap a React Component to page.
 * @param App 
 * @param props 
 * @param container HTMLElement
 */
export default function bootstrap(App, props, container){
    if(!container){
        container = document.createElement('div')
        document.body.appendChild(container)
    }
    
    ReactDOM.render(<App {...props} />, container)
}