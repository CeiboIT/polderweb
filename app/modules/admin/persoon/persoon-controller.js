angular.module('polderweb')
  .controller('PersoonController',
    function ($rootScope, $scope, $state, Persoon, persoon
	                                    , Regio, regio
										, Soortlid, soortlid
										, authService) {
    if(authService.getToken()==null){
        $state.go('login');
     }else{
      $scope.regio=regio;
      $scope.soortlid=soortlid;

//angular.module('polderweb')
//  .controller('PersoonController',
////     function ($rootScope, $scope, $state, Persoon, persoon, authService) {
//      if(authService.getToken()==null){
//        $state.go('login');
//     }else{
 	  $rootScope.pers=persoon;
      $scope.selection=[];
      $scope.toggleSelection = function toggleSelection(persoonId) {
       var idx = $scope.selection.indexOf(persoonId);
       if (idx > -1) {
         $scope.selection.splice(idx, 1);
       }
       else {
         $scope.selection.push(persoonId);
       }
      };
      //end start checkbox
      $scope.clickSort=function(sortField, reverse){
        $rootScope.mySort=sortField;
        $rootScope.reverse=reverse;
      };

/*
      $scope.clickNew = function () {
        alert('Er is op nieuw geklikt!');
      };
	  
      $scope.clickCancel = function () {
        alert('Er is op Doe Iets geklikt!');
      };
*/

      $scope.clickGet = function () {
        Persoon.findAll();
      };

      //-----------------------------------------------------------------------------
      $scope.goViewPersoon = function (persoonId) {
// console.log('persoon1 ' + persoonId);
        $scope.detail = true;
        $state.go('viewPersoon', {persoonId: persoonId});
// console.log('persoon2 ' + persoonId);
		// $scope.pe=Persoon.getPersoon(persoon);
        // niet direct opstarten : dan wordt scherm niet leeg gemaakt 
	  };

      $scope.viewPersoon=function(persoonId){
        $scope.detail = true;
        // Deze verschijnt niet : console.log('persoon3 ' + persoon);
        $scope.pe=Persoon.getPersoon(persoonId);
      }

      //-----------------------------------------------------------------------------
	  //array functions
      $scope.delPersoon=function(){
        angular.forEach($scope.selection, function (persoon) {
          _.remove($rootScope.pers,function(pers){
            return pers.persoon===persoon;
          });
        });
         $scope.selection=[];
      };
      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.pers, function (pers) {
            $scope.selection.push(pers.persoon);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      //-----------------------------------------------------------------------------

      $scope.clearFilter=function(){
        $scope.filter.persoon="";
        $scope.filter.omschrijving="";
        $scope.display.persoonLidNr=true;
        $scope.display.persoonNaam=true;
      }

/*
       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Persoon.updatePersoon($scope.pe.lidnr, $scope.pe);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Persoon.nextPersoon($scope.pe.persoon,function (persoon) {
          if (persoon) {
            Persoon.delPersoon($scope.pe.lidnr, $scope.pe);
            $scope.pe = persoon;
          }
        });
       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Persoon.nextPersoon($scope.pe.lidnr,function (persoon) {
          if (persoon) {
            $scope.pe = persoon;
          }
        });
      };

      $scope.clickPre = function () {
        Persoon.prePersoon($scope.pe.lidnr, function (persoon) {
          if (persoon) {
            $scope.pe = persoon;
          }
        });
      };
*/
     }
    });
