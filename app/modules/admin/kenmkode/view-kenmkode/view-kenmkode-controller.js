angular.module('polderweb')
  .controller('viewKenmKodeCtrl',
    function ($scope, KenmKode, $state, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

	  KenmKode.getKenmKode($stateParams.kenmkodeId).then(function(res){
        $scope.kenmkode = res;
      });

        $scope.kenmkodeService = KenmKode;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            KenmKode.updateKenmKode($scope.kenmkode);
             $state.go('kenmkode.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('kenmkode.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            KenmKode.delKenmKode($scope.kenmkode.KenmKode,$scope.kenmkode.Omschrijving);
            $state.go('kenmkode.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         KenmKode.getKenmKode($stateParams.kenmkodeId).then(function(res){
          $scope.kenmkode = res;
         });
      };

      $scope.clickNext = function () {
        KenmKode.nextKenmKode($scope.kenmkode.KenmKode,function (kenmkodeId) {
          if (kenmkodeId) {
            $scope.kenmkode = kenmkodeId;
          }
        });
      };

      $scope.clickPre = function () {
        KenmKode.preKenmKode($scope.kenmkode.KenmKode, function (kenmkodeId) {
          if (kenmkodeId) {
            $scope.kenmkode = kenmkodeId;
          }
        });
      };
//  }
    });
