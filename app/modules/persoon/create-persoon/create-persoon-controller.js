angular.module('polderweb')
	.controller('createPersoonCtrl',
		function($scope, $state, Persoon, bedrijf, username, authService){
         if(authService.getToken()==null){
             $state.go('auth.login');
         }else{

           $scope.bedrijf = bedrijf;
           $scope.username = username;

    		$scope.addPersoon = function (form) {
    	         $scope.submitted = true;
    	        if (form.$valid) {
                    Persoon.addPersoon($scope.persoon);
    	            $state.go('persoon.list');
    	        }
        	}
        }
	});
