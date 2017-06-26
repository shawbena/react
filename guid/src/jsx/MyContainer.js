import React from '../react';

function MyContainer(props){
    return (
        <div className="my-container">
            {props.children}
        </div>
    );
}

function MyFirstComponent(){
    return(
        <div className="my-first-component"></div>
    );
}

function MySecondComponent(){
    return(
        <div className="my-second-component"></div>
    );
}

export {MyFirstComponent, MySecondComponent, MyContainer};