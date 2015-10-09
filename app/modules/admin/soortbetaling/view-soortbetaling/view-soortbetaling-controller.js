angular.module('polderweb')
  .controller('viewSoortBetalingCtrl',
    function ($scope, SoortBetaling, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

       $scope.bedrijf = bedrijf;
       $scope.username = username;

	  SoortBetaling.getSoortBetaling($stateParams.soortbetalingId).then(function(res){
        $scope.soortbetaling = res;
      });

        $scope.soortbetalingService = SoortBetaling;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            SoortBetaling.updateSoortBetaling($scope.soortbetaling);
             $state.go('soortbetaling.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('soortbetaling.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            SoortBetaling.delSoortBetaling($scope.soortbetaling.SoortBetaling,$scope.soortbetaling.Omschrijving);
            $state.go('soortbetaling.list'); // Terug naar homepage
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
//  }
    });
