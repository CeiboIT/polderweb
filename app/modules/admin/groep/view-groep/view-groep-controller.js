angular.module('polderweb')
  .controller('viewGroepCtrl',
    function ($scope, Groep, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

    $scope.bedrijf = bedrijf;
    $scope.username = username;

	  Groep.getGroep($stateParams.groepId).then(function(res){
        $scope.groep = res;
      });

        $scope.groepService = Groep;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Groep.updateGroep($scope.groep);
             $state.go('groep.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('groep.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Groep.delGroep($scope.groep.Groep,$scope.groep.Omschrijving);
            $state.go('groep.list'); // Terug naar homepage
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
//  }
    });
