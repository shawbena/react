require.config({
    baseUrl: 'dist',
});

require(['react', 'react-dom', './react-router/app'], function(React, ReactDOM, App){
    ReactDOM.render(
        React.createElement(App.default),
        document.getElementById('app')
    );
});