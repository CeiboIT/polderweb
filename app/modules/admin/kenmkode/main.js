angular.module('polderweb.kenmkode', [])
    .constant('kenmkodeParentStata','admin')

    .config(function($stateProvider, kenmkodeParentStata) {
        $stateProvider

            .state('kenmkode', {
                url: '/kenmkode',
                parent: kenmkodeParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('kenmkode.list', {
                url:'/list',
                templateUrl:'app/modules/admin/kenmkode/kenmkode.html',
                controller:'KenmKodeController as ctrl',
                resolve: { kenmkodes: function (KenmKode) {
                    return KenmKode.findAll();
                    }
                }
            })
            .state('kenmkode.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/kenmkode/create-kenmkode/create-kenmkode.html',
                controller:'createKenmKodeCtrl'
            })

            .state('kenmkode.view',
            {
                url:'/:kenmkodeId',
                templateUrl:'app/modules/admin/kenmkode/view-kenmkode/view-kenmkode.html',
                controller:'viewKenmKodeCtrl'
            });

    });
