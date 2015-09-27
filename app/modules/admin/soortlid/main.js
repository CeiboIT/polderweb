angular.module('polderweb.soortlid', [])
    .constant('soortlidParentStata','admin')

    .config(function($stateProvider, soortlidParentStata) {
        $stateProvider

            .state('soortlid', {
                url: '/soortlid',
                parent: soortlidParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('soortlid.list', {
                url:'/list',
                templateUrl:'app/modules/admin/soortlid/soortlid.html',
                controller:'SoortLidController as ctrl',
                resolve: { soortlids: function (SoortLid) {
                    return SoortLid.findAll();
                    }
                }
            })
            .state('soortlid.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/soortlid/create-soortlid/create-soortlid.html',
                controller:'createSoortLidCtrl'
            })

            .state('soortlid.view',
            {
                url:'/:soortlidId',
                templateUrl:'app/modules/admin/soortlid/view-soortlid/view-soortlid.html',
                controller:'viewSoortLidCtrl'
            });

    });
