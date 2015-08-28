var RegisterController= ['User', 'flash', function(User, flash) {

    var ctrlContext = this;
    //our model that will interact with the api
    var auth = {
        username: '',
        password: ''
    };

    //

    function checkUserName (userName) {
        User.checkUserName(userName)
            .then(function success(result){
                ctrlContext.validName = true;
                flash.success = 'Username available'
            }, function error(err){
                ctrlContext.validName = false;
                flash.error = 'Username already in use'
            })
    }

    function submit (data) {
        User.addUser(data)
            .then(function(success){
                if(success) {
                    flash.success = 'Your account has been created with success'
                }
                else {
                    flash.error = 'There was an error, please, retry later'
                }
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
        submit: submit,
        checkUserName : checkUserName
    })

}];

angular.module('polderweb.auth')
    .controller('RegisterController', RegisterController);
