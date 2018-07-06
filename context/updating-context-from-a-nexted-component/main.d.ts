/// <reference types="react" />
declare module "theme-context" {
    import * as React from 'react';
    export const themes: {
        light: {
            foreground: string;
            background: string;
        };
        dark: {
            foreground: string;
            background: string;
        };
    };
    export const ThemeContext: React.Context<{
        theme: {
            foreground: string;
            background: string;
        };
        toggleTheme: () => void;
    }>;
}
declare module "theme-toggle-button" {
    function ThemeToggleButton(): JSX.Element;
    export default ThemeToggleButton;
}
declare module "app" { }
//# sourceMappingURL=main.d.ts.map