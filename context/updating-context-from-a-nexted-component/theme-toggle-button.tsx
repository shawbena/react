import * as React from 'react';
import { ThemeContext } from './theme-context';
function ThemeToggleButton(){
    // Theme Toggler Button 不仅从 context 接收 them 也接收 toggleTheme 函数。
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme}) => (
                <button onClick={toggleTheme} style={{ backgroundColor: theme.background}}>
                    Toggle Theme
                </button>
            )}
        </ThemeContext.Consumer>
    );
}
export default ThemeToggleButton;