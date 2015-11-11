angular.module('polderweb')
    .controller('createContriburieregelsCtrl',
        function($scope, $state, Contriburieregels, bedrijf, username, params, authService){
         if(authService.getToken()==null){
             $state.go('auth.login');
         }else{

           $scope.bedrijf = bedrijf;
           $scope.username = username;

           $scope.params = params;
           $scope.lidnr = params;

           $scope.contrib = {};
           $scope.contrib.LidNr = $scope.lidnr;

            $scope.addContriburieregels = function (form) {
                 $scope.submitted = true;
                if (form.$valid) {
                    Contriburieregels.addContriburieregels($scope.contrib);
                    $state.go('contriburieregels.list', { lidnr : $scope.lidnr}); // Terug naar homepage
                }
            }
        }
    });
