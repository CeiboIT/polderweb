angular.module('polderweb')
  .controller('viewPersoonCtrl',
    function ($scope, Persoon, Aanhef, $state, $stateParams, Person, bedrijf, authService) {
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

      Aanhef.findAll().then(function(res) {
        console.log(res);
        $scope.aanhef = res;
      });

      $scope.sexList = [
        {"name": "Male"},
        {"name": "Female"},
        {"name": "Other"}
      ];

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


  $scope.open1 = function($event) { $scope.status.opened1 = true; };
  $scope.open2 = function($event) { $scope.status.opened2 = true; };
  $scope.open3 = function($event) { $scope.status.opened3 = true; };
  $scope.open4 = function($event) { $scope.status.opened4 = true; };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened1: false,
    opened2: false,
    opened3: false,
    opened4: false
  };


//      }
    });
