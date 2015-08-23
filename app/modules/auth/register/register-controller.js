/**
 * Created by mmasuyama on 8/23/2015.
 */

var RegisterController= ['authService', 'flash', function(authService, flash) {

        //var model
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

        function comparePasswords (val1, val2, context) {
            if(!!val1 && !!val2) {
                if(val1 == val2) {
                    flash.error= '';
                    flash.success = 'The passwords are equals';
                    context.invalidPass = false;

                } else {
                    flash.error = 'The passwords are not equals';
                    flash.success= '';
                    context.invalidPass = true;
                }
            }

        };

        //A kind of "export" function, getting ready for angular 2.0 and more clever syntax
        //in this object we will choose which functions will be public
        angular.extend(this, {
            model: auth,
            comparePasswords: comparePasswords,
            submit: submit
        })

    }];
//Dependencies are declared in an array for don't lost the reference when we minify the code.






angular.module('polderweb.auth')
    .controller('RegisterController', RegisterController);
