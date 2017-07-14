var routerApp = angular.module('routerApp', ['ui.router', 'angular-jwt']);

routerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);  //Remove the # from the URL's
    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('private',{
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        })

        .state('private.home',{
            url: '/home',
            component: 'homeComponent'
        })

        .state('login', {
            url: '/login',
            component: 'loginComponent'
        })

        .state('signup', {
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
        if (AuthService.getToken() == undefined){
            console.log('Unauthorized!')
            return $state.go('login');
        }else{
            console.log('Authorized!');
        }
    })
});