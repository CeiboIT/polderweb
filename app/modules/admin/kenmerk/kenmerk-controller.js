angular.module('polderweb')
  .controller('KenmerkController',
   function ($rootScope, $scope, $state, Kenmerk, kenmerk, authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
      //start checkbox
      $rootScope.kenmerk=kenmerk;
      $scope.selection=[];
      // $scope.toggleSelection = function toggleSelection(personId) {
      //  var idx = $scope.selection.indexOf(personId);
      //  if (idx > -1) {
      //    $scope.selection.splice(idx, 1);
      //  }
      //  else {
      //    $scope.selection.push(personId);
      //  }
      // };
      //end start checkbox

      $scope.clickSort=function(sortField, reverse){
        $rootScope.mySort=sortField;
        $rootScope.reverse=reverse;
      };

      $scope.clickNew = function () {
        alert('Er is op nieuw geklikt!');
      };

      $scope.goViewKenmerk = function (kenmerkId) {
        $state.go('viewKenmerk', {kenmerkId: kenmerkId});
      };

      $scope.viewKenmerk=function(kenmerkId){
        $scope.detail = true;
        $scope.reg=Kenmerk.getKenmerk(kenmerkId);
      }

      // $scope.clickCancel = function () {
      //   alert('Er is op Doe Iets geklikt!');
      // };

      // $scope.clickGet = function () {
      //   Kenmerk.findAll();
      // };

      // $scope.delKenmerk=function(){
      //   angular.forEach($scope.selection, function (kenmerk) {
      //     _.remove($rootScope.kenmerk,function(kenmerks){
      //       return kenmerks.kenmerk===kenmerk;
      //     });
      //   });
      //    $scope.selection=[];
      // };

      // $scope.checkAll=function(checked){
      //   if(checked){
      //     $scope.selected=checked;
      //     angular.forEach($scope.kenmerk, function (kenmerks) {
      //       $scope.selection.push(kenmerks.kenmerk);
      //     });
      //   }else{
      //     $scope.selected=checked;
      //     $scope.selection=[];
      //   }
      // };

      // $scope.clearFilter=function(){
      //   $scope.filter.kenmerk="";
      //   $scope.filter.omschrijving="";
      //   $scope.display.kenmerkKenmerk=true;
      //   $scope.display.kenmerkOmschrijving=true;
      // }

      // $scope.clickSave = function (form) {
      //   $scope.submitted = true;
      //   if (form.$valid) {
      //     Kenmerk.updateKenmerk($scope.ah.kenmerk, $scope.reg);
      //    // $state.go('home');
      //   }
      // };

      // $scope.clickDel = function () {
      //   Kenmerk.nextKenmerk($scope.ah.kenmerk,function (kenmerkId) {
      //     if (kenmerkId) {
      //       Kenmerk.delKenmerk($scope.ah.kenmerk);
      //       $scope.reg = kenmerkId;
      //     }
      //   });
      //  // $state.go('home'); // Terug naar homepage
      // };

      // $scope.clickCancel = function () {
      //   $scope.detail = false;
      // };

      // $scope.clickNext = function () {
      //   Kenmerk.nextKenmerk($scope.ah.kenmerk,function (kenmerkId) {
      //     if (kenmerkId) {
      //       $scope.reg = kenmerkId;
      //     }
      //   });
      // };

      // $scope.clickPre = function () {
      //   Kenmerk.preKenmerk($scope.ah.kenmerk, function (kenmerkId) {
      //     if (kenmerkId) {
      //       $scope.per = kenmerkId;
      //     }
      //   });
      // };
     }
    });
