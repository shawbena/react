require.config({
    baseUrl: 'dist',
});

require(['react', 'react-dom', './router/app'], function(React, ReactDOM, App){
    ReactDOM.render(
        React.createElement(App.default),
        document.getElementById('app')
    );
});