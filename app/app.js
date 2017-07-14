var routerApp = angular.module('routerApp', ['ui.router', 'angular-jwt']);

routerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);  //Remove the # from the URL's
    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('public', {
            url: '',
            abstract: true
        })

        .state('private',{
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        })

        .state('private.home',{
            url: '/home',
            component: 'homeComponent'
        })

        .state('public.login', {
            url: '/login',
            component: 'loginComponent'
        })

        .state('public.signup', {
            url: '/signup',
            component: 'signupComponent'
        });
});

routerApp.config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
        tokenGetter: ['AuthService', function (AuthService) {
            return AuthService.getToken();
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
});

routerApp.run(($state, $transitions, AuthService) => {
    $transitions.onBefore({to: 'private.**'}, ()=>{
        if (AuthService.getToken() === undefined){
            return $state.go('public.login');
        }
    })
});

routerApp.run(($state, $transitions, AuthService) => {
    $transitions.onBefore({to: 'public.**'}, ()=>{
        if (AuthService.getToken() !== undefined){
            return $state.go('private.home');
        }
    })
});