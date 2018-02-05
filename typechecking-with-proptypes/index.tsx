import * as React from 'react';
import * as PropTypes from 'prop-types';

interface GreetingProps{
    name: string;
}

class Greeting extends React.Component<GreetingProps>{
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render(){
        return(
            <h1>Hello, {this.props.name}</h1>
        );
    }
}

/*
 * TypeScript 还有必要用 PropTypes吗？
 * 也许吧，TypeScript 提供静态，而 PropTypes 可以提供开发环境中的运行时检查，对于类型化的语言确时没有必要。
*/