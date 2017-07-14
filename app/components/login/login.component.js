/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('loginComponent', {
        controller: LoginController,
        templateUrl : '/components/login/login.view.html'

    });

function LoginController ($state, $http, AuthService) {

    this.auth = function() {

        $http({
            method : "POST",
            url : "/api/login",
            data: { email: this.email, password: this.password}
        }).then(function mySuccess(response) {


            AuthService.setToken(response.data.token);

            //$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
            //console.log($window.sessionStorage.getItem('userToken'));

            $state.go('private.home');

        }, function myError(response) {
            console.log(response.data.message);
        });

    };
};

