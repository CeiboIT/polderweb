angular.module('polderweb')
  .controller('KenmKodeController',
   function ($rootScope, $scope, $state, KenmKode, bedrijf, username, kenmkodes, authService, homeState) {

      $scope.bedrijf = bedrijf;
      $scope.username = username;

       var model = {
           selection : [],
           kenmkodes: kenmkodes
       };
       $rootScope.kenmkode = kenmkodes;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          KenmKode.updateKenmKode($scope.ah.kenmkode, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(kenmkode) {
          KenmKode.nextKenmKode(kenmkode, function (kenmkodeId) {
              if (kenmkodeId) {
                  KenmKode.delKenmKode(kenmkode);
                  $state.go(homeState);
              }
          });
      }

        angular.extend(this,{
            model: model,
            kenmkodeService: KenmKode,
            clickSave: clickSave,
            clickDel: clickDel
        })
    });
