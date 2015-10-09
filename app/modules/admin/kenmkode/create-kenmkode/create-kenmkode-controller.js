angular.module('polderweb')
	.controller('createKenmKodeCtrl',
		function($scope, $state, KenmKode, bedrijf, username, authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

             $scope.bedrijf = bedrijf;
             $scope.username = username;

		 $scope.addKenmKode = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                KenmKode.addKenmKode($scope.kenmkodes);
	          $state.go('kenmkode.list'); // Terug naar homepage
	        }
    	}
         }

	});
