angular.module('routerApp')
    .component('loginComponent', {
        controller: function ($http, AuthService,$state){
            this.email = '';
            this.password = '';
            console.log('ok')

            this.auth = function auth(){
                myctrl = this
                $http({
                    method: 'POST',
                    url: '/api/login',
                    data: {email: this.email, password: this.password},
                }).then(function mySuccess(response) {
                    AuthService.setToken(response.data.token);
                    $state.go('private.home');
                }, function myError(response) {
                    myctrl.validationError = response.data.message;
                });
            }
        },

        templateUrl: 'component/login/login.view.html'
    });