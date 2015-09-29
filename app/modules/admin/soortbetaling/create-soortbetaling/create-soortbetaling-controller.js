angular.module('polderweb')
	.controller('createSoortBetalingCtrl',
		function($scope, $state,SoortBetaling,authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

		 $scope.addSoortBetaling = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                SoortBetaling.addSoortBetaling($scope.soortbetalings);
	          $state.go('soortbetaling.list'); // Terug naar homepage
	        }
    	}
         }

	});
