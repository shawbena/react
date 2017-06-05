import React from '../react';

export default function MyComponent(props){
    return (
        <div className="my-component">{props.children}</div>
    );
}