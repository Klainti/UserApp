/**
 * Created by vchris on 13/7/2017.
 */

angular.module('routerApp')
    .component('appComponent', {
        controller: AppController,
        templateUrl: '/app.template.html'
    });


function AppController() {
    this.auth = function(){
        return true;
    };
};