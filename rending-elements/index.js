import React from 'react';
import ReactDOM from 'react-dom';

// class App extends React.Component{
//     state = {};

//     constructor(props){
//         super(props);
//     }

//     render(){
//         return(
//             <h1>hello, world</h1>
//         );
//     }

// }

const element = <h1>Hello, world</h1>;

let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(element, root);