var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {


    $locationProvider.html5Mode(true);  //Remove the # from the URL's
    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('private',{
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        })

        .state('private.home',{
            url: '/home',
            template: 'This is home'
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

routerApp.run(($state, $transitions, AuthService) => {

    $transitions.onBefore({to: 'private.**'}, ()=>{
        AuthService.auth();
        return $state.go('home');
    })
});

routerApp.service('AuthService', function ($http) {

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

    this.returnTrue = function () {
        return true;
    };
});


