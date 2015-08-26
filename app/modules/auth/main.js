angular.module('polderweb.auth', ['angular-flash.service', 'angular-flash.flash-alert-directive'])
  .config(function ($stateProvider) {
    $stateProvider

        .state('auth', {
            url: '/access',
            abstract: true,
            template: '<div ui-view=""></div>'
        })

        .state('auth.login', {
        url: '/login',
        templateUrl: 'app/modules/auth/login/login.html',
        controller: 'LoginCtrl as ctrl'
        })

        .state('auth.register', {
            url: '/register',
            templateUrl: 'app/modules/auth/register/register.html',
            controller: 'RegisterController as ctrl'
        })

      .state('auth.logout', {
        url: '/logout',
        controller: function ($state, authService) {
            authService.logout();
            $state.go('auth.login');
          }
      });
  });

