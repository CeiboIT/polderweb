angular.module('polderweb')
  .controller('KenmKodeController2',
//   function ($rootScope, $scope, $state, KenmKode, bedrijf, username, kenmkodes, authService, homeState) {
//EP function ($rootScope, $scope, $state, KenmKode, bedrijf, username, kenmkodes, params, authService, homeState) {
//JS function ($rootScope, $scope, $state, $stateParams, Kenmerk, KenmKode, bedrijf, username, kenmkodes, authService, homeState) {
     function ($rootScope, $scope, $state, $stateParams, Kenmerk, KenmKode, bedrijf, username, kenmkodes, params, authService, homeState) {
      $scope.params = params;
      $scope.bedrijf = bedrijf;
      $scope.username = username;
//------------
//	  Kenmerk.getKenmerk($stateParams.kenmerkId).then(function(res){ //20151020
//        $scope.kenmerk = res;
//      });
//	  KenmKode.findAll($scope.params[0]).then(function(res){ //20151020
//        $scope.kenmkodes = res;
//      });
//------------

      // show only kenmkodes that match with kenmerk
      $scope.kenmkodes = [];
      for (var i in kenmkodes) {
        if (kenmkodes[i].Kenmerk === $scope.params[0]) {
          $scope.kenmkodes.push(kenmkodes[i]);
        };
      };

       var model = {
           selection : [],
           kenmkodes: $scope.kenmkodes
       };
       $rootScope.kenmkode = kenmkodes;

     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          KenmKode.updateKenmKode($scope.ah.kenmkode, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(kenmkode) {
          KenmKode.nextKenmKode(kenmkode, function (kenmkodeId) {
              if (kenmkodeId) {
                  KenmKode.delKenmKode(kenmkode);
                  $state.go(homeState);
              }
          });
      }

        angular.extend(this,{
            model: model,
            kenmkodeService: KenmKode,
            clickSave: clickSave,
            clickDel: clickDel
        })
    });
