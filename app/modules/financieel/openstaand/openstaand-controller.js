angular.module('polderweb')
  .controller('OpenstaandController',
   function ($rootScope, $scope, $state, Openstaand, openstaands, bedrijf, username, authService, homeState) {

       var model = {
           selection : [],
           openstaands: openstaands
       };

       $rootScope.openstaand = openstaands;
       $scope.bedrijf = bedrijf;
       $scope.username = username;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Openstaand.updateOpenstaand($scope.ah.openstaand, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(openstaand) {

          Openstaand.nextOpenstaand(openstaand, function (openstaandId) {
              if (openstaandId) {
                  Openstaand.delOpenstaand(openstaand);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            openstaandService: Openstaand,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
