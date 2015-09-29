angular.module('polderweb.soortbetaling', [])
    .constant('soortbetalingParentStata','admin')

    .config(function($stateProvider, soortbetalingParentStata) {
        $stateProvider

            .state('soortbetaling', {
                url: '/soortbetaling',
                parent: soortbetalingParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('soortbetaling.list', {
                url:'/list',
                templateUrl:'app/modules/admin/soortbetaling/soortbetaling.html',
                controller:'SoortBetalingController as ctrl',
                resolve: { soortbetalings: function (SoortBetaling) {
                    return SoortBetaling.findAll();
                    }
                }
            })
            .state('soortbetaling.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/soortbetaling/create-soortbetaling/create-soortbetaling.html',
                controller:'createSoortBetalingCtrl'
            })

            .state('soortbetaling.view',
            {
                url:'/:soortbetalingId',
                templateUrl:'app/modules/admin/soortbetaling/view-soortbetaling/view-soortbetaling.html',
                controller:'viewSoortBetalingCtrl'
            });

    });
