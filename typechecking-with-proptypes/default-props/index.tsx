import * as React from 'react';
// import PropTypes from 'prop-types';
import bootstrap from '../../bootstrap';

interface GreetingProps{
    name: string;
}

class Greeting extends React.Component<GreetingProps>{
    // static defaultProps = {
    //     name: 'Stranger'
    // }
    render(){
        return (
            <h1>Hello, {this.props.name}</h1>
        )
    }
}

// Renders 'Hello, Stranger'
// 如果不提供属性，那 TypeScript 将不能检查出什么错误，而 JSX 则会
bootstrap(Greeting);