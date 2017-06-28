require.config({
    baseUrl: '/dist',
});

require(['./refs-and-the-dom/app'], function(App){
    App.bootstrap();
});