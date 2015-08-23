angular.module('polderweb')
	.controller('createTitelCtrl',
		function($scope, $state,Titel,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addTitel = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Titel.addTitel( $scope.titels.titel, $scope.titels.omschrijving);
	          $state.go('adminTitel'); // Terug naar homepage
	        }
    	}
         }

	});
