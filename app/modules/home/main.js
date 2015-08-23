angular.module('polderweb')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          regio: function (Regio) {
              return Regio.findAll();
          },
          soortlid: function (Soortlid) {
            return Soortlid.findAll();
          }
        }
      });
  });

