angular.module('polderweb')
  .controller('CategorieController',
   function ($rootScope, $scope, $state, Categorie,categorie,authService) {
    if(authService.getToken()==null){
       $state.go('login');
     }else{
       //start checkbox
      $rootScope.categorie=categorie;
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
        Categorie.findAll();
      };

      $scope.goViewCategorie = function (categorieId) {
        $state.go('viewCategorie', {categorieId: categorieId});
      };

      $scope.delCategorie=function(){
        angular.forEach($scope.selection, function (categorie) {
          _.remove($rootScope.categorie,function(categories){
            return categories.categorie===categorie;
          });
        });
         $scope.selection=[];
      };

      $scope.checkAll=function(checked){
        if(checked){
          $scope.selected=checked;
          angular.forEach($scope.categorie, function (categories) {
            $scope.selection.push(categories.categorie);
          });
        }else{
          $scope.selected=checked;
          $scope.selection=[];
        }
      };
      $scope.clearFilter=function(){
        $scope.filter.categorie="";
        $scope.filter.omschrijving="";
        $scope.display.categorie=true;
        $scope.display.categorieCategorie=true;
        $scope.display.categorieOmschrijving=true;
      }
      $scope.viewCategorie=function(categorieId){
        $scope.detail = true;
        $scope.reg=Categorie.getCategorie(categorieId);
      }

       $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Categorie.updateCategorie($scope.reg.categorie, $scope.reg);
         // $state.go('home');
        }
      };

      $scope.clickDel = function () {
        Categorie.nextCategorie($scope.reg.categorie,function (categorieId) {
          if (categorieId) {
            Categorie.delCategorie($scope.reg.categorie);
            $scope.reg = categorieId;
          }
        });

       // $state.go('home'); // Terug naar homepage
      };

      $scope.clickCancel = function () {
        $scope.detail = false;
      };

      $scope.clickNext = function () {
        Categorie.nextCategorie($scope.reg.categorie,function (categorieId) {
          if (categorieId) {
            $scope.reg = categorieId;
          }
        });
      };

      $scope.clickPre = function () {
        Categorie.preCategorie($scope.reg.categorie, function (categorieId) {
          if (categorieId) {
            $scope.per = categorieId;
          }
        });
      };
     }
    });
