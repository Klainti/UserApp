/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('loginComponent', {
        controller: LoginController,
        templateUrl : '/login/login.view.html'

    });

function LoginController ($http) {

    this.auth = function() {

        $http({
            method : "POST",
            url : "/api/login",
            data: { email: this.email, password: this.password}
        }).then(function mySuccess(response) {
            console.log('GET LOGIN ' + response.data.token);
        }, function myError(response) {
            console.log(response.data.message);
        });

    };
};

