/**
 * Created by vchris on 13/7/2017.
 */

angular.module('routerApp')
    .component('appComponent', {
        controller: AppController,
        templateUrl: 'components/app/app.view.html'
    });


function AppController(AuthService) {

    this.isAuth = () => {
        return AuthService.checkToken();
    };


};