//use the array syntax or $injector for define a the controller function with his dependencies, or it will break when minified.

var LoginCtrl = ['authService', '$state', 'flash',function (authService,$state, flash) {
    var ctrl = this;
    ctrl.login = function() {
        //Todo refactor this with an http interceptor
// temporary 20150826 couldn't pass login
//        if(authService.getToken()!=null){
//            $state.go('home');
//        } else {
            authService.login(ctrl.auth, function error(err){
                if(err) {
                    flash.error = err.message;
//                }else{
//                    $state.go('home');
                }
            })
//        }
    };
}];

angular.module('polderweb.auth')
  .controller('LoginCtrl', LoginCtrl);
