/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('loginComponent', {
        controller: LoginController,
        templateUrl : '/components/login/login.view.html'

    });

function LoginController ($http, $window) {

    this.auth = function() {

        $http({
            method : "POST",
            url : "/api/login",
            data: { email: this.email, password: this.password}
        }).then(function mySuccess(response) {

            $window.sessionStorage.setItem('user', response.data.token);

            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

            console.log($window.sessionStorage.getItem('user'));

        }, function myError(response) {
            console.log(response.data.message);
        });

    };
};

