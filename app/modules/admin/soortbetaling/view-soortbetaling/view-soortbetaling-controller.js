angular.module('polderweb')
  .controller('viewSoortBetalingCtrl',
    function ($scope, SoortBetaling, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      SoortBetaling.getSoortBetaling($stateParams.soortbetalingId).then(function(res){
        $scope.soortbetaling = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            SoortBetaling.updateSoortBetaling($scope.soortbetaling.SoortBetaling,$scope.soortbetaling.Omschrijving);
             $state.go('adminSoortBetaling');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            SoortBetaling.delSoortBetaling($scope.soortbetaling.SoortBetaling,$scope.soortbetaling.Omschrijving);
            $state.go('adminSoortBetaling'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         SoortBetaling.getSoortBetaling($stateParams.soortbetalingId).then(function(res){
          $scope.soortbetaling = res;
         });
      };

      $scope.clickNext = function () {
        SoortBetaling.nextSoortBetaling($scope.soortbetaling.SoortBetaling,function (soortbetalingId) {
          if (soortbetalingId) {
            $scope.soortbetaling = soortbetalingId;
          }
        });
      };

      $scope.clickPre = function () {
        SoortBetaling.preSoortBetaling($scope.soortbetaling.SoortBetaling, function (soortbetalingId) {
          if (soortbetalingId) {
            $scope.soortbetaling = soortbetalingId;
          }
        });
      };
  }
    });
