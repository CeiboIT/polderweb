angular.module('polderweb')
  .controller('viewContriburieregelsCtrl',
    function ($scope, Contriburieregels, $state, bedrijf, username, contriburieregels, $stateParams) {
       $scope.bedrijf = bedrijf;
       $scope.username = username;
       $scope.contriburieregels = contriburieregels[0];

        $scope.contriburieregelsService = Contriburieregels;

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Contriburieregels.updateContriburieregels($scope.contriburieregels);
             $state.go('contriburieregels.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('contriburieregels.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Contriburieregels.delContriburieregels($scope.contriburieregels.Contriburieregels,$scope.contriburieregels.Omschrijving);
            $state.go('contriburieregels.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Contriburieregels.getContriburieregels($stateParams.contriburieregelsId).then(function(res){
          $scope.contriburieregels = res;
         });
      };

      $scope.clickNext = function () {
        Contriburieregels.nextContriburieregels($scope.contriburieregels.Contriburieregels,function (contriburieregelsId) {
          if (contriburieregelsId) {
            $scope.contriburieregels = contriburieregelsId;
          }
        });
      };

      $scope.clickPre = function () {
        Contriburieregels.preContriburieregels($scope.contriburieregels.Contriburieregels, function (contriburieregelsId) {
          if (contriburieregelsId) {
            $scope.contriburieregels = contriburieregelsId;
          }
        });
      };
//  }
    });
