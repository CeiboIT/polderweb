angular.module('polderweb')
    .config(function ($stateProvider) {
        $stateProvider

            .state('home', {
                url:'/app',
                abstract: true,
                templateUrl: 'app/modules/home/abstract.html',
                resolve : {
                    leaveItEnter: function(authService, loginState, $state) {
                        //It is the main state, it will be checked always before load any screen
                        if(!authService.getToken()) {
                            $state.go('auth.login');
                        }
                    }
                }
            })

            .state('home.init', {
                url: '/init',
                templateUrl: 'app/modules/home/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    regio: function (Regio) {
                        return Regio.findAll();
                    },
                    soortlid: function (SoortLid) {
                        return SoortLid.findAll();
                    },
                       bedrijf: function($cookieStore) {
                           return $cookieStore.get('user').Bedrijf;
                       }
                }
            })
    });

