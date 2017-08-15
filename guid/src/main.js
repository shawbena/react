require.config({
    baseUrl: '/dist',
    paths: {
        react: 'react-with-addons'
    }
});

require(['./addons/addons-animation'], function(App){
    App.bootstrap();
});