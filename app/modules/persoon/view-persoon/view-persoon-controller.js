angular.module('polderweb')
  .controller('viewPersoonCtrl',
    function ($scope, Persoon, persoon, persoons, Aanhef, $state, $stateParams, Person, regio, soortlid, bedrijf, username, authService) {
/*
      if(authService.getToken()==null){
             $state.go('login');
      }else{
*/

      $scope.regio = regio;
      $scope.soortlid = soortlid;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

       $scope.pers = persoon;
       $scope.persoonAll = persoons;

      Aanhef.findAll().then(function(res) {
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
                Persoon.updatePersoon($scope.pers);
                $state.go('persoon.list');
            }
          };

          $scope.clickDel = function () {
              var msg = confirm("Verwijderen ? J/N");
              if (msg == true) {
                Persoon.delPersoon($scope.pers);
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

          var num = 0;
          $scope.clickNext = function () {
            if (num !== $scope.persoonAll.length) {
              var aux = num++;
              $scope.pers = $scope.persoonAll[aux];
            };
          };

          $scope.clickPre = function () {
            if (num !== 0) {
              var aux = num--;
              $scope.pers = $scope.persoonAll[aux];
            };
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
