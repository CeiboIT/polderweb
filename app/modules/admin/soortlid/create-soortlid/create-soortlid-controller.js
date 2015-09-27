angular.module('polderweb')
	.controller('createSoortLidCtrl',
		function($scope, $state,SoortLid,authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{
		 $scope.addSoortLid = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                SoortLid.addSoortLid($scope.soortlids);
	          $state.go('soortlid.list'); // Terug naar homepage
	        }
    	}
         }
	});
