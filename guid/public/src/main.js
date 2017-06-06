require.config({
    baseUrl: 'dist',
});

require(['react', 'react-dom', './lists-and-keys/app'], function(React, ReactDOM, App){
    ReactDOM.render(
        React.createElement(App.default),
        document.getElementById('app')
    );
});