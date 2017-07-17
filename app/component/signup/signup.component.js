angular.module('routerApp')
    .component('signupComponent', {
        controller: function ($http, $state){

            this.signup = function signup(){
                myctrl = this;
                $http({
                    method: 'POST',
                    url: '/api/signup',
                    data: {firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password,
                    username: this.username, address: this.address},
                }).then(function mySuccess(response) {
                    $state.go('public.login');
                }, function myError(response) {
                    myctrl.validationError = response.data.message;
                });
            };
        },

        templateUrl: 'component/signup/signup.view.html'
    });