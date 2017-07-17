angular.module('routerApp')
    .component('homeComponent', {
        templateUrl: 'component/home/home.view.html',
        controller: function (AuthService, jwtHelper) {
            var tokenPayload = jwtHelper.decodeToken(AuthService.getToken());

            this.username = tokenPayload.username;
        }
    });