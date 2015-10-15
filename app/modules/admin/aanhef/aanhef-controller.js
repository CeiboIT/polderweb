angular.module('polderweb')
  .controller('AanhefController',
   function ($rootScope, $scope, $state, Aanhef, aanhefs, bedrijf, username, authService, homeState) {

       var model = {
           selection : [],
           aanhefs: aanhefs
       };

       $rootScope.aanhef = aanhefs;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Aanhef.updateAanhef($scope.ah.aanhef, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(aanhef) {
          Aanhef.nextAanhef(aanhef, function (aanhefId) {
              if (aanhefId) {
                  Aanhef.delAanhef(aanhef);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            aanhefService: Aanhef,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
