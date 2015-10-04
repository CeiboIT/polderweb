angular.module('polderweb')
	.controller('createPersoonCtrl',
		function($scope, $state, Persoon, bedrijf, authService){
        if(authService.getToken()==null){
             $state.go('auth.login');
         }else{
    		$scope.addPersoon = function (form) {
    	         $scope.submitted = true;
    	        if (form.$valid) {
                    Persoon.addPersoon($scope.persoon.lidnr
					                 , $scope.persoon.naam
									 );
    	             $state.go('adminPersoon');
    	        }
        	}
        }
	});
