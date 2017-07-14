var routerApp = angular.module('routerApp');

class AuthService {
    constructor($http, $window){
        this.$http = $http;
        this.$window = $window;
        this.myToken = undefined;
    }

    checkLogin(){
        if (this.getToken() !=null){
            return true;
        }
        return false;
    }

    setToken(myToken){
        this.myToken = myToken;
        this.saveSessionStorage(myToken);
    }

    getToken(){
        if (this.myToken != undefined){
            return this.myToken;
        } else{
            if (this.loadSessionStorage() != null){
                return this.loadSessionStorage();
            } else{
                return undefined;
            }
        }
    }

    loadSessionStorage(){
        return this.$window.sessionStorage.getItem('UserToken');
    }

    saveSessionStorage(myToken){
        this.$window.sessionStorage.setItem('UserToken', myToken);
    }

    dropSessionStorage(){
        this.$window.localStorage.removeItem('UserToken');
    }
}

routerApp.service('AuthService', AuthService);