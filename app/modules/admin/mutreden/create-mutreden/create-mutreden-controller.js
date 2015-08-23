angular.module('polderweb')
	.controller('createMutRedenCtrl',
		function($scope, $state,MutReden,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addMutReden = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                MutReden.addMutReden( $scope.mutredens.mutreden, $scope.mutredens.omschrijving);
	          $state.go('adminMutReden'); // Terug naar homepage
	        }
    	}
         }

	});
