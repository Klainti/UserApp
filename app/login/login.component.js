angular.module('routerApp')
    .component('loginComponent', {
        controller: function (){
            this.email = '';
            this.password = '';
            console.log('ok')

            this.auth = function auth(){
                console.log(this.email);
            };
        },

        templateUrl: 'login/login.view.html'
    });