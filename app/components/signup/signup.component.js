/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('signupComponent', {
        controller: SignupController,
        templateUrl : '/components/signup/signup.view.html'

    });

function SignupController ($http, $state) {

    this.auth = function() {
        const ctrl = this;
        $http({
            method : "POST",
            url : "/api/signup",
            data: { firstname: ctrl.firstname, lastname: ctrl.lastname, email: ctrl.email,
                username: ctrl.username, password: ctrl.password, address: ctrl.address }
        }).then(function mySuccess(response) {
            console.log('GET REGISTER ' + response.data);
            $state.go('public.login');
        }, function myError(response) {
            console.log('GET REGISTER ERROR ' + response.data);

            ctrl.errorMessage = response.data.message;
            ctrl.email = '';
        });

    };
};

