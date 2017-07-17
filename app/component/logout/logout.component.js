angular.module('routerApp')
    .component('logoutComponent', {
        controller: function (AuthService, $state) {
            AuthService.dropSessionStorage();
            $state.go('public.login');
        }
    });
