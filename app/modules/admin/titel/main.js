angular.module('polderweb.titel', [])
    .constant('titelParentStata','admin')

    .config(function($stateProvider, titelParentStata) {
        $stateProvider

            .state('titel', {
                url: '/titel',
                parent: titelParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('titel.list', {
                url:'/list',
                templateUrl:'app/modules/admin/titel/titel.html',
                controller:'TitelController as ctrl',
                resolve: {
                    titels: function (Titel) {
                        return Titel.findAll();
                    },
                       bedrijf: function($cookieStore) {
                           return $cookieStore.get('user').Bedrijf;
                       }
                }
            })
            .state('titel.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/titel/create-titel/create-titel.html',
                controller:'createTitelCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })

            .state('titel.view',
            {
                url:'/:titelId',
                templateUrl:'app/modules/admin/titel/view-titel/view-titel.html',
                controller:'viewTitelCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            });

    });
