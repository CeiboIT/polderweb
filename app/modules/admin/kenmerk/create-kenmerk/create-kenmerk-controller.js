angular.module('polderweb')
	.controller('createKenmerkCtrl',
		function($scope, $state, $window, Kenmerk, bedrijf, username, authService){

         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

            $scope.bedrijf = bedrijf;
            $scope.username = username;

    		 $scope.addKenmerk = function (form) {
    	        $scope.submitted = true;
    	        if (form.$valid) {
                    Kenmerk.addKenmerk($scope.kenmerks);
    	          $state.go('kenmerk.list').then(function() {
                    $window.location.reload();
                  }); // Terug naar homepage
    	        }
        	 }
         }

	});
