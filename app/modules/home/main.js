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

/*
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
            .state('persoon.list', {

            .state('home.init', {
                url:'/list',
                templateUrl:'app/modules/persoon/persoon.html',
                controller:'PersoonController as ctrl',
                resolve: {
                    persoon: function (Persoon) { return Persoon.findAll(); },
                    regio: function (Regio) { return Regio.findAll(); },
                    soortlid: function (SoortLid) { return SoortLid.findAll(); },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })
			
            .state('dashboard.list', {
*/
            .state('home.init', {
                url:'/list',
                templateUrl:'app/modules/dashboard/dashboard.html',
                controller:'DashBoardController as ctrl',
                resolve: {
                    dashboards: function (DashBoard) {
                        return DashBoard.findAll();
                    },
                    bedrijf: function($cookieStore) {
                        return $cookieStore.get('user').Bedrijf;
                    }
                }
            });
			
    });

