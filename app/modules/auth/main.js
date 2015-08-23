angular.module('polderweb')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/modules/auth/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: function ($state, authService) {
            authService.logout();
            $state.go('login');
          }
      });
  });

