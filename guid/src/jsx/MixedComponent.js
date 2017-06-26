import React from '../react';
import MyComponent from './MyComponent';
import {MyContainer, MyFirstComponent, MySecondComponent} from './MyContainer';

export default function MixedComponent(props){
    return (
        <div className="mixed-component">
            hahaha!
            <MyFirstComponent />
            <MySecondComponent />
            <MyComponent>hahahaha<div></div></MyComponent>
            <div>
                cacaca
            </div>
            <div className="mix-component-child">{props.children}</div>
        </div> 
    );
}