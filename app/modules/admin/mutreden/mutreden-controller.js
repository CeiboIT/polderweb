angular.module('polderweb')
  .controller('MutRedenController',
   function ($rootScope, $scope, $state, MutReden,mutreden,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
       $rootScope.mutreden=mutreden;
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
        MutReden.findAll();
      };

      $scope.goViewMutReden = function (mutredenId) {
        $state.go('viewMutReden', {mutredenId: mutredenId});
      };

      $scope.delMutReden=function(){
        angular.forEach($scope.selection, function (mutreden) {
          _.remove($rootScope.mutreden,function(mutredens){
            return mutredens.mutreden===mutreden;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.mutreden, function (mutredens) {
            $scope.selection.push(mutredens.mutreden);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };

      $scope.clearFilter=function(){
        $scope.filter.soortmut="";
        $scope.filter.mutreden="";
        $scope.filter.omschrijving="";
        $scope.display.soortmut=true;
        $scope.display.mutreden=true;
        $scope.display.omschrijving=true;
      }

      $scope.viewMutReden=function(mutredenId){
        $scope.detail = true;
        $scope.reg=MutReden.getMutReden(mutredenId);
      }

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          MutReden.updateMutReden($scope.mr.mutreden, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        MutReden.nextMutReden($scope.mr.mutreden,function (mutredenId) {
          if (mutredenId) {
            MutReden.delMutReden($scope.mr.mutreden);
            $scope.reg = mutredenId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        MutReden.nextMutReden($scope.mr.mutreden,function (mutredenId) {
          if (mutredenId) {
            $scope.reg = mutredenId;
          }
        });
      };

      $scope.clickPre = function () {
        MutReden.preMutReden($scope.mr.mutreden, function (mutredenId) {
          if (mutredenId) {
            $scope.per = mutredenId;
          }
        });
      };
     }
    });
