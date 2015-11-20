angular.module('polderweb')
  .controller('ContriburieregelsController',
   function ($rootScope, $scope, $state, Contriburieregels, contriburieregels, params, bedrijf, username, authService, homeState) {
       var self = this;

       self.model = {
           selection : [],
           contriburieregels: contriburieregels
       };

       $scope.contriburieregels = contriburieregels;

       $scope.bedrijf = bedrijf;
       $scope.username = username;

       $scope.params = params;
       $scope.lidnr = params;

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
            model: self.model,
            contriburieregelsService: Contriburieregels,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
