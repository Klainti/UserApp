/**
 * Created by vchris on 17/7/2017.
 */

angular.module("routerApp")
    .component('logoutComponent', {
        controller: LogoutController,
    });

function LogoutController ($state, AuthService) {

    AuthService.resetToken();
    $state.go('public.login');

};
