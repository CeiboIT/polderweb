angular.module('polderweb')
  .config(function ($stateProvider) {
  $stateProvider
    .state('createPerson', {
      url: '/person/create',
      templateUrl: 'app/modules/person/create-person/create-person.html',
      controller: 'CreatePersonCtrl',
      resolve: {
          regio: function (Regio) {
              return Regio.findAll();
          },
          soortlid: function (Soortlid) {
            return Soortlid.findAll();
          }
        }
    })
    .state('viewPerson', {
      url: '/person/:id',
      templateUrl: 'app/modules/person/view-person/view-person.html',
      controller: 'ViewPersonCtrl',
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

