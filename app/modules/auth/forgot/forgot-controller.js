/**
 * Created by mmasuyama on 8/31/2015.
 */
var ForgotController= ['User', 'flash', function(User, flash) {

    var ctrlContext = this;
    //our model that will interact with the api
    var auth = {
        username: '',
        password: ''
    };

    function checkUserName (userName) {
        User.checkUserName(userName)
            .then(function error(err){
                ctrlContext.validName= false;
                flash.error = 'Username is not in use'
            }, function success(data){
                ctrlContext.validName = true;
                flash.success = 'The username is right'
            })
    }

    function submit (data) {
        User.updateUser(data.username, "Forgot&^%")
            .then(function(success){
                if(success) {
                    flash.success = 'We have sent and email with your new password.'
                }
                else {
                    flash.error = 'There was an error, please, retry later'
                }
            })
    }

    //A kind of "export" function, getting ready for angular 2.0 and more clever syntax
    //in this object we will choose which functions will be public
    angular.extend(ctrlContext, {
        model: auth,
        submit: submit,
        checkUserName : checkUserName
    })

}];

angular.module('polderweb.auth')
    .controller('ForgotController', ForgotController);
