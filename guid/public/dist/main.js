require.config({
    baseUrl: 'dist',
});

require(['react', 'react-dom', './react-router-dom', './react-router/app'], function(React, ReactDOM, ReactRouterDOM, App){
    ReactDOM.render(
        React.createElement(App.default),
        document.getElementById('app')
    );
});