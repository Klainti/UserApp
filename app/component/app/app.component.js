angular.module('routerApp')
    .component('appComponent', {
        controller: function (AuthService){
           this.isAuth = function () {
               return AuthService.checkLogin();
           };
        },

        templateUrl: 'component/app/app.template.html'
    });
