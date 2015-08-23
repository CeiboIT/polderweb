angular.module('polderweb.auth', ['angular-flash.service', 'angular-flash.flash-alert-directive'])
  .config(function ($stateProvider) {
    $stateProvider
        .state('login', {
        url: '/login',
        templateUrl: 'app/modules/auth/login/login.html',
        controller: 'LoginCtrl as ctrl'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'app/modules/auth/register/register.html',
            controller: 'RegisterController as ctrl'
        })

      .state('logout', {
        url: '/logout',
        controller: function ($state, authService) {
            authService.logout();
            $state.go('login');
          }
      });
  });

