angular.module('polderweb.user')
    .controller('EditUserCtrl',
        function($scope, $state, User, authService, userData){

            if(authService.getToken()==null){
                 $state.go('auth.login');
             }else{
                $scope.user = userData;
                $scope.editUser = function (form) {
                     $scope.submitted = true;
                    if (form.$valid) {
                        User.updateUser($scope.user);
                        $state.go('home.init');
                    }
                }
            }
        });
