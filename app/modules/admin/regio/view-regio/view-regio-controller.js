angular.module('polderweb')
  .controller('viewRegioCtrl',
    function ($scope, Regio, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      Regio.getRegio($stateParams.regioId).then(function(res){
        $scope.regio = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Regio.updateRegio($scope.regio.Regio,$scope.regio.Omschrijving);
             $state.go('adminRegio');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Regio.delRegio($scope.regio.Regio,$scope.regio.Omschrijving);
            $state.go('adminRegio'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Regio.getRegio($stateParams.regioId).then(function(res){
          $scope.regio = res;
         });
      };

      $scope.clickNext = function () {
        Regio.nextRegio($scope.regio.Regio,function (regioId) {
          if (regioId) {
            $scope.regio = regioId;
          }
        });
      };

      $scope.clickPre = function () {
        Regio.preRegio($scope.regio.Regio, function (regioId) {
          if (regioId) {
            $scope.regio = regioId;
          }
        });
      };
  }
    });
