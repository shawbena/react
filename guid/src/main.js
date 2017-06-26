require.config({
    baseUrl: 'dist',
});

require(['./react-router/app'], function(App){
    App.bootstrap();
});