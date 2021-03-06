angular.module('polderweb')
  .controller('PersoonController',
    function ($rootScope, $scope, $state, Persoon, persoon, Regio, regio, SoortLid, soortlid, bedrijf, username, authService) {

       var model = {
           selection : [],
           persoon: persoon,
           regio: regio,
           soortlid: soortlid
       };

       $scope.regio = regio;
       $scope.soortlid = soortlid;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Persoon.updatePersoon($scope.ah.persoon, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(persoon) {
          Persoon.nextPersoon(persoon, function (persoonId) {
              if (persoonId) {
                  Persoon.delPersoon(persoon);
                  $state.go(homeState);
              }
          });
      }

      angular.extend(this,{
          model: model,
          persoonService: Persoon,
          clickSave: clickSave,
          clickDel: clickDel
      })

      $scope.clickSort=function(sortField, reverse){
        $rootScope.mySort=sortField;
        $rootScope.reverse=reverse;
      };

      $scope.clearFilter=function(){
        $scope.filter.persoon="";
        $scope.filter.omschrijving="";
        $scope.display.persoonLidNr=true;
        $scope.display.persoonNaam=true;
      }

    });
