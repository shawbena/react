import * as React from 'react';
import { render } from 'react-dom';

/**
 * Bootstrap a React Component to page.
 * @param App 
 * @param props 
 * @param container
 */
export default function bootstrap<P={}>(App:React.ReactType<P>, props?:P, container?: Element){
    // props 类型可以更具体些
    // App 也许也可以
    if(!container){
        container = document.createElement('div')
        document.body.appendChild(container)
    }
    
    render(<App {...props} />, container)
}