import * as React from 'react'

const ThemedContext = React.createContext('light');

interface ComponentProps {
    theme: string;
    [prop: string]: any;
}
export function withTheme(Component: React.ComponentClass<ComponentProps> | React.SFC<ComponentProps>){
    return function ThemedComponent(props: ComponentProps){
        return (
            <ThemedContext.Consumer>
                {theme => <Component {...props} theme={theme} />}
            </ThemedContext.Consumer>
        );
    }
}