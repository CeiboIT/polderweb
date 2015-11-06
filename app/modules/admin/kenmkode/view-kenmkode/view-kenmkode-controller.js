angular.module('polderweb')
  .controller('viewKenmKodeCtrl',
    function ($scope, KenmKode, params, $state, bedrijf, username, $stateParams) {
//      if(authService.getToken()==null){
//           $state.go('login');
//         }else{

    $scope.bedrijf = bedrijf;
    $scope.username = username;
    $scope.kenmerk = params[0];
    $scope.kode = params[1];
    $scope.kenmerkomschrijving = params[2];

//	  KenmKode.getKenmKode($stateParams.kenmkodeId).then(function(res){
	KenmKode.getKenmKode($stateParams.kenmerk, $stateParams.kode).then(function(res){
      $scope.kenmkode = res;
    });

    $scope.kenmkodeService = KenmKode;

	  $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            KenmKode.updateKenmKode($scope.kenmkode);
            $state.go('kenmkode.list[kenmerk]', {kenmerk: $scope.kenmerk, omschrijving: $scope.kenmerkomschrijving});
        }
      };

      $scope.deletionOnSuccess = function() {
          $state.go('kenmkode.list[kenmerk]', {kenmerk: $scope.kenmerk, omschrijving: $scope.kenmerkomschrijving});
      };

      $scope.clickDel = function(kenmkode) {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            KenmKode.delKenmKode(kenmkode.Kode, kenmkode.Kenmerk, kenmkode.Omschrijving);
            $state.go('kenmkode.list[kenmerk]', {kenmerk: params[0], omschrijving: params[1]});
          }
      };

      $scope.clickCancel = function () {
         KenmKode.getKenmKode($stateParams.kenmkodeId).then(function(res){
          $scope.kenmkode = res;
         });
      };

      $scope.clickNext = function () {
        KenmKode.nextKenmKode($scope.kenmkode.KenmKode,function (kenmkodeId) {
          if (kenmkodeId) {
            $scope.kenmkode = kenmkodeId;
          }
        });
      };

      $scope.clickPre = function () {
        KenmKode.preKenmKode($scope.kenmkode.KenmKode, function (kenmkodeId) {
          if (kenmkodeId) {
            $scope.kenmkode = kenmkodeId;
          }
        });
      };
//  }
    });
