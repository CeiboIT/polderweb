angular.module('polderweb')
  .controller('viewCategorieCtrl',
    function ($scope, Categorie, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      Categorie.getCategorie($stateParams.categorieId).then(function(res){
        $scope.categorie = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Categorie.updateCategorie($scope.categorie.Categorie,$scope.categorie.Omschrijving);
             $state.go('adminCategorie');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Categorie.delCategorie($scope.categorie.Categorie,$scope.categorie.Omschrijving);
            $state.go('adminCategorie'); // Terug naar homepage
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
  }
    });
