/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('loginComponent', {
        controller: function() {
            this.email = '';
            this.password = '';


            this.auth = function auth() {
                console.log(this.email);
            };
        },

        templateUrl : '/login/login.view.html',

    });
