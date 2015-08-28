//use the array syntax or $injector for define a the controller function with his dependencies, or it will break when minified.

var LoginCtrl = ['User', '$state', 'flash',function (User,$state, flash) {
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
                        $state.go('home');
                    } else {
                        flash.error = 'Invalid password'
                    }
                }
            });

            /*authService.login(ctrl.auth, function error(err){
                if(err) {
                    flash.error = err.message;
//                }else{
//                    $state.go('home');
                }
            })*/
//        }
    };
}];

angular.module('polderweb.auth')
  .controller('LoginCtrl', LoginCtrl);
