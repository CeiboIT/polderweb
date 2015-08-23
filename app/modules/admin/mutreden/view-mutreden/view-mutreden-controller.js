angular.module('polderweb')
  .controller('viewMutRedenCtrl',
    function ($scope, MutReden, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      MutReden.getMutReden($stateParams.mutredenId).then(function(res){
        $scope.mutreden = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            MutReden.updateMutReden($scope.mutreden.MutReden,$scope.mutreden.Omschrijving);
             $state.go('adminMutReden');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            MutReden.delMutReden($scope.mutreden.MutReden,$scope.mutreden.Omschrijving);
            $state.go('adminMutReden'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         MutReden.getMutReden($stateParams.mutredenId).then(function(res){
          $scope.mutreden = res;
         });
      };

      $scope.clickNext = function () {
        MutReden.nextMutReden($scope.mutreden.MutReden,function (mutredenId) {
          if (mutredenId) {
            $scope.mutreden = mutredenId;
          }
        });
      };

      $scope.clickPre = function () {
        MutReden.preMutReden($scope.mutreden.MutReden, function (mutredenId) {
          if (mutredenId) {
            $scope.mutreden = mutredenId;
          }
        });
      };
  }
    });
