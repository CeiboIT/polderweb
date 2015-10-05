angular.module('polderweb')
	.controller('createCategorieCtrl',
		function($scope, $state, Categorie, bedrijf, authService){
         if(authService.getToken()==null){
           $state.go('auth.login');
         }else{

         $scope.bedrijf = bedrijf;

		 $scope.addCategorie = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Categorie.addCategorie($scope.categories);
	          $state.go('categorie.list'); // Terug naar homepage
	        }
    	}
         }

	});
