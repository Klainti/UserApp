/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('homeComponent', {
        controller: HomeController,
        templateUrl : 'components/home/home.view.html'

    });

function HomeController ($http, AuthService, jwtHelper) {

    var token = jwtHelper.decodeToken(AuthService.getToken());
    this.username = token.username;

};

