/// <reference path="../global.d.ts" />
import * as React from 'react'



interface LogPropsProps{
    children?: React.ReactNode;
    forwardedRef: any;
}

/**
 * 封装组件的属性约束。封装的组件可能有 ref 属性。
 * WrappedComponent 组件可能是 React 类组件，函数组件或原生标签：即 ReactType.
 * 我们并不要求其有其他属性，所以其他属性在些指定约束。
 */
interface WrappedComponentConstrains{
    ref?: any;
}

function logProps<P extends WrappedComponentConstrains>(WrappedComponent: React.ComponentType<P> & {name: string}){
    class LogProps extends React.Component<LogPropsProps>{
        componentDidUpdate(prevProps: LogPropsProps){
            console.log('old props', prevProps);
            console.log('new props', this.props);
        }

        render(){
            const { forwardedRef, ...rest} = this.props;
            return <WrappedComponent ref={forwardedRef} {...this.props} />;
        }
    }


    function forwardRef(props:any, ref:any){
        return <LogProps {...props} forwardedRef={ref} />;
    }

    const name = WrappedComponent.displayName || WrappedComponent.name;
    forwardRef.displayName = `logProps(${'dddd'})`;
    return React.forwardRef<HTMLButtonElement>(forwardRef)
}

export default logProps;