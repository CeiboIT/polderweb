angular.module('polderweb')
  .controller('viewFunctieCtrl',
    function ($scope, Functie, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

    $scope.bedrijf = bedrijf;
    $scope.username = username;

	  Functie.getFunctie($stateParams.functieId).then(function(res){
        $scope.functie = res;
      });

        $scope.functieService = Functie;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Functie.updateFunctie($scope.functie);
             $state.go('functie.list');
        }
      };

        $scope.deletionOnSuccess = function() {
            $state.go('functie.list')
        };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            Functie.delFunctie($scope.functie.Functie,$scope.functie.Omschrijving);
            $state.go('functie.list'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         Functie.getFunctie($stateParams.functieId).then(function(res){
          $scope.functie = res;
         });
      };

      $scope.clickNext = function () {
        Functie.nextFunctie($scope.functie.Functie,function (functieId) {
          if (functieId) {
            $scope.functie = functieId;
          }
        });
      };

      $scope.clickPre = function () {
        Functie.preFunctie($scope.functie.Functie, function (functieId) {
          if (functieId) {
            $scope.functie = functieId;
          }
        });
      };
//  }
    });
