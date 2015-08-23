angular.module('polderweb')
	.controller('createCategorieCtrl',
		function($scope, $state,Categorie,authService){
         if(authService.getToken()==null){
           $state.go('login');
         }else{
		 $scope.addCategorie = function (form) {
	        $scope.submitted = true;
	        if (form.$valid) {
                Categorie.addCategorie( $scope.categories.categorie, $scope.categories.omschrijving);
	          $state.go('adminCategorie'); // Terug naar homepage
	        }
    	}
         }

	});
