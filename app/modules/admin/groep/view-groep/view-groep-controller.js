angular.module('polderweb')
  .controller('viewGroepCtrl',
    function ($scope, Groep, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      Groep.getGroep($stateParams.groepId).then(function(res){
        $scope.groep = res;
      });
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Groep.updateGroep($scope.groep.Groep,$scope.groep.Omschrijving);
             $state.go('adminGroep');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Groep.delGroep($scope.groep.Groep,$scope.groep.Omschrijving);
            $state.go('adminGroep'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Groep.getGroep($stateParams.groepId).then(function(res){
          $scope.groep = res;
         });
      };

      $scope.clickNext = function () {
        Groep.nextGroep($scope.groep.Groep,function (groepId) {
          if (groepId) {
            $scope.groep = groepId;
          }
        });
      };

      $scope.clickPre = function () {
        Groep.preGroep($scope.groep.Groep, function (groepId) {
          if (groepId) {
            $scope.groep = groepId;
          }
        });
      };
  }
    });
