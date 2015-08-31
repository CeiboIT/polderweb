angular.module('polderweb')
  .controller('TitelController',
   function ($rootScope, $scope, $state, Titel,titel,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
       $rootScope.titel=titel;
       $scope.titel=titel;
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
        Titel.findAll();
      };

      $scope.goViewTitel = function (titelId) {
        $state.go('viewTitel', {titelId: titelId});
      };

      $scope.delTitel=function(){
        angular.forEach($scope.selection, function (titel) {
          _.remove($rootScope.titel,function(titels){
            return titels.titel===titel;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.titel, function (titels) {
            $scope.selection.push(titels.titel);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      $scope.clearFilter=function(){
        $scope.filter.titel="";
        $scope.filter.omschrijving="";
        $scope.display.titel=true;
        $scope.display.omschrijving=true;
      }

      $scope.viewTitel=function(titelId){
        $scope.detail = true;
        $scope.reg=Titel.getTitel(titelId);
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Titel.updateTitel($scope.ti.titel, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Titel.nextTitel($scope.ti.titel,function (titelId) {
          if (titelId) {
            Titel.delTitel($scope.ti.titel);
            $scope.reg = titelId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Titel.nextTitel($scope.ti.titel,function (titelId) {
          if (titelId) {
            $scope.reg = titelId;
          }
        });
      };

      $scope.clickPre = function () {
        Titel.preTitel($scope.ti.titel, function (titelId) {
          if (titelId) {
            $scope.per = titelId;
          }
        });
      };
     }
    });
