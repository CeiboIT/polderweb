angular.module('polderweb.user')
	.controller('createUserCtrl',
		function($scope, $state,User,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addUser = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                User.addUser( $scope.users.user, $scope.users.passwrd);
	          $state.go('adminUser'); // Terug naar homepage
	        }
    	}
         }

	});
