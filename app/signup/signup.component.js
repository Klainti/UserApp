/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('signupComponent', {
        controller: LoginController,
        templateUrl : '/signup/signup.view.html'

    });

function LoginController ($http) {
    this.firstname  = '';
    this.lastname   = '';
    this.email      = '';
    this.username   = '';
    this.password   = '';
    this.address    = '';

    this.auth = function() {
        console.log(this.firstname);
        console.log(this.lastname);
        console.log(this.email);
        console.log(this.username);
        console.log(this.password);
        console.log(this.address);

        $http({
            method : "POST",
            url : "/api/signup",
            data: { firstname: this.firstname, lastname: this.lastname, email: this.email,
                username: this.username, password: this.password, address: this.address },
        }).then(function mySuccess(response) {
            console.log('GET REGISTER ' + response.data);
        }, function myError(response) {
            console.log('GET REGISTER ERROR ' + response.data);
        });

    };
};

