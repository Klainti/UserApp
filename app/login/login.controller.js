/**
 * Created by vchris on 11/7/2017.
 */

angular
        .module("routerApp")
        .controller("LoginController", function() {
            this.email = '';
            this.password = '';


            this.auth = function auth() {
                console.log(this.email);
            };
        });
