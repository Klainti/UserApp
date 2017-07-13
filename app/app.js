var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('login', {
            url: '/login',
            component: 'loginComponent'
        })

        .state('signup', {
            url: '/signup',
            component: 'signupComponent'
        })

        .state('home', {
            url: '/home',
            component: 'homeComponent'
        });

});



