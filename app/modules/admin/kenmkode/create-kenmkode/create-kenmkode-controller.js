angular.module('polderweb')
	.controller('createKenmKodeCtrl',
		function($scope, $state, KenmKode, bedrijf, username, params, authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{
             $scope.bedrijf = bedrijf;
             $scope.username = username;

    		 $scope.addKenmKode = function (form) {
    	        $scope.submitted = true;
    	        if (form.$valid) {
                    $scope.kenmkodes.Kenmerk = params[0];
                    KenmKode.addKenmKode($scope.kenmkodes);
    	            $state.go('kenmkode.list[kenmerk]', { kenmerk : params[0] , omschrijving : params[1]}); // Terug naar homepage
    	        }
        	 }
         }

	});
