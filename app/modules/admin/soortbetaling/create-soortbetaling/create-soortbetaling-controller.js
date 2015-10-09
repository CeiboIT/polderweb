angular.module('polderweb')
	.controller('createSoortBetalingCtrl',
		function($scope, $state, SoortBetaling, bedrijf, username, authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

           $scope.bedrijf = bedrijf;
           $scope.username = username;

		 $scope.addSoortBetaling = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                SoortBetaling.addSoortBetaling($scope.soortbetalings);
	          $state.go('soortbetaling.list'); // Terug naar homepage
	        }
    	}
         }

	});
