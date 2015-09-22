angular.module('polderweb')
  .controller('viewPersoonCtrl',
    function ($scope, Persoon, $state, $stateParams, Person, authService) {
/*
      if(authService.getToken()==null){
             $state.go('login');
      }else{
*/
		  Persoon.getPersoon($stateParams.persoonId).then(function(res){
		    $scope.pers = res;
//		console.log('resultaat na getPersoon : '
//		    + JSON.stringify($scope.pers[0].LidNr) + ' '
//		    + JSON.stringify($scope.pers[0].Naam) + ' '
//		    + JSON.stringify($scope.pers[0].Email)
//			);
      });

          $scope.clickSave = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Persoon.updatePersoon($scope.pers.LidNr
//				                    , $scope.pers.Naam);
				                    , $scope.pers);
                $state.go('persoon.list');
            }
          };

          $scope.clickDel = function () {
              var msg = confirm("Verwijderen ? J/N");
              if (msg == true) {
                Persoon.delPersoon($scope.pers.LidNr
//				                 , $scope.pers.Naam
								 , $scope.pers);
                 $state.go('persoon.list'); // Terug naar homepage
              }
          };

          $scope.clickCancel = function () {
            $state.go('persoon.list');
/*          Persoon.getPersoon($stateParams.persoonId).then(function(res){
              $scope.pers = res;
            });
*/
          };

          $scope.clickNext = function () {
            Persoon.nextPersoon($scope.pers.LidNr,function (persoon) {
              if (persoon) {
                $scope.pers = persoon;
//		console.log('Next : ' + JSON.stringify($scope.pers.LidNr) );
				}
            });
          };

          $scope.clickPre = function () {
            Persoon.prePersoon($scope.pers.LidNr, function (persoon) {
              if (persoon) {
                $scope.pers = persoon;
//		console.log('Pre : ' + JSON.stringify($scope.pers.LidNr) );
				}
            });
          };
//      }
    });
