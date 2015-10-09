angular.module('polderweb')
  .controller('FunctieController',
  function ($rootScope, $scope, $state, Functie, bedrijf, username, functies, authService, homeState) {
     var model = {
           selection : [],
           functies: functies
       };
       $rootScope.functie = functies;

       $scope.bedrijf = bedrijf;
      $scope.username = username;


     function clickSave (form) {
        $scope.submitted = true;
        if (form.$valid) {
          Functie.updateFunctie($scope.ah.functie, $scope.reg);
         // $state.go('home');
        }
     }

     function clickDel(functie) {
        Functie.nextFunctie(functie, function (functieId) {
              if (functieId) {
                  Functie.delFunctie(functie);
                  $state.go(homeState);
              }
          });
     }

     angular.extend(this,{
            model: model,
            functieService: Functie,
            clickSave: clickSave,
            clickDel: clickDel

      })
    });
