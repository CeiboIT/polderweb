//use the array syntax or $injector for define a the controller function with his dependencies, or it will break when minified.

var LoginCtrl = ['User', '$state', 'flash','homeState',function (User,$state, flash, homeState) {
    var ctrl = this;
    ctrl.login = function() {
        //Todo refactor this with an http interceptor
// temporary 20150826 couldn't pass login
//        if(authService.getToken()!=null){
//            $state.go('home');
//        } else {

            User.getUser(ctrl.auth.username).then(function(data){

                if(!data) {
                    flash.error = 'Invalid username'
                } else {
                    if(data.Passwrd == ctrl.auth.password) {
                        $state.go(homeState);
                    } else {
                        flash.error = 'Invalid password'
                    }
                }
            });

//        }
    };
}];

angular.module('polderweb.auth')
  .controller('LoginCtrl', LoginCtrl);
