angular.module('polderweb.user')
	.controller('createUserCtrl',
		function($scope, $state, User, bedrijf, authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{

         $scope.bedrijf = bedrijf;

		 $scope.addUser = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                User.addUser( $scope.users.user, $scope.users.passwrd);
	          $state.go('user.list'); // Terug naar homepage
	        }
    	}
         }

	});
