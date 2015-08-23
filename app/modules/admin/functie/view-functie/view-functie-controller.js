angular.module('polderweb')
  .controller('viewFunctieCtrl',
    function ($scope, Functie, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      Functie.getFunctie($stateParams.functieId).then(function(res){
        $scope.functie = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Functie.updateFunctie($scope.functie.Functie,$scope.functie.Omschrijving);
             $state.go('adminFunctie');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Functie.delFunctie($scope.functie.Functie,$scope.functie.Omschrijving);
            $state.go('adminFunctie'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Functie.getFunctie($stateParams.functieId).then(function(res){
          $scope.functie = res;
         });
      };

      $scope.clickNext = function () {
        Functie.nextFunctie($scope.functie.Functie,function (functieId) {
          if (functieId) {
            $scope.functie = functieId;
          }
        });
      };

      $scope.clickPre = function () {
        Functie.preFunctie($scope.functie.Functie, function (functieId) {
          if (functieId) {
            $scope.functie = functieId;
          }
        });
      };
  }
    });
