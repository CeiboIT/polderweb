angular.module('polderweb.kenmerken', [])
    .constant('kenmerkenParentStata','admin')

    .config(function($stateProvider, kenmerkenParentStata) {
        $stateProvider

            .state('kenmerken', {
                url: '/kenmerken',
                parent: kenmerkenParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('kenmerken.list', {
                url:'/list/:lidnr',
                templateUrl:'app/modules/persoon/kenmerken/kenmerken.html',
                controller:'KenmerkenController as list',
                resolve: {
                    kenmerken: function (Kenmerken, $stateParams) {
                        return Kenmerken.findAll($stateParams.lidnr);
                    },
                    params: function ($stateParams) {
                      return $stateParams.lidnr;
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
            .state('kenmerken.create',
            {
                url:'/create/:lidnr',
                templateUrl:'app/modules/persoon/kenmerken/create-kenmerken/create-kenmerken.html',
                controller:'createKenmerkenCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   },
                    params: function ($stateParams) {
                      return $stateParams.lidnr;
                    }
                }
            })

            .state('kenmerken.view',
            {
                url:'/:kenmerkenId',
                templateUrl:'app/modules/persoon/kenmerken/view-kenmerken/view-kenmerken.html',
                controller:'viewKenmerkenCtrl',
                resolve: {
                    kenmerken: function (Kenmerken, $stateParams) {
                        return Kenmerken.getKenmerken($stateParams.kenmerkenId);
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            });

    });
