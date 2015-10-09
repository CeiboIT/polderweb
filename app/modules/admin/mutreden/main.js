angular.module('polderweb.mutreden', [])
    .constant('mutredenParentStata','admin')

    .config(function($stateProvider, mutredenParentStata) {
        $stateProvider

            .state('mutreden', {
                url: '/mutreden',
                parent: mutredenParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('mutreden.list', {
                url:'/list',
                templateUrl:'app/modules/admin/mutreden/mutreden.html',
                controller:'MutRedenController as ctrl',
                resolve: {
                    mutredens: function (MutReden) {
                        return MutReden.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
            .state('mutreden.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/mutreden/create-mutreden/create-mutreden.html',
                controller:'createMutRedenCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('mutreden.view',
            {
                url:'/:mutredenId',
                templateUrl:'app/modules/admin/mutreden/view-mutreden/view-mutreden.html',
                controller:'viewMutRedenCtrl',
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
