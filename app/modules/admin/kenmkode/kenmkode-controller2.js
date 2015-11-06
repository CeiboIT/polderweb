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

      $scope.clickDel = function(kenmkode) {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            KenmKode.delKenmKode(kenmkode.Kode, kenmkode.Kenmerk, kenmkode.Omschrijving);
            setTimeout(function () { location.reload(); }, 200);
            //$state.go('kenmkode.list[kenmerk]', {kenmerk: params[0], omschrijving: params[1]});
          }
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
        //KenmKode.delKenmKode(kenmkode.KenmKode, kenmkode.Kenmerk, kenmkode.Omschrijving);
        //$state.go(homeState);
      }

        angular.extend(this,{
            model: model,
            kenmkodeService: KenmKode,
            clickSave: clickSave,
            clickDel: clickDel
        });
    });
