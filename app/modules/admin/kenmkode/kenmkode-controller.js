angular.module('polderweb')
  .controller('KenmKodeController',
   function ($rootScope, $scope, $state, $stateParams, KenmKode, kenmkode, authService) { 
    if(authService.getToken()==null){
       $state.go('login');
     }else{

     //$scope.kenmerk = angular.copy(Kenmerk.getKenmerk($stateParams.id)); //toegevoegd master-detail

	 //start checkbox
      $rootScope.kenmkode=kenmkode;
      $scope.selection=[];
      $scope.toggleSelection = function toggleSelection(kenmkodeId) {
       var idx = $scope.selection.indexOf(kenmkodeId);
       if (idx > -1) {
         $scope.selection.splice(idx, 1);
       }
       else {
         $scope.selection.push(kenmkodeId);
       }
      };
      //end start checkbox

      $scope.clickSort=function(sortField, reverse){
        $rootScope.mySort=sortField;
        $rootScope.reverse=reverse;
      };

      $scope.clickNew = function () {
        alert('Er is op nieuw geklikt!');
      };

      $scope.clickCancel = function () {
        alert('Er is op Doe Iets geklikt!');
      };

      $scope.clickGet = function () {
        KenmKode.findAll();
      };

      $scope.goViewKenmKode = function (kenmerk, kode) {
        $state.go('viewKenmKode', {kenmerk: kenmerk, kode: kode}); //master-detail
      };

      $scope.delKenmKode=function(){
        angular.forEach($scope.selection, function (kenmkode) {
          _.remove($rootScope.kenmkode,function(kenmkodes){
            return kenmkodes.kenmkode===kenmkode;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.kenmkode, function (kenmkodes) {
            $scope.selection.push(kenmkodes.kenmkode);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };

      $scope.clearFilter=function(){
        $scope.filter.kenmerk="";
        $scope.filter.kode="";
        $scope.filter.omschrijving="";
        $scope.display.kenmkodeKenmerk=true;
        $scope.display.kenmkodeKode=true;
        $scope.display.kenmkodeOmschrijving=true;
      }

      $scope.viewKenmKode=function(kenmerk, kode){  //master-detail
        $scope.detail = true;
        $scope.reg=KenmKode.getKenmKode(kenmerk, kode); //master-detail
      }

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          KenmKode.updateKenmKode($scope.ah.kenmkode, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        KenmKode.nextKenmKode($scope.ah.kenmkode,function (kode) {
          if (kode) {
            KenmKode.delKenmKode($scope.ah.kenmkode);
            $scope.reg = kode;
          }
        });
       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };
     }
    });
