angular.module('polderweb')
	.controller('createFunctieCtrl',
		function($scope, $state,Functie,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addFunctie = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Functie.addFunctie( $scope.functies.functie, $scope.functies.omschrijving);
	          $state.go('adminFunctie'); // Terug naar homepage
	        }
    	}
         }

	});
