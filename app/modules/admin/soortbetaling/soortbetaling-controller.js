angular.module('polderweb')
  .controller('SoortBetalingController',
   function ($rootScope, $scope, $state, SoortBetaling,soortbetaling,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
       $rootScope.soortbetaling=soortbetaling;
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
        SoortBetaling.findAll();
      };

      $scope.goViewSoortBetaling = function (soortbetalingId) {
        $state.go('viewSoortBetaling', {soortbetalingId: soortbetalingId});
      };

      $scope.delSoortBetaling=function(){
        angular.forEach($scope.selection, function (soortbetaling) {
          _.remove($rootScope.soortbetaling,function(soortbetalings){
            return soortbetalings.soortbetaling===soortbetaling;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.soortbetaling, function (soortbetalings) {
            $scope.selection.push(soortbetalings.soortbetaling);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      $scope.clearFilter=function(){
        $scope.filter.soortbetaling="";
        $scope.filter.omschrijving="";
//        $scope.display.soortbetaling=true;
        $scope.display.omschrijving=true;
      }
      $scope.viewSoortBetaling=function(soortbetalingId){
        $scope.detail = true;
        $scope.reg=SoortBetaling.getSoortBetaling(soortbetalingId);
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          SoortBetaling.updateSoortBetaling($scope.sb.soortbetaling, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        SoortBetaling.nextSoortBetaling($scope.sb.soortbetaling,function (soortbetalingId) {
          if (soortbetalingId) {
            SoortBetaling.delSoortBetaling($scope.sb.soortbetaling);
            $scope.reg = soortbetalingId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        SoortBetaling.nextSoortBetaling($scope.sb.soortbetaling,function (soortbetalingId) {
          if (soortbetalingId) {
            $scope.reg = soortbetalingId;
          }
        });
      };

      $scope.clickPre = function () {
        SoortBetaling.preSoortBetaling($scope.sb.soortbetaling, function (soortbetalingId) {
          if (soortbetalingId) {
            $scope.per = soortbetalingId;
          }
        });
      };
     }
    });
