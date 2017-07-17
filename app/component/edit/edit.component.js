angular.module('routerApp')
    .component('editComponent', {
        templateUrl: 'component/edit/edit.view.html',
        controller: function (AuthService, jwtHelper, $http, $state) {
            var tokenPayload = jwtHelper.decodeToken(AuthService.getToken());

            this.email = tokenPayload.email;
            this.username = tokenPayload.username;
            this.firstname = tokenPayload.firstname;
            this.lastname = tokenPayload.lastname;
            this.address = tokenPayload.address;

            this.updateProfile = function updateProfile() {
                $http({
                    method: 'PUT',
                    url: '/api/edit',
                    data: {email: this.email, username: this.username, firstname: this.firstname, lastname: this.lastname, address: this.address},
                }).then(function mySuccess(response) {
                    AuthService.setToken(response.data.token);
                    $state.go('private.home');
                }, function myError(response) {
                    console.log('GET edit error' + response.data.message);
                });
            }

            this.updatePassword = function updatePassword() {

                if (this.oldpassword !== '' && this.newpassword !== '') {
                    $http({
                        method: 'PUT',
                        url: '/api/edit/password',
                        data: {
                            oldpassword: this.oldpassword,
                            newpassword: this.newpassword
                        },
                    }).then(function mySuccess(response) {
                        console.log('Password updated')
                    }, function myError(response) {
                        console.log('GET edit/password error' + response.data.message);
                    });
                }
            }
        }
    });
