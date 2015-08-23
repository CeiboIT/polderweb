angular.module('polderweb')
	.controller('createGroepCtrl',
		function($scope, $state,Groep,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addGroep = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Groep.addGroep( $scope.groeps.groep, $scope.groeps.omschrijving);
	          $state.go('adminGroep'); // Terug naar homepage
	        }
    	}
         }

	});
