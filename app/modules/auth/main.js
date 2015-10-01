angular.module('polderweb.auth', ['angular-flash.service', 'angular-flash.flash-alert-directive','uiRouterStyles'])
    .constant('passwordMinLength', 4)
    .constant('userMinLength', 4)
  .config(function ($stateProvider, flashProvider) {

    flashProvider.errorClassnames.push('alert-danger');

    $stateProvider

        .state('auth', {
            url: '/access',
            abstract: true,
            template: '<div ui-view=""></div>',
            data: {
                css: ['app/modules/auth/form-elements.css', 'app/modules/auth/style.css']
            }
        })

        .state('auth.login', {
        url: '/login',
        templateUrl: 'app/modules/auth/login/login.html',
        controller: 'LoginCtrl as ctrl',
        params: {
            username : null
        }

        })

        .state('auth.register', {
            url: '/register',
            templateUrl: 'app/modules/auth/register/register.html',
            controller: 'RegisterController as ctrl',
            params: {
                username : null
            }
        })


        .state('auth.forgot', {
            url: '/forgot',
            templateUrl: 'app/modules/auth/forgot/forgot.html',
            controller: 'ForgotController as ctrl',
            params: {
                username : null
            }

        })

      .state('auth.logout', {
        url: '/logout',
        controller: function ($state, $cookieStore, authService) {
            // clean cookies
            $cookieStore.remove('user');

            authService.logout();
            $state.go('auth.login');
          }
      });
  });

