angular.module('polderweb')
  .controller('viewSoortlidCtrl',
    function ($scope, Soortlid, $state, $stateParams, Person, authService) {
      if(authService.getToken()==null){
             $state.go('login');
      }else{
          Soortlid.getSoortlid($stateParams.soortlid).then(function(res){
            $scope.soortl = res;
          });
          $scope.clickSave = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Soortlid.updateSoortlid($scope.soortl.SoortLid
				                      , $scope.soortl.Omschrijving);
                $state.go('adminLidsoorten');
            }
          };

          $scope.clickDel = function () {
              var msg = confirm("Verwijderen ? J/N");
              if (msg == true) {
                Soortlid.delSoortlid($scope.soortl.SoortLid
				                   , $scope.soortl.Omschrijving);
                 $state.go('adminLidsoorten'); // Terug naar homepage
              }
          };

          $scope.clickCancel = function () {
            Soortlid.getSoortlid($stateParams.soortlid).then(function(res){
            $scope.soortl = res;
            });
          };

          $scope.clickNext = function () {
            Soortlid.nextSoortlid($scope.soortl.SoortLid,function (soortlid) {
              if (soortlid) {
                $scope.soortl = soortlid;
              }
            });
          };

          $scope.clickPre = function () {
            Soortlid.preSoortlid($scope.soortl.SoortLid, function (soortlid) {
              if (soortlid) {
                $scope.soortl = soortlid;
              }
            });
          };
      }
    });
