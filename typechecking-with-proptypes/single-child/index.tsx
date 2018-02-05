import * as React from 'react';
import * as PropTypes from 'prop-types';

interface MyComponentProps{
    children: React.ReactNode;
}

class MyComponent extends React.Component<MyComponentProps>{
    static PropTypes = {
        children: PropTypes.element.isRequired
    }
    render(){
        // This must be exactly one element or it will warn
        const children = this.props.children;
        return(
            <div>
                {children}
            </div>
        );
    }
}

/**
 * [ts]
不能将类型“{}”分配给类型“IntrinsicAttributes & IntrinsicClassAttributes<MyComponent> & Readonly<{ children?: ReactNode; }>...”。
  不能将类型“{}”分配给类型“Readonly<MyComponentProps>”。
    类型“{}”中缺少属性“children”。
 */
// let m = <MyComponent />