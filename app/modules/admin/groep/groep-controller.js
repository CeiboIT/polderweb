angular.module('polderweb')
  .controller('GroepController',
   function ($rootScope, $scope, $state, Groep,groep,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
       $rootScope.groep=groep;
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
        Groep.findAll();
      };

      $scope.goViewGroep = function (groepId) {
        $state.go('viewGroep', {groepId: groepId});
      };

      $scope.delGroep=function(){
        angular.forEach($scope.selection, function (groep) {
          _.remove($rootScope.groep,function(groeps){
            return groeps.groep===groep;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.groep, function (groeps) {
            $scope.selection.push(groeps.groep);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      $scope.clearFilter=function(){
        $scope.filter.groep="";
        $scope.filter.omschrijving="";
        $scope.display.groep=true;
        $scope.display.groepGroep=true;
        $scope.display.groepOmschrijving=true;
        $scope.display.groepPeriode=true;
      }
      $scope.viewGroep=function(groepId){
        $scope.detail = true;
        $scope.reg=Groep.getGroep(groepId);
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Groep.updateGroep($scope.reg.groep, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Groep.nextGroep($scope.reg.groep,function (groepId) {
          if (groepId) {
            Groep.delGroep($scope.reg.groep);
            $scope.reg = groepId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Groep.nextGroep($scope.reg.groep,function (groepId) {
          if (groepId) {
            $scope.reg = groepId;
          }
        });
      };

      $scope.clickPre = function () {
        Groep.preGroep($scope.reg.groep, function (groepId) {
          if (groepId) {
            $scope.per = groepId;
          }
        });
      };
     }
    });
