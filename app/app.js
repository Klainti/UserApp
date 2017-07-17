var routerApp = angular.module('routerApp', ['ui.router', 'angular-jwt']);

routerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);  //Remove the # from the URL's
    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('public',{
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        })

        .state('public.login', {
            url: '/login',
            component: 'loginComponent'
        })

        .state('public.signup', {
            url: '/signup',
            component: 'signupComponent'
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

        .state('private.edit',{
            url: '/edit',
            component: 'editComponent'
        })

        .state('private.logout',{
            url: '/logout',
            component: 'logoutComponent'
        })

});

routerApp.config(function Config($httpProvider, jwtOptionsProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
        tokenGetter: ['AuthService', function (AuthService) {
            var token = AuthService.getToken();
            console.log('GOT ' + token);
            return token;
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
});


routerApp.run(($state, $transitions, $window, AuthService) => {

    $transitions.onBefore({to: 'public.**'}, ()=>{

        if (AuthService.getToken() !== undefined){
            console.log('GO TO HOME');
            return $state.go('private.home');
        }

    });
});


routerApp.run(($state, $transitions, $window, AuthService) => {

    $transitions.onBefore({to: 'private.**'}, ()=>{

        if (AuthService.getToken() === undefined){
            console.log('GO TO LOGIN');
            return $state.go('login');
        }

    });
});


routerApp.service('AuthService', function ($http, $window) {

    this.checkToken = function () {
        if (this.getToken() === undefined){
            return false;
        }else{
            return true;
        }
    };

    this.setToken = function (token){
        this.token = token;
        $window.sessionStorage.setItem('userToken', token);
    };

    this.getToken = function (){
        if (this.token !== undefined) {
            return this.token;
        }

        var windowToken = $window.sessionStorage.getItem('userToken');
        if ( windowToken == null){
            return undefined;
        }else{
            return windowToken;
        }

    };

    this.resetToken = function (){
        this.token = undefined;
        $window.sessionStorage.removeItem('userToken');
    };

    this.auth = function (){



        $http({
            method : "GET",
            url : "/api/auth",
        }).then(function mySuccess(response) {

            console.log('USER AUTH');

            return true;

        }, function myError(response) {

            console.log('USER AUTH ERROR');

            return false;

        });
    };

});


