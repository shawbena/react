require.config({
    baseUrl: 'dist',
});

require(['react', 'react-dom', 'jsx/app'], function(React, ReactDOM, App){

    ReactDOM.render(
        React.createElement(App.default),
        document.getElementById('app')
    );
});