angular.module('polderweb')
	.controller('createAanhefCtrl',
		function($scope, $state,Aanhef,authService, geslachtOptions){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

             $scope.geslachtOptions = geslachtOptions;

		 $scope.addAanhef = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Aanhef.addAanhef( $scope.aanhefs.aanhef, $scope.aanhefs.omschrijving);
	          $state.go('aanhef.list'); // Terug naar homepage
	        }
    	}
         }

	});
