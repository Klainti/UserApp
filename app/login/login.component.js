angular.module('routerApp')
    .component('loginComponent', {
        controller: function (){
            this.email = '';
            this.password = '';
            console.log('ok')

            this.auth = function auth(){
                if (this.email == 'admin'){
                    console.log('Welcome admin!');
                } else{
                    console.log('Unauthorized!')
                }
            };
        },

        templateUrl: 'login/login.view.html'
    });