angular.module('polderweb')
    .controller('createContriburieregelsCtrl',
        function($scope, $state, Contriburieregels, bedrijf, username, authService){
         if(authService.getToken()==null){
             $state.go('auth.login');
         }else{

           $scope.bedrijf = bedrijf;
           $scope.username = username;

            $scope.addContriburieregels = function (form) {
                 $scope.submitted = true;
                if (form.$valid) {
                    Contriburieregels.addContriburieregels($scope.persoon);
                    $state.go('persoon.list');
                }
            }
        }
    });
