angular.module('polderweb')
  .controller('AanhefController',
   function ($rootScope, $scope, $state, Aanhef, aanhefs, authService, homeState) {

       var model = {
           selection : [],
           aanhefs: aanhefs
       };

       $rootScope.aanhef = aanhefs;


     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Aanhef.updateAanhef($scope.ah.aanhef, $scope.reg);
         // $state.go('home');
        }
      }

       function clickNext () {
           Aanhef.nextAanhef($scope.ah.aanhef,function (aanhefId) {
               if (aanhefId) {
                   $scope.reg = aanhefId;
               }
           });
       };

       function clickPre () {
           Aanhef.preAanhef($scope.ah.aanhef, function (aanhefId) {
               if (aanhefId) {
                   $scope.per = aanhefId;
               }
           });
       };

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
            clickDel: clickDel,
            clickNext: clickNext,
            clickPre: clickPre
        })

    });
