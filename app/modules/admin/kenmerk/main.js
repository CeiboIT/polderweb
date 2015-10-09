angular.module('polderweb.kenmerk', [])
    .constant('kenmerkParentStata','admin')

    .config(function($stateProvider, kenmerkParentStata) {
        $stateProvider

            .state('kenmerk', {
                url: '/kenmerk',
                parent: kenmerkParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('kenmerk.list', {
                url:'/list',
                templateUrl:'app/modules/admin/kenmerk/kenmerk.html',
                controller:'KenmerkController as ctrl',
                resolve: {
                    kenmerks: function (Kenmerk) {
                        return Kenmerk.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
            .state('kenmerk.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/kenmerk/create-kenmerk/create-kenmerk.html',
                controller:'createKenmerkCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('kenmerk.view',
            {
                url:'/:kenmerkId',
                templateUrl:'app/modules/admin/kenmerk/view-kenmerk/view-kenmerk.html',
                controller:'viewKenmerkCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            });

    });
