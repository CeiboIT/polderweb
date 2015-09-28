angular.module('polderweb')
	.controller('createTitelCtrl',
		function($scope, $state,Titel,authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

		 $scope.addTitel = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Titel.addTitel($scope.titels);
	          $state.go('titel.list'); // Terug naar homepage
	        }
    	}
         }

	});
