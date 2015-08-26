var RegisterController= ['authService', 'flash', function(authService, flash) {

    var ctrlContext = this;
    //our model that will interact with the api
    var auth = {
        username: '',
        password: ''
    };

    //Public methods.
    function submit (data) {
        authService.createUser(data, function callback(err) {
            flash.error = err.data;
        })
    }

    function comparePasswords (val1, val2) {
        //Don't need to use it often

        if(!!val1 && !!val2) {
            if(val1 == val2) {
                flash.error= '';
                flash.success = 'The passwords are equals';
                ctrlContext.invalidPass = false;

            } else {
                flash.error = 'The passwords are not equals';
                flash.success= '';
                ctrlContext.invalidPass = true;
            }
        }

    }

    //A kind of "export" function, getting ready for angular 2.0 and more clever syntax
    //in this object we will choose which functions will be public
    angular.extend(ctrlContext, {
        model: auth,
        comparePasswords: comparePasswords,
        submit: submit
    })

}];

angular.module('polderweb.auth')
    .controller('RegisterController', RegisterController);
