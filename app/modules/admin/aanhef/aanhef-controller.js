angular.module('polderweb')
  .controller('AanhefController',
   function ($rootScope, $scope, $state, Aanhef, aanhefs, authService, homeState) {

       var model = {
           selection : [],
           aanhefs: aanhefs
       };

       function delAanhef(){
        angular.forEach($scope.selection, function (aanhef) {
          _.remove($rootScope.aanhef,function(aanhefs){
            return aanhefs.aanhef===aanhef;
          });
        });
         $scope.selection=[];
      }

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
            delAanhef: delAanhef,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
