angular.module('polderweb.regio', [])
    .constant('regioParentStata','admin')

    .config(function($stateProvider, regioParentStata) {
        $stateProvider

            .state('regio', {
                url: '/regio',
                parent: regioParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('regio.list', {
                url:'/list',
                templateUrl:'app/modules/admin/regio/regio.html',
                controller:'RegioController as ctrl',
                resolve: { regios: function (Regio) {
                    return Regio.findAll();
                    }
                }
            })
            .state('regio.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/regio/create-regio/create-regio.html',
                controller:'createRegioCtrl'
            })

            .state('regio.view',
            {
                url:'/:regioId',
                templateUrl:'app/modules/admin/regio/view-regio/view-regio.html',
                controller:'viewRegioCtrl'
            });

    });
