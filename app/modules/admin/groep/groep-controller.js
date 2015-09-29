angular.module('polderweb')
  .controller('GroepController',
   function ($rootScope, $scope, $state, Groep, groeps, authService, homeState) {

       var model = {
           selection : [],
           groeps: groeps
       };

       $rootScope.groep = groeps;


     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Groep.updateGroep($scope.ah.groep, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(groep) {

          Groep.nextGroep(groep, function (groepId) {
              if (groepId) {
                  Groep.delGroep(groep);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            groepService: Groep,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
