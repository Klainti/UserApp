angular.module('routerApp')
    .component('loginComponent', {
        controller: function ($http){
            this.email = '';
            this.password = '';
            console.log('ok')

            this.auth = function auth(){
                $http({
                    method: 'POST',
                    url: '/api/login',
                    data: {email: this.email, password: this.password},
                }).then(function mySuccess(response) {
                    console.log('GET Login' + response.data.token);
                }, function myError(response) {
                    console.log('GET Login ERROR' + response.data.message);
                });
            }
        },

        templateUrl: 'login/login.view.html'
    });