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
        AuthService.checkLogin();
        return $state.go('login');
    })
})

class AuthService {
    constructor($http){
        this.$http = $http;
    }

    checkLogin(){
        this.$http({
            method: 'GET',
            url: '/api/auth',
        }).then(function mySuccess(response) {
            console.log('User Auth');
        }, function myError(response) {
            console.log('User not Auth');
        })
    }

    setToken(myToken){

    }
}

routerApp.service('AuthService', AuthService);

