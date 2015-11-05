angular.module('polderweb')
    .controller('createContriburieregelsCtrl',
        function($scope, $state, Contriburieregels, bedrijf, username, params, authService){
         if(authService.getToken()==null){
             $state.go('auth.login');
         }else{

           $scope.bedrijf = bedrijf;
           $scope.username = username;

           $scope.params = params;
           $scope.lidnr = params[0];

            $scope.addContriburieregels = function (form) {
                 $scope.submitted = true;
                if (form.$valid) {
                    Contriburieregels.addContriburieregels($scope.contrib);
                    $state.go('persoon.list', { lidnr : params[0]}); // Terug naar homepage
                }
            }
        }
    });
