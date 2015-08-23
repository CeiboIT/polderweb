angular.module('polderweb')
	.controller('createKenmerkCtrl',
		function($scope, $state,Kenmerk,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addKenmerk = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Kenmerk.addKenmerk( $scope.kenmerks.kenmerk, $scope.kenmerks.omschrijving);
	          $state.go('adminKenmerk'); // Terug naar homepage
	        }
    	}
         }

	});
