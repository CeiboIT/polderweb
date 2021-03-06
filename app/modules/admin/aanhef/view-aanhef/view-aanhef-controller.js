angular.module('polderweb')
  .controller('viewAanhefCtrl',
    function ($scope, Aanhef, $state, $stateParams, bedrijf, username, geslachtOptions) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

    $scope.bedrijf = bedrijf;
    $scope.username = username;

	  Aanhef.getAanhef($stateParams.aanhefId).then(function(res){
        $scope.aanhef = res;
      });

        $scope.aanhefService = Aanhef;

        $scope.geslachtOptions = geslachtOptions;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Aanhef.updateAanhef($scope.aanhef);
             $state.go('aanhef.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('aanhef.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Aanhef.delAanhef($scope.aanhef.Aanhef,$scope.aanhef.Omschrijving);
            $state.go('aanhef.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Aanhef.getAanhef($stateParams.aanhefId).then(function(res){
          $scope.aanhef = res;
         });
      };

      $scope.clickNext = function () {
        Aanhef.nextAanhef($scope.aanhef.Aanhef,function (aanhefId) {
          if (aanhefId) {
            $scope.aanhef = aanhefId;
          }
        });
      };

      $scope.clickPre = function () {
        Aanhef.preAanhef($scope.aanhef.Aanhef, function (aanhefId) {
          if (aanhefId) {
            $scope.aanhef = aanhefId;
          }
        });
      };
//  }
    });
