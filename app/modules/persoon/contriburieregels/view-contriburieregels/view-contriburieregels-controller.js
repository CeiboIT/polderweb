angular.module('polderweb')
  .controller('viewContriburieregelsCtrl',
    function ($scope, Contriburieregels, $state, bedrijf, username, $stateParams) {
       $scope.bedrijf = bedrijf;
       $scope.username = username;

      Contriburieregels.getContriburieregels($stateParams.titelId).then(function(res){
        $scope.titel = res;
      });

        $scope.titelService = Contriburieregels;

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Contriburieregels.updateContriburieregels($scope.titel);
             $state.go('titel.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('titel.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Contriburieregels.delContriburieregels($scope.titel.Contriburieregels,$scope.titel.Omschrijving);
            $state.go('titel.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Contriburieregels.getContriburieregels($stateParams.titelId).then(function(res){
          $scope.titel = res;
         });
      };

      $scope.clickNext = function () {
        Contriburieregels.nextContriburieregels($scope.titel.Contriburieregels,function (titelId) {
          if (titelId) {
            $scope.titel = titelId;
          }
        });
      };

      $scope.clickPre = function () {
        Contriburieregels.preContriburieregels($scope.titel.Contriburieregels, function (titelId) {
          if (titelId) {
            $scope.titel = titelId;
          }
        });
      };
//  }
    });
