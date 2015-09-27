angular.module('polderweb')
	.controller('createFunctieCtrl',
		function($scope, $state,Functie,authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

		 $scope.addFunctie = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Functie.addFunctie($scope.functies);
	          $state.go('functie.list'); // Terug naar homepage
	        }
    	}
         }

	});
