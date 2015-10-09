angular.module('polderweb')
  .controller('CategorieController',
   function ($rootScope, $scope, $state, Categorie, categories, bedrijf, username, authService, homeState) {

      $scope.bedrijf = bedrijf;
      $scope.username = username;

       var model = {
           selection : [],
           categories: categories
       };

       $rootScope.categorie = categories;


     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Categorie.updateCategorie($scope.ah.categorie, $scope.reg);
         // $state.go('home');
        }
      }

      function clickDel(categorie) {

          Categorie.nextCategorie(categorie, function (categorieId) {
              if (categorieId) {
                  Categorie.delCategorie(categorie);
                  $state.go(homeState);
              }
          });
      }


        angular.extend(this,{
            model: model,
            categorieService: Categorie,
            clickSave: clickSave,
            clickDel: clickDel

        })

    });
