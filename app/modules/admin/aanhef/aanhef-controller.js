angular.module('polderweb')
  .controller('AanhefController',
   function ($rootScope, $scope, $state, Aanhef,aanhef,authService, homeState) {

       var model = {
           selection : []
       };

    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
      $rootScope.aanhef=aanhef;

      function toggleSelection(personId) {
       var idx = $scope.selection.indexOf(personId);
       if (idx > -1) {
         $scope.selection.splice(idx, 1);
       }
       else {
         $scope.selection.push(personId);
       }
      }
      //end start checkbox

      function clickSort(sortField, reverse){
        $rootScope.mySort=sortField;
        $rootScope.reverse=reverse;
      }

      function clickNew() {
        alert('Er is op nieuw geklikt!');
      }

      function clickGet() {
        Aanhef.findAll();
      }

      function goViewAanhef (aanhefId) {
        $state.go('aanhef.view', {aanhefId: aanhefId});
      };

      function delAanhef(){
        angular.forEach($scope.selection, function (aanhef) {
          _.remove($rootScope.aanhef,function(aanhefs){
            return aanhefs.aanhef===aanhef;
          });
        });
         $scope.selection=[];
      }

      function checkAll(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.aanhef, function (aanhefs) {
            $scope.selection.push(aanhefs.aanhef);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      }

      function clearFilter(){
        $scope.filter.aanhef="";
        $scope.filter.omschrijving="";
        $scope.display.aanhefAanhef=true;
        $scope.display.aanhefOmschrijving=true;
      }

      function viewAanhef(aanhefId){
        $scope.detail = true;
        $scope.reg=Aanhef.getAanhef(aanhefId);
      }
      function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Aanhef.updateAanhef($scope.ah.aanhef, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(aanhef) {

        Aanhef.nextAanhef(aanhef,function (aanhefId) {
          if (aanhefId) {
            Aanhef.delAanhef(aanhef);
          $state.go(homeState);
          }
        });
       // $state.go('home'); // Terug naar homepage
      }
          function clickCancel() {
            $scope.detail = false;
          }

          function clickNext () {
            Aanhef.nextAanhef($scope.ah.aanhef,function (aanhefId) {
              if (aanhefId) {
                $scope.reg = aanhefId;
              }
            });
          }

        function clickPre () {
            Aanhef.preAanhef($scope.ah.aanhef, function (aanhefId) {
              if (aanhefId) {
                $scope.per = aanhefId;
              }

            });
        }


        angular.extend(this,{
            model: model,
            clickNext : clickNext,
            clickPre: clickPre,
            clickCancel: clickCancel,
            toggleSelection: toggleSelection,
            clickSort: clickSort,
            clickNew : clickNew,
            clickGet: clickGet,
            delAanhef: delAanhef,
            goViewAanhef: goViewAanhef,
            clickSave: clickSave,
            clickDel: clickDel,
            checkAll : checkAll,
            clearFilter : clearFilter
        })
     }
    });
