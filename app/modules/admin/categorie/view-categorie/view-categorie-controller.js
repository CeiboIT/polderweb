angular.module('polderweb')
  .controller('viewCategorieCtrl',
    function ($scope, Categorie, $state, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

	  Categorie.getCategorie($stateParams.categorieId).then(function(res){
        $scope.categorie = res;
      });

        $scope.categorieService = Categorie;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Categorie.updateCategorie($scope.categorie);
             $state.go('categorie.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('categorie.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Categorie.delCategorie($scope.categorie.Categorie,$scope.categorie.Omschrijving);
            $state.go('categorie.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Categorie.getCategorie($stateParams.categorieId).then(function(res){
          $scope.categorie = res;
         });
      };

      $scope.clickNext = function () {
        Categorie.nextCategorie($scope.categorie.Categorie,function (categorieId) {
          if (categorieId) {
            $scope.categorie = categorieId;
          }
        });
      };

      $scope.clickPre = function () {
        Categorie.preCategorie($scope.categorie.Categorie, function (categorieId) {
          if (categorieId) {
            $scope.categorie = categorieId;
          }
        });
      };
//  }
    });
