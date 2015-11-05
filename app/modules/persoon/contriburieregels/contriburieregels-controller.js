angular.module('polderweb')
  .controller('ContriburieregelsController',
   function ($rootScope, $scope, $state, Contriburieregels, contriburieregels, bedrijf, username, authService, homeState) {

       var model = {
           selection : [],
           contriburieregels: contriburieregels
       };

       $rootScope.contriburieregels = contriburieregels;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Contriburieregels.updateContriburieregels($scope.ah.contriburieregels, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(contriburieregels) {

          Contriburieregels.nextContriburieregels(contriburieregels, function (contriburieregelsId) {
              if (contriburieregelsId) {
                  Contriburieregels.delContriburieregels(contriburieregels);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            contriburieregelsService: Contriburieregels,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
