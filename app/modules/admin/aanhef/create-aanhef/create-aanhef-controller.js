angular.module('polderweb')
	.controller('createAanhefCtrl',
		function($scope, $state, Aanhef, authService, bedrijf, username, geslachtOptions){

         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

            $scope.bedrijf = bedrijf;
            $scope.username = username;

            $scope.geslachtOptions = geslachtOptions;
    		$scope.addAanhef = function (form) {
    	        $scope.submitted = true;
    	        if (form.$valid) {
                    $scope.aanhefs.geslacht = Aanhef.Geslacht;
                    Aanhef.addAanhef($scope.aanhefs);
    	          $state.go('aanhef.list'); // Terug naar homepage
    	        }
    	    }
         }
	});
