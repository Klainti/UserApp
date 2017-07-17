/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('loginComponent', {
        controller: LoginController,
        templateUrl : '/components/login/login.view.html'

    });

function LoginController ($state, $http, AuthService) {

    this.errorMessage = false;

    this.auth = function() {
        const ctrl = this;
        $http({
            method : "POST",
            url : "/api/login",
            data: { email: ctrl.email, password: ctrl.password}
        }).then(function mySuccess(response) {
            AuthService.setToken(response.data.token);

            $state.go('private.home');

        }, function myError(response) {
            console.log(response.data.message);
            ctrl.errorMessage = response.data.message;

            ctrl.email = '';
            ctrl.password = '';

        });

    };
};

