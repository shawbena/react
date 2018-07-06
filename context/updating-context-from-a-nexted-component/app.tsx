import * as React from 'react';
import { themes, ThemeContext} from './theme-context';
import ThemeToggleButton from './theme-toggle-button';
import * as ReactDOM from 'react-dom';
interface AppProps {

}

interface AppState {
    theme: {
        foreground: string;
        background: string;
    };
    toggleTheme(): void;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps){
        super(props);
        // this.toggleTheme = this.toggleTheme.bind(this);
    }
    toggleTheme = () => {
        this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark
        }));
    }
    state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme
    };

    render(){
        return (
            <ThemeContext.Provider value={this.state}>
                <Content />
            </ThemeContext.Provider>
        );
    }
}

function Content(){
    return (
        <div>
            <ThemeToggleButton />
        </div>
    );
}

if(document.readyState !== 'loading'){
    bootstrap();
}else{
    document.addEventListener('DOMContentLoaded', bootstrap);
}

function bootstrap(){
    ReactDOM.render(<App />, document.getElementById('root'));
}