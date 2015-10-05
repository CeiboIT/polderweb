angular.module('polderweb')
  .controller('KenmerkController',
   function ($rootScope, $scope, $state, Kenmerk, bedrijf, kenmerks, authService, homeState) {

       var model = {
           selection : [],
           kenmerks: kenmerks
       };
       $rootScope.kenmerk = kenmerks;

       $scope.bedrijf = bedrijf;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Kenmerk.updateKenmerk($scope.ah.kenmerk, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(kenmerk) {
          Kenmerk.nextKenmerk(kenmerk, function (kenmerkId) {
              if (kenmerkId) {
                  Kenmerk.delKenmerk(kenmerk);
                  $state.go(homeState);
              }
          });
      }

        angular.extend(this,{
            model: model,
            kenmerkService: Kenmerk,
            clickSave: clickSave,
            clickDel: clickDel
        })
    });
