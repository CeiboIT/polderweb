angular.module('polderweb')
  .controller('AanhefController',
   function ($rootScope, $scope, $state, Aanhef,aanhef,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
      $rootScope.aanhef=aanhef;
      $scope.selection=[];
      $scope.toggleSelection = function toggleSelection(personId) {
       var idx = $scope.selection.indexOf(personId);
       if (idx > -1) {
         $scope.selection.splice(idx, 1);
       }
       else {
         $scope.selection.push(personId);
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
        Aanhef.findAll();
      };

      $scope.goViewAanhef = function (aanhefId) {
        $state.go('viewAanhef', {aanhefId: aanhefId});
      };

      $scope.delAanhef=function(){
        angular.forEach($scope.selection, function (aanhef) {
          _.remove($rootScope.aanhef,function(aanhefs){
            return aanhefs.aanhef===aanhef;
          });
        });
         $scope.selection=[];
      };
      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.aanhef, function (aanhefs) {
            $scope.selection.push(aanhefs.aanhef);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      $scope.clearFilter=function(){
        $scope.filter.aanhef="";
        $scope.filter.omschrijving="";
        $scope.display.aanhefAanhef=true;
        $scope.display.aanhefOmschrijving=true;
      }
      $scope.viewAanhef=function(aanhefId){
        $scope.detail = true;
        $scope.reg=Aanhef.getAanhef(aanhefId);
      }
      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Aanhef.updateAanhef($scope.ah.aanhef, $scope.reg);
         // $state.go('home');
        }
      };
      $scope.clickDel = function () {
        Aanhef.nextAanhef($scope.ah.aanhef,function (aanhefId) {
          if (aanhefId) {
            Aanhef.delAanhef($scope.ah.aanhef);
            $scope.reg = aanhefId;
          }
        });
       // $state.go('home'); // Terug naar homepage
      };
      $scope.clickCancel = function () {
        $scope.detail = false;
      };
      $scope.clickNext = function () {
        Aanhef.nextAanhef($scope.ah.aanhef,function (aanhefId) {
          if (aanhefId) {
            $scope.reg = aanhefId;
          }
        });
      };
      $scope.clickPre = function () {
        Aanhef.preAanhef($scope.ah.aanhef, function (aanhefId) {
          if (aanhefId) {
            $scope.per = aanhefId;
          }
        });
      };
     }
    });
