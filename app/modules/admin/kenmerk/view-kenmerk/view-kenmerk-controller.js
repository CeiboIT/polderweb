angular.module('polderweb')
  .controller('viewKenmerkCtrl',
    function ($scope, Kenmerk, $state, $stateParams, authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      Kenmerk.getKenmerk($stateParams.kenmerkId).then(function(res){
        $scope.kenmerk = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Kenmerk.updateKenmerk($scope.kenmerk.Kenmerk,$scope.kenmerk.Omschrijving);
             $state.go('adminKenmerk');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Kenmerk.delKenmerk($scope.kenmerk.Kenmerk, $scope.kenmerk.Omschrijving);
            $state.go('adminKenmerk'); // Terug naar homepage
          }
      };

      $scope.clickDetails = function (kenmerk) { //master-detail
        //Kenmerk.delKenmerk($scope.kenmerk.Kenmerk,$scope.kenmerk.Omschrijving);
        //$scope.kenmerk = kenmerk.Kenmerk;
        $scope.kenmerk = $stateParams.kenmerkId;
        $state.go('adminKenmKode'); 
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
  }
    });
