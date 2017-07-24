require.config({
    baseUrl: '/dist',
});

require(['./react-without-es6/app'], function(App){
    App.bootstrap();
});