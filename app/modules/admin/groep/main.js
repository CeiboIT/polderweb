angular.module('polderweb.groep', [])
    .constant('groepParentStata','admin')

    .config(function($stateProvider, groepParentStata) {
        $stateProvider

            .state('groep', {
                url: '/groep',
                parent: groepParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('groep.list', {
                url:'/list',
                templateUrl:'app/modules/admin/groep/groep.html',
                controller:'GroepController as ctrl',
                resolve: { groeps: function (Groep) {
                    return Groep.findAll();
                    }
                }
            })
            .state('groep.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/groep/create-groep/create-groep.html',
                controller:'createGroepCtrl'
            })

            .state('groep.view',
            {
                url:'/:groepId',
                templateUrl:'app/modules/admin/groep/view-groep/view-groep.html',
                controller:'viewGroepCtrl'
            });

    });
