import * as React from 'react';

let Sidebar: () => JSX.Element;
let ProfilePage: (props: {theme: any, user: any}) => JSX.Element;
// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Singed-in user context
const UserContext = React.createContext({
    name: 'Guest'
});

interface AppProps {
    signedInUser: any;
    theme: any;
}
class App extends React.Component<AppProps>{
    render(){
        const { signedInUser, theme } = this.props;

        // App component that provides initial context values
        return (
            <ThemeContext.Provider value={theme}>
                <UserContext.Provider value={signedInUser}>
                    <Layout />
                </UserContext.Provider>
            </ThemeContext.Provider>
        );
    }
}

function Layout(){
    return (
        <div>
            <Sidebar />
            <Content />
        </div>
    );
}

// 使用多个 context 的组件
function Content(){
    return (
        <ThemeContext.Consumer>
            {theme => (
                <UserContext.Consumer>
                    {user => (
                        <ProfilePage user={user} theme={theme} />
                    )}
                </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    );
}
// 如果有更多的 context 需要一起使用，你可以考虑创建接收属性的组件来提供 contexts.