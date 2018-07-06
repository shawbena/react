import * as React from 'react'
const ThemeContext: React.Context<string>;

interface ButtonProps{
    theme: string;
    children?: JSX.Element;
}
interface ButtonState{

}
class Button extends React.Component<ButtonProps, ButtonState>{
    componentDidMount(){
        // ThemeContext value is this.props.theme;
    }

    componentDidUpdate(preProps: ButtonProps, prevState: ButtonState){
        // previous ThemeContext value is prevProps.theme
        // New ThemeContext value is this.props.theme
    }

    render(){
        const { theme, children } = this.props;
        return (
            <button className={theme ? 'dark' : 'light'}>{children}</button>
        );
    }
}

export default (props:any) => (
    <ThemeContext.Consumer>
        {theme => <Button {...props} theme={theme}/>}
    </ThemeContext.Consumer>
)