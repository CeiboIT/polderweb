angular.module('polderweb')
	.controller('createKenmerkCtrl',
		function($scope, $state,Kenmerk,authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

		 $scope.addKenmerk = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Kenmerk.addKenmerk($scope.kenmerks);
	          $state.go('kenmerk.list'); // Terug naar homepage
	        }
    	}
         }

	});
