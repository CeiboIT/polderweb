angular.module('polderweb')
	.controller('createSoortLidCtrl',
		function($scope, $state, SoortLid, bedrijf, username authService){
        if(authService.getToken()==null){
             $state.go('login');
         }else{

            $scope.bedrijf = bedrijf;
            $scope.username = username;

    		$scope.addSoortLid = function (form) {
    	         $scope.submitted = true;
    	        if (form.$valid) {
                    SoortLid.addSoortLid($scope.soortlid.soortlid,$scope.soortlid.omschrijving);
    	             $state.go('adminLidsoorten'); // Terug naar homepage
    	        }
        	}
        }
	});
