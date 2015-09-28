angular.module('polderweb.user', [])

  .constant('userParentState','admin')

  .config(function ($stateProvider) {
    $stateProvider

    .state('user', {
        url: '/user',
        parent: userParentStata,
        abstract: true,
        template: '<div ui-view=""></div>'
    })

    .state('user.edit', {
      url: '/edit',
      templateUrl: 'app/modules/user/user-edit.html',
      controller: 'EditUserCtrl'
    })

    .state('user.profile', {
      url: '/:id',
      templateUrl: 'app/modules/user/user-profile.html',
      controller: 'ProfileUserCtrl'
    })
  ;

});
