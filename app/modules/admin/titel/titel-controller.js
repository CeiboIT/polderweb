angular.module('polderweb')
  .controller('TitelController',
   function ($rootScope, $scope, $state, Titel, titels, authService, homeState) {

       var model = {
           selection : [],
           titels: titels
       };

       $rootScope.titel = titels;


     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Titel.updateTitel($scope.ah.titel, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(titel) {

          Titel.nextTitel(titel, function (titelId) {
              if (titelId) {
                  Titel.delTitel(titel);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            titelService: Titel,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
