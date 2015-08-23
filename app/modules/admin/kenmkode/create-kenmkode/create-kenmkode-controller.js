angular.module('polderweb')
	.controller('createKenmKodeCtrl',
		function($scope, $state, KenmKode, authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addKenmKode = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                KenmKode.addKenmKode( $scope.kenmkodes.kode, $scope.kenmkodes.omschrijving);
	          $state.go('adminKenmKode'); // Terug naar homepage
	        }
    	}
         }

	});
