angular.module('polderweb')
  .controller('SoortBetalingController',
   function ($rootScope, $scope, $state, SoortBetaling, soortbetalings, authService, bedrijf, homeState) {

       var model = {
           selection : [],
           soortbetalings: soortbetalings
       };

       $rootScope.soortbetaling = soortbetalings;

       $scope.bedrijf = bedrijf;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          SoortBetaling.updateSoortBetaling($scope.ah.soortbetaling, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(soortbetaling) {

          SoortBetaling.nextSoortBetaling(soortbetaling, function (soortbetalingId) {
              if (soortbetalingId) {
                  SoortBetaling.delSoortBetaling(soortbetaling);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            soortbetalingService: SoortBetaling,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
