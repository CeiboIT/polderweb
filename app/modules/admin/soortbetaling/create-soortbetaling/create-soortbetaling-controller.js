angular.module('polderweb')
	.controller('createSoortBetalingCtrl',
		function($scope, $state,SoortBetaling,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addSoortBetaling = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                SoortBetaling.addSoortBetaling( $scope.soortbetalings.soortbetaling, $scope.soortbetalings.omschrijving);
	          $state.go('adminSoortBetaling'); // Terug naar homepage
	        }
    	}
         }

	});
