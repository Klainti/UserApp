/**
 * Created by vchris on 12/7/2017.
 */

angular.module("routerApp")
    .component('homeComponent', {
        controller: HomeController,
        templateUrl : 'components/home/home.view.html'

    });

function HomeController ($http) {

    this.auth = function() {

        console.log('HI');

        $http({
            method : "GET",
            url : "/api/home",
        }).then(function mySuccess(response) {

            console.log(response.data);

        }, function myError(response) {

            console.log(response.data);

        });

    };

};

