angular.module('polderweb')
  .controller('RegioController',
   function ($rootScope, $scope, $state, Regio,regio,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
       $rootScope.regio=regio;
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
        Regio.findAll();
      };

      $scope.goViewRegio = function (regioId) {
        $state.go('viewRegio', {regioId: regioId});
      };
      $scope.viewRegio=function(regioId){
        $scope.detail = true;
        $scope.reg=Regio.getRegio(regioId);
      }

      $scope.delRegio=function(){
        angular.forEach($scope.selection, function (regio) {
          _.remove($rootScope.regio,function(regios){
            return regios.regio===regio;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.regio, function (regios) {
            $scope.selection.push(regios.regio);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };

      $scope.clearFilter=function(){
        $scope.filter.regio="";
        $scope.filter.omschrijving="";
        $scope.display.regio=true;
        $scope.display.regioRegio=true;
        $scope.display.regioOmschrijving=true;
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Regio.updateRegio($scope.reg.regio, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Regio.nextRegio($scope.reg.regio,function (regioId) {
          if (regioId) {
            Regio.delRegio($scope.reg.regio);
            $scope.reg = regioId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Regio.nextRegio($scope.reg.regio,function (regioId) {
          if (regioId) {
            $scope.reg = regioId;
          }
        });
      };

      $scope.clickPre = function () {
        Regio.preRegio($scope.reg.regio, function (regioId) {
          if (regioId) {
            $scope.per = regioId;
          }
        });
      };
     }
    });
