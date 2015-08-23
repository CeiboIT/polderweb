angular.module('polderweb')
  .controller('viewKenmKodeCtrl',
    function ($scope, KenmKode, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{

  	  KenmKode.getKenmKode($stateParams.kenmerk, $stateParams.kode).then(function(res){ //master-detail
        $scope.kenmkode = res;
      });

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            KenmKode.updateKenmKode($scope.kenmkode.Kenmerk, $scope.kenmkode.Kode, $scope.kenmkode.Omschrijving);
             $state.go('adminKenmKode');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            KenmKode.delKenmKode($scope.kenmkode.Kenmerk, $scope.kenmkode.Kode, $scope.kenmkode.Omschrijving);
            $state.go('adminKenmKode');
          }
      };

      $scope.clickCancel = function () {
         KenmKode.getKenmKode($stateParams.kenmerk, $stateParams.kode).then(function(res){ //master-detail
          $scope.kenmkode = res;
         });
      };
  }
    });
