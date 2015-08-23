angular.module('polderweb')
  .controller('FunctieController',
   function ($rootScope, $scope, $state, Functie,functie,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
       $rootScope.functie=functie;
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
        Functie.findAll();
      };

      $scope.goViewFunctie = function (functieId) {
        $state.go('viewFunctie', {functieId: functieId});
      };

      $scope.delFunctie=function(){
        angular.forEach($scope.selection, function (functie) {
          _.remove($rootScope.functie,function(functies){
            return functies.functie===functie;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.functie, function (functies) {
            $scope.selection.push(functies.functie);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      $scope.clearFilter=function(){
        $scope.filter.functie="";
        $scope.filter.omschrijving="";
        $scope.display.functie=true;
        $scope.display.omschrijving=true;
      }
 
      $scope.viewFunctie=function(functieId){
        $scope.detail = true;
        $scope.reg=Functie.getFunctie(functieId);
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Functie.updateFunctie($scope.fu.functie, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Functie.nextFunctie($scope.fu.functie,function (functieId) {
          if (functieId) {
            Functie.delFunctie($scope.fu.functie);
            $scope.reg = functieId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Functie.nextFunctie($scope.fu.functie,function (functieId) {
          if (functieId) {
            $scope.reg = functieId;
          }
        });
      };

      $scope.clickPre = function () {
        Functie.preFunctie($scope.fu.functie, function (functieId) {
          if (functieId) {
            $scope.per = functieId;
          }
        });
      };
     }
    });
