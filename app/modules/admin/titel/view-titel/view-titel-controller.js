angular.module('polderweb')
  .controller('viewTitelCtrl',
    function ($scope, Titel, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      Titel.getTitel($stateParams.titelId).then(function(res){
        $scope.titel = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Titel.updateTitel($scope.titel.Titel,$scope.titel.Omschrijving);
             $state.go('adminTitel');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Titel.delTitel($scope.titel.Titel,$scope.titel.Omschrijving);
            $state.go('adminTitel'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Titel.getTitel($stateParams.titelId).then(function(res){
          $scope.titel = res;
         });
      };

      $scope.clickNext = function () {
        Titel.nextTitel($scope.titel.Titel,function (titelId) {
          if (titelId) {
            $scope.titel = titelId;
          }
        });
      };

      $scope.clickPre = function () {
        Titel.preTitel($scope.titel.Titel, function (titelId) {
          if (titelId) {
            $scope.titel = titelId;
          }
        });
      };
  }
    });
