angular.module('polderweb')
  .controller('MutRedenController',
   function ($rootScope, $scope, $state, MutReden, bedrijf, mutredens, authService, homeState) {

       var model = {
           selection : [],
           mutredens: mutredens
       };

       $rootScope.mutreden = mutredens;

       $scope.bedrijf = bedrijf;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          MutReden.updateMutReden($scope.ah.mutreden, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(mutreden) {

          MutReden.nextMutReden(mutreden, function (mutredenId) {
              if (mutredenId) {
                  MutReden.delMutReden(mutreden);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            mutredenService: MutReden,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
