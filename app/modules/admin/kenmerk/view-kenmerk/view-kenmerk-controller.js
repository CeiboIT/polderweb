angular.module('polderweb')
  .controller('viewKenmerkCtrl',
    function ($scope, Kenmerk, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

    $scope.bedrijf = bedrijf;
    $scope.username = username;

	  Kenmerk.getKenmerk($stateParams.kenmerkId).then(function(res){
        $scope.kenmerk = res;
      });

        $scope.kenmerkService = Kenmerk;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Kenmerk.updateKenmerk($scope.kenmerk);
             $state.go('kenmerk.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('kenmerk.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Kenmerk.delKenmerk($scope.kenmerk.Kenmerk,$scope.kenmerk.Omschrijving);
            $state.go('kenmerk.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Kenmerk.getKenmerk($stateParams.kenmerkId).then(function(res){
          $scope.kenmerk = res;
         });
      };

      $scope.clickNext = function () {
        Kenmerk.nextKenmerk($scope.kenmerk.Kenmerk,function (kenmerkId) {
          if (kenmerkId) {
            $scope.kenmerk = kenmerkId;
          }
        });
      };

      $scope.clickPre = function () {
        Kenmerk.preKenmerk($scope.kenmerk.Kenmerk, function (kenmerkId) {
          if (kenmerkId) {
            $scope.kenmerk = kenmerkId;
          }
        });
      };
//  }
    });
