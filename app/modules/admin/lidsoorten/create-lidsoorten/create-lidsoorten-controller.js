angular.module('polderweb')
	.controller('createSoortLidCtrl',
		function($scope, $state,Soortlid,authService){
        if(authService.getToken()==null){
             $state.go('login');
         }else{
    		$scope.addSoortlid = function (form) {
    	         $scope.submitted = true;
    	        if (form.$valid) {
                    Soortlid.addSoortlid($scope.soortlid.soortlid,$scope.soortlid.omschrijving);
    	             $state.go('adminLidsoorten'); // Terug naar homepage
    	        }
        	}
        }
	});
