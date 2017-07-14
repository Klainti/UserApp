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

class AuthService {
    constructor($http, $window){
        this.$http = $http;
        this.$window = $window;
        this.myToken = undefined;
    }

    checkLogin(){
        if (this.getToken() !=null){
            return true;
        }
        return false;
    }

    setToken(myToken){
        this.myToken = myToken;
        this.saveSessionStorage(myToken);
    }

    getToken(){
        if (this.myToken != undefined){
            return this.myToken;
        } else{
            if (this.loadSessionStorage() != null){
                return this.loadSessionStorage();
            } else{
                return undefined;
            }
        }
    }

    loadSessionStorage(){
        return this.$window.sessionStorage.getItem('UserToken');
    }

    saveSessionStorage(myToken){
        this.$window.sessionStorage.setItem('UserToken', myToken);
    }

    dropSessionStorage(){
        this.$window.localStorage.removeItem('UserToken');
    }
}

routerApp.service('AuthService', AuthService);
