/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('signupComponent', {
        controller: function() {
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
            };
        },

        templateUrl : '/signup/signup.view.html'

    });
