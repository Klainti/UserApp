angular.module('routerApp')
    .component('loginComponent', {
        controller: function ($http, $window){
            this.email = '';
            this.password = '';
            console.log('ok')

            this.auth = function auth(){
                $http({
                    method: 'POST',
                    url: '/api/login',
                    data: {email: this.email, password: this.password},
                }).then(function mySuccess(response) {
                    $window.sessionStorage.setItem('UserToken', response.data.token);
                    $http.defaults.headers.common.Authorization = 'Bearer' + response.data.token;
                }, function myError(response) {
                    console.log('GET Login ERROR' + response.data.message);
                });
            }
        },

        templateUrl: 'component/login/login.view.html'
    });