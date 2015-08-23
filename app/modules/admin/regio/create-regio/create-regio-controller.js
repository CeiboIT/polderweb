angular.module('polderweb')
	.controller('createRegioCtrl',
		function($scope, $state,Regio,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addRegio = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Regio.addRegio( $scope.regios.regio, $scope.regios.omschrijving);
	          $state.go('adminRegio'); // Terug naar homepage
	        }
    	}
         }

	});
