angular.module('polderweb')
	.controller('createGroepCtrl',
		function($scope, $state,Groep,authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

		 $scope.addGroep = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Groep.addGroep($scope.groeps);
	          $state.go('groep.list'); // Terug naar homepage
	        }
    	}
         }

	});
