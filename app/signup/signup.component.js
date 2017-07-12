angular.module('routerApp')
    .component('signupComponent', {
        controller: function (){
            this.username = '';
            this.email = '';
            this.password = '';
            this.firstname ='';
            this.lastname = '';
            this.address = '';

            console.log('ok')

            this.signup = function signup(){
                console.log(this.username);
                console.log(this.email);
                console.log(this.firstname);
            };
        },

        templateUrl: 'signup/signup.view.html'
    });