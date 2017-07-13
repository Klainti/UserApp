angular.module('routerApp')
    .component('signupComponent', {
        controller: function ($http){
            this.username = '';
            this.email = '';
            this.password = '';
            this.firstname ='';
            this.lastname = '';
            this.address = '';

            console.log('ok')

            this.signup = function signup(){
                $http({
                    method: 'POST',
                    url: '/api/signup',
                    data: {firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password,
                    username: this.username, address: this.address},
                }).then(function mySuccess(response) {
                    console.log('GET REGISTER' + response.data);
                }, function myError(response) {
                    console.log('GET REGISTER ERROR' + response.data);
                });
            };
        },

        templateUrl: 'signup/signup.view.html'
    });