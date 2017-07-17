/**
 * Created by vchris on 17/7/2017.
 */

angular.module("routerApp")
    .component('editComponent', {
        controller: EditController,
        templateUrl : 'components/edit/edit.view.html'

    });

function EditController ($http, $state, AuthService, jwtHelper) {

    var token = jwtHelper.decodeToken(AuthService.getToken());

    this.firstname = token.firstname;
    this.lastname = token.lastname;
    this.email = token.email;
    this.username = token.username;
    this.address = token.address;

    this.edit = function(){

        if (this.firstname === token.firstname && this.lastname === token.lastname &&
            this.email === token.email && this.username === token.username &&
            this.address === token.address){

                console.log('NO CHANGE');
                return;
        }else{
            console.log('CHANGE');
        }

        $http({
            method : "PUT",
            url : "/api/edit",
            data: { firstname: this.firstname, lastname: this.lastname, email: this.email,
                username: this.username, address: this.address }
        }).then(function mySuccess(response) {
            console.log('PUT EDIT ' + response.data.token);

            AuthService.setToken(response.data.token);

            $state.go('private.home');
        }, function myError(response) {
            console.log('GET EDIT ERROR ' + response.data);
        });

    };

    this.editPass = function(){
        const ctrl = this;
        if (ctrl.oldpass === '' || ctrl.newpass === '' || ctrl.oldpass === ctrl.newpass){
            console.log('NO pass CHANGE');
            return;
        }else{
            console.log('pass CHANGE');
        }

        $http({
            method : "PUT",
            url : "/api/editpass",
            data: { oldpass: this.oldpass, newpass: this.newpass }
        }).then(function mySuccess(response) {
            console.log('PUT EDIT pass ' + response.data);

            $state.go('private.home');
        }, function myError(response) {
            console.log('PUT EDIT pass ERROR ' + response.data);

            ctrl.errorMessage = response.data.message;
            ctrl.oldpass = '';
            ctrl.newpass = '';
        });

    };

};
