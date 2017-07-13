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

        $http({
            method : "POST",
            url : "/api/signup",
            data: { firstname: this.firstname, lastname: this.lastname, email: this.email,
                username: this.username, password: this.password, address: this.address }
        }).then(function mySuccess(response) {
            console.log('GET REGISTER ' + response.data);
            $state.go('login');
        }, function myError(response) {
            console.log('GET REGISTER ERROR ' + response.data);
        });

    };
};

