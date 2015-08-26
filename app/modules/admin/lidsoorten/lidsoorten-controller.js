angular.module('polderweb')
  .controller('LidsoortenController',
     function ($rootScope, $scope, $state, Soortlid, soortlid, authService) {
      if(authService.getToken()==null){
        $state.go('login');
     }else{

	 //start checkbox
      $rootScope.soortl=soortlid;
      //$scope.soortl=soortlid;
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
        Soortlid.findAll();
      };

      $scope.goViewSoortlid = function (soortlid) {
		// console.log('soortlid1 ' + soortlid);
        $scope.detail = true;
		// console.log('soortlid2 ' + soortlid);
        $state.go('viewSoortlid', {soortlid: soortlid});
		// $scope.so=Soortlid.getSoortlid(soortlid);
        // niet direct opstarten : dan wordt scherm niet leeg gemaakt 
	  };

      $scope.viewSoortlid=function(soortlid){
        $scope.detail = true;
        // Deze verschijnt niet : console.log('soortlid3 ' + soortlid);
        $scope.so=Soortlid.getSoortlid(soortlid);
      }

      $scope.delSoortlid=function(){
        angular.forEach($scope.selection, function (soortlid) {

          _.remove($rootScope.soortl,function(soortl){
            return soortl.soortlid===soortlid;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.soortl, function (soortl) {
            $scope.selection.push(soortl.soortlid);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };

      $scope.clearFilter=function(){
        $scope.filter.soortlid="";
        $scope.filter.omschrijving="";
        $scope.display.soortlidSoortLid=true;
        $scope.display.soortlidOmschrijving=true;
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Soortlid.updateSoortlid($scope.so.soortlid, $scope.so);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Soortlid.nextSoortlid($scope.so.soortlid,function (soortlid) {
          if (soortlid) {
            Soortlid.delSoortlid($scope.so.soortlid);
            $scope.so = soortlid;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Soortlid.nextSoortlid($scope.so.soortlid,function (soortlid) {
          if (soortlid) {
            $scope.so = soortlid;
          }
        });
      };

      $scope.clickPre = function () {
        Soortlid.preSoortlid($scope.so.soortlid, function (soortlid) {
          if (soortlid) {
            $scope.so = soortlid;
          }
        });
      };
     }

    });
