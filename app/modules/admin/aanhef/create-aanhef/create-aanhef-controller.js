angular.module('polderweb')
	.controller('createAanhefCtrl',
		function($scope, $state,Aanhef,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addAanhef = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Aanhef.addAanhef( $scope.aanhefs.aanhef, $scope.aanhefs.omschrijving);
	          $state.go('adminAanhef'); // Terug naar homepage
	        }
    	}
         }

	});
